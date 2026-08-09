/**
 * Startup Confluence 2.0 — Registration Web App
 *
 * Accepts POST JSON (Content-Type: text/plain is OK) with:
 *   registrationType: "startup" | "sponsor" | "partner" | "speaker" | "delegate"
 *
 * Frontend sources:
 *   - RegistrationModal.tsx  → startup, speaker, delegate
 *   - PartnerModal.tsx       → partner, sponsor
 *
 * RECOMMENDED SETUP:
 * 1. Create a NEW Google Sheet under YOUR Google account
 * 2. Create tabs named exactly: Startup, Sponsor, Partner, Speaker, Delegate
 * 3. Copy the Sheet ID from the URL (ID only, not full URL)
 * 4. Paste that ID into SPREADSHEET_ID below
 * 5. script.google.com → New project → paste this file → Save
 * 6. Run doGet once → Allow permissions (Sheets, Gmail, Drive)
 * 7. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 8. Put the /exec URL into VITE_GOOGLE_SCRIPT_URL (or the frontend fallback)
 *
 * If SPREADSHEET_ID is empty, the script uses the Sheet it is bound to.
 */

// Paste ONLY the Sheet ID (not the full URL).
var SPREADSHEET_ID = '11mb5ve-0zL5jlt4KhEjHgnNdlH9tlfULf7u7Z1o8Qmw';

var SHEET_NAMES = {
  startup: 'Startup',
  sponsor: 'Sponsor',
  partner: 'Partner',
  speaker: 'Speaker',
  delegate: 'Delegate',
};

var CONTACT_EMAIL = 'startupconfluence@ugi.edu.in';

function doGet() {
  var payload = {
    ok: true,
    service: 'Startup Confluence 2.0 Registration',
    message: 'Web app is live. Use POST to submit forms.',
    expectedTabs: ['Startup', 'Sponsor', 'Partner', 'Speaker', 'Delegate'],
  };

  try {
    var ss = getSpreadsheet_();
    payload.spreadsheetId = ss.getId();
    payload.tabs = ss.getSheets().map(function (sheet) {
      return sheet.getName();
    });
    payload.missingTabs = payload.expectedTabs.filter(function (name) {
      return payload.tabs.indexOf(name) === -1;
    });
    if (payload.missingTabs.length) {
      payload.ok = false;
      payload.error =
        'Missing sheet tab(s): ' +
        payload.missingTabs.join(', ') +
        '. Create tabs named Startup, Sponsor, Partner, Speaker, and Delegate.';
    }
  } catch (err) {
    payload.ok = false;
    payload.error = String(err);
  }

  return json_(payload);
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json_({ ok: false, error: 'Empty request body' });
    }

    var data = JSON.parse(e.postData.contents);
    var type = String(data.registrationType || '')
      .toLowerCase()
      .trim();

    if (!SHEET_NAMES[type]) {
      return json_({
        ok: false,
        error:
          'Invalid registrationType. Use startup, sponsor, partner, speaker, or delegate.',
      });
    }

    var emailResult = { sent: false, reason: 'skipped' };
    try {
      emailResult = sendConfirmationEmail_(type, data);
    } catch (mailErr) {
      emailResult = { sent: false, reason: String(mailErr) };
    }

    appendToSheet_(type, data, {
      emailSent: emailResult.sent
        ? 'Yes'
        : 'No' + (emailResult.reason ? ' (' + emailResult.reason + ')' : ''),
    });

    return json_({
      ok: true,
      registrationType: type,
      email: emailResult,
    });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function normalizeSpreadsheetId_(raw) {
  var value = String(raw || '').trim();
  if (!value) return '';
  var match = value.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) return match[1];
  return value.split('?')[0].split('#')[0];
}

function getSpreadsheet_() {
  var id = normalizeSpreadsheetId_(SPREADSHEET_ID);
  if (id) {
    return SpreadsheetApp.openById(id);
  }
  var active = SpreadsheetApp.getActiveSpreadsheet();
  if (!active) {
    throw new Error(
      'No spreadsheet linked. Set SPREADSHEET_ID in Code.gs to your Sheet ID only ' +
        '(not the full URL), e.g. 11mb5ve-0zL5jlt4KhEjHgnNdlH9tlfULf7u7Z1o8Qmw'
    );
  }
  return active;
}

function getSheet_(type) {
  var ss = getSpreadsheet_();
  var name = SHEET_NAMES[type];
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    throw new Error(
      'Missing sheet tab "' +
        name +
        '". Create tabs named Startup, Sponsor, Partner, Speaker, and Delegate.'
    );
  }
  return sheet;
}

function ensureHeaders_(sheet, headers) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    // Seed Phone / ID columns as text so new rows keep formatting
    ensureTextColumns_(sheet, headers, ['Phone', 'Aadhaar / ID Details']);
    return;
  }

  var lastCol = Math.max(sheet.getLastColumn(), 1);
  var existing = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  while (existing.length && existing[existing.length - 1] === '') {
    existing.pop();
  }
  if (existing.length < headers.length) {
    for (var i = existing.length; i < headers.length; i++) {
      sheet.getRange(1, i + 1).setValue(headers[i]).setFontWeight('bold');
    }
  }
}

/**
 * Format named columns as plain text (phones / Aadhaar stay readable).
 */
function ensureTextColumns_(sheet, headers, names) {
  var lastDataRow = Math.max(sheet.getMaxRows(), 2);
  for (var n = 0; n < names.length; n++) {
    var idx = headers.indexOf(names[n]);
    if (idx === -1) continue;
    var col = idx + 1;
    sheet.getRange(2, col, lastDataRow, col).setNumberFormat('@');
  }
}

/**
 * Force a value to stay as text when written via appendRow.
 * Leading apostrophe is hidden in the cell display but keeps digits intact
 * (no scientific notation, no dropped "+", no leading-zero loss).
 */
function asSheetText_(value) {
  var s = String(value == null ? '' : value).trim();
  if (!s) return '';
  return "'" + s;
}

/**
 * After appendRow, re-assert Phone / ID cells as plain text.
 */
function lockTextCellsOnLastRow_(sheet, headers, names) {
  var row = sheet.getLastRow();
  if (row < 2) return;
  for (var n = 0; n < names.length; n++) {
    var idx = headers.indexOf(names[n]);
    if (idx === -1) continue;
    var cell = sheet.getRange(row, idx + 1);
    var value = cell.getDisplayValue() || String(cell.getValue() || '');
    cell.setNumberFormat('@').setValue(value);
  }
}

function resolveSpeakerTopic_(data) {
  var topic = String(data.speakerTopic || '').trim();
  if (topic && topic.toLowerCase() !== 'other') return topic;
  var custom = String(data.customTopic || '').trim();
  if (custom) return custom;
  return String(data.topicProposal || '').trim();
}

function formatSponsorAmount_(data) {
  if (data.expectedContribution) return String(data.expectedContribution);
  if (data.sponsorshipAmount === 0 || data.sponsorshipAmount) {
    return String(data.sponsorshipAmount);
  }
  return '';
}

function appendToSheet_(type, data, emailMeta) {
  var sheet = getSheet_(type);
  var ts = data.timestamp || new Date().toISOString();
  var emailSent = (emailMeta && emailMeta.emailSent) || 'No';

  if (type === 'startup') {
    var pitchDeckLink = savePitchDeck_(data);
    var startupHeaders = [
      'Timestamp',
      'Startup Name',
      'Founder Name',
      'Email',
      'Phone',
      'Website',
      'Stage',
      'Industry',
      'Description',
      'Team Size',
      'Need Stall',
      'Received Funding',
      'Want Pitch',
      'Pitch Deck',
      'LinkedIn',
      'Email Sent',
      'Stall Required',
      'Accommodation Required',
      'Accommodation Details',
    ];
    ensureHeaders_(sheet, startupHeaders);
    sheet.appendRow([
      ts,
      data.startupName || '',
      data.founderName || '',
      data.email || '',
      asSheetText_(data.phone),
      data.website || '',
      data.startupStage || '',
      data.industry || '',
      data.description || '',
      data.teamSize || '',
      data.needStall || data.stallRequired || '',
      data.fundingGrant || '',
      data.wantPitch || '',
      pitchDeckLink || data.pitchDeckUrl || '',
      data.linkedIn || data.linkedin || '',
      emailSent,
      data.stallRequired || data.needStall || '',
      data.accommodationRequired || '',
      data.accommodationDetails || '',
    ]);
    lockTextCellsOnLastRow_(sheet, startupHeaders, ['Phone']);
    return;
  }

  if (type === 'sponsor') {
    var sponsorHeaders = [
      'Timestamp',
      'Organization',
      'Contact Person',
      'Email',
      'Phone',
      'Website',
      'Sponsorship Category',
      'Company Description',
      'Expected Contribution',
      'Additional Notes',
      'Email Sent',
      'Sponsorship Type',
      'Sponsorship Amount',
    ];
    ensureHeaders_(sheet, sponsorHeaders);
    sheet.appendRow([
      ts,
      data.organizationName || data.orgName || '',
      data.contactPerson || '',
      data.email || '',
      asSheetText_(data.phone),
      data.website || '',
      data.sponsorshipCategory || data.sponsorshipType || '',
      data.companyDescription || '',
      formatSponsorAmount_(data),
      data.additionalNotes || '',
      emailSent,
      data.sponsorshipType || data.sponsorshipCategory || '',
      data.sponsorshipAmount || '',
    ]);
    lockTextCellsOnLastRow_(sheet, sponsorHeaders, ['Phone']);
    return;
  }

  if (type === 'partner') {
    var partnerHeaders = [
      'Timestamp',
      'Organization',
      'Contact Person',
      'Email',
      'Phone',
      'Website',
      'Partner Category',
      'Company Description',
      'Additional Notes',
      'Email Sent',
    ];
    ensureHeaders_(sheet, partnerHeaders);
    sheet.appendRow([
      ts,
      data.organizationName || data.orgName || '',
      data.contactPerson || '',
      data.email || '',
      asSheetText_(data.phone),
      data.website || '',
      data.partnerCategory || '',
      data.companyDescription || '',
      data.additionalNotes || '',
      emailSent,
    ]);
    lockTextCellsOnLastRow_(sheet, partnerHeaders, ['Phone']);
    return;
  }

  if (type === 'delegate') {
    var eventsValue = data.events || '';
    if (Object.prototype.toString.call(data.eventsList) === '[object Array]') {
      eventsValue = data.eventsList.join(', ');
    } else if (
      Object.prototype.toString.call(data.events) === '[object Array]'
    ) {
      eventsValue = data.events.join(', ');
    }

    var delegateHeaders = [
      'Timestamp',
      'Full Name',
      'Email',
      'Phone',
      'Aadhaar / ID Details',
      'Events',
      'Email Sent',
    ];
    ensureHeaders_(sheet, delegateHeaders);
    sheet.appendRow([
      ts,
      data.fullName || '',
      data.email || '',
      asSheetText_(data.phone),
      asSheetText_(data.idDetails),
      eventsValue,
      emailSent,
    ]);
    lockTextCellsOnLastRow_(sheet, delegateHeaders, [
      'Phone',
      'Aadhaar / ID Details',
    ]);
    return;
  }

  // speaker
  var speakerTopic = resolveSpeakerTopic_(data);
  var speakerHeaders = [
    'Timestamp',
    'Full Name',
    'Organization',
    'Designation',
    'Email',
    'Phone',
    'LinkedIn',
    'Bio',
    'Expertise',
    'Topic Proposal',
    'Previous Experience',
    'Personal Website',
    'Email Sent',
    'Speaker Name',
    'Speaker Topic',
  ];
  ensureHeaders_(sheet, speakerHeaders);
  sheet.appendRow([
    ts,
    data.fullName || data.speakerName || '',
    data.organization || '',
    data.designation || '',
    data.email || '',
    asSheetText_(data.phone),
    data.linkedIn || data.linkedin || '',
    data.speakerBio || '',
    data.areaOfExpertise || data.expertise || '',
    speakerTopic || data.topicProposal || '',
    data.previousSpeakingExperience || data.previousExperience || '',
    data.personalWebsite || '',
    emailSent,
    data.speakerName || data.fullName || '',
    speakerTopic,
  ]);
  lockTextCellsOnLastRow_(sheet, speakerHeaders, ['Phone']);
}

function isValidEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
}

/**
 * Send confirmation with the classic MailApp API.
 * Falls back to GmailApp if MailApp is blocked (common on some Workspace accounts).
 * Run testSendMail_() from the Apps Script editor to verify permissions.
 */
function sendConfirmationEmail_(type, data) {
  var to = String(data.email || '').trim();
  if (!isValidEmail_(to)) {
    return { sent: false, reason: 'invalid_or_missing_email' };
  }

  var content = buildFormEmailContent_(type, data);
  var detailHtml = content.detailLines
    .map(function (line) {
      return '<div style="margin:4px 0">' + escapeHtml_(line) + '</div>';
    })
    .join('');

  var nextStepsHtml = content.nextSteps
    .map(function (step, index) {
      return (
        '<li style="margin:6px 0">' +
        escapeHtml_(index + 1 + '. ' + step) +
        '</li>'
      );
    })
    .join('');

  var html =
    '<div style="font-family:Arial,Helvetica,sans-serif;line-height:1.55;color:#0f172a;max-width:560px">' +
    '<h2 style="color:#FF7A1A;margin:0 0 12px">Startup Confluence 2.0</h2>' +
    '<p>Hi ' +
    escapeHtml_(content.greetingName) +
    ',</p>' +
    '<p>' +
    escapeHtml_(content.intro) +
    '</p>' +
    '<div style="background:#fff7ed;border:1px solid #fdba74;border-radius:12px;padding:14px 16px;margin:16px 0">' +
    '<div style="font-weight:700;margin-bottom:8px">' +
    escapeHtml_(content.summaryTitle) +
    '</div>' +
    detailHtml +
    '</div>' +
    '<p style="font-weight:700;margin:0 0 6px">What happens next</p>' +
    '<ul style="padding-left:18px;margin:0 0 16px">' +
    nextStepsHtml +
    '</ul>' +
    '<p>' +
    escapeHtml_(content.closing) +
    '</p>' +
    '<p>Questions? Reply to this email or contact us at ' +
    '<a href="mailto:' +
    CONTACT_EMAIL +
    '">' +
    CONTACT_EMAIL +
    '</a>' +
    ' · +91-6390903018 · +91-89536 15232</p>' +
    '<p style="color:#64748b;font-size:13px;margin-top:24px">United Incubation Hub · Prayagraj</p>' +
    '</div>';

  var text =
    'Hi ' +
    content.greetingName +
    ',\n\n' +
    content.intro +
    '\n\n' +
    content.summaryTitle +
    '\n' +
    content.detailLines.join('\n') +
    '\n\nWhat happens next:\n' +
    content.nextSteps
      .map(function (step, index) {
        return index + 1 + '. ' + step;
      })
      .join('\n') +
    '\n\n' +
    content.closing +
    '\n\nContact: ' +
    CONTACT_EMAIL +
    ' | +91-6390903018 | +91-89536 15232\n';

  var options = {
    htmlBody: html,
    name: 'Startup Confluence 2.0',
    replyTo: CONTACT_EMAIL,
  };

  // Classic MailApp (to, subject, body, options) — same as older scripts
  try {
    MailApp.sendEmail(to, content.subject, text, options);
    return { sent: true, to: to, via: 'MailApp' };
  } catch (mailErr) {
    // Fallback for accounts where MailApp is restricted
    try {
      GmailApp.sendEmail(to, content.subject, text, options);
      return { sent: true, to: to, via: 'GmailApp' };
    } catch (gmailErr) {
      throw new Error(
        'MailApp: ' + mailErr + ' | GmailApp: ' + gmailErr
      );
    }
  }
}

/**
 * Manual test from Apps Script editor:
 * 1. Change TEST_EMAIL below to your address
 * 2. Select testSendMail_ → Run → Allow permissions
 * 3. Check Inbox / Spam
 */
function testSendMail_() {
  var TEST_EMAIL = Session.getActiveUser().getEmail() || CONTACT_EMAIL;
  MailApp.sendEmail(
    TEST_EMAIL,
    'Startup Confluence 2.0 — mail test',
    'If you received this, MailApp is working.',
    {
      name: 'Startup Confluence 2.0',
      replyTo: CONTACT_EMAIL,
    }
  );
  Logger.log('Test mail sent to: ' + TEST_EMAIL);
}

function buildFormEmailContent_(type, data) {
  if (type === 'startup') {
    return {
      subject: 'Startup registration received — Startup Confluence 2.0',
      greetingName: data.founderName || 'Founder',
      intro:
        'Thank you for registering your startup for Startup Confluence 2.0. We have received your startup application and the details below.',
      summaryTitle: 'Your startup registration',
      detailLines: [
        'Startup: ' + (data.startupName || '—'),
        'Founder: ' + (data.founderName || '—'),
        'Email: ' + (data.email || '—'),
        'Phone: ' + (data.phone || '—'),
        'Stage: ' + (data.startupStage || '—'),
        'Industry: ' + (data.industry || '—'),
        'Team size: ' + (data.teamSize || '—'),
        'Stall booking: ' +
          (data.stallRequired || data.needStall || '—') +
          ' (FCFS)',
        'Accommodation: ' + (data.accommodationRequired || '—'),
        data.accommodationRequired === 'Yes'
          ? 'Accommodation details: ' + (data.accommodationDetails || '—')
          : '',
        'Received funding: ' + (data.fundingGrant || '—'),
        'Want to pitch: ' + (data.wantPitch || '—'),
      ].filter(Boolean),
      nextSteps: [
        'Our team will review your startup profile and expo requirements.',
        data.stallRequired === 'Yes' || data.needStall === 'Yes'
          ? 'Stall allotment is First Come, First Served — early registrants get priority.'
          : 'If you later need a stall, reply to this email as early as possible (FCFS).',
        data.wantPitch === 'Yes'
          ? 'Pitch applications will be screened and shortlisted teams will be notified.'
          : 'You will receive event updates closer to 23–24 Oct 2026.',
        'Keep this email for your records.',
      ],
      closing:
        'We are excited to have your venture at the confluence. See you in Prayagraj.',
    };
  }

  if (type === 'sponsor') {
    return {
      subject: 'Sponsorship enquiry received — Startup Confluence 2.0',
      greetingName: data.contactPerson || 'Sponsor',
      intro:
        'Thank you for your interest in sponsoring Startup Confluence 2.0. We have received your sponsorship enquiry with the details below.',
      summaryTitle: 'Your sponsorship enquiry',
      detailLines: [
        'Organization: ' + (data.organizationName || data.orgName || '—'),
        'Contact person: ' + (data.contactPerson || '—'),
        'Email: ' + (data.email || '—'),
        'Phone: ' + (data.phone || '—'),
        'Sponsorship type: ' +
          (data.sponsorshipType || data.sponsorshipCategory || '—'),
        'Proposed amount: ' + (formatSponsorAmount_(data) || '—'),
        data.companyDescription
          ? 'About organization: ' + data.companyDescription
          : '',
        data.additionalNotes ? 'Notes: ' + data.additionalNotes : '',
      ].filter(Boolean),
      nextSteps: [
        'Our partnerships team will review your sponsorship category and proposed amount.',
        'We will share deliverables, branding benefits, and next steps for confirmation.',
        'If anything needs clarification, we will contact you on this email or phone.',
      ],
      closing:
        'Thank you for considering a sponsorship with Startup Confluence 2.0.',
    };
  }

  if (type === 'partner') {
    return {
      subject: 'Partner application received — Startup Confluence 2.0',
      greetingName: data.contactPerson || 'Partner',
      intro:
        'Thank you for applying to partner with Startup Confluence 2.0. We have received your partner application with the details below.',
      summaryTitle: 'Your partner application',
      detailLines: [
        'Organization: ' + (data.organizationName || data.orgName || '—'),
        'Contact person: ' + (data.contactPerson || '—'),
        'Email: ' + (data.email || '—'),
        'Phone: ' + (data.phone || '—'),
        'Partner category: ' + (data.partnerCategory || '—'),
        data.companyDescription
          ? 'About organization: ' + data.companyDescription
          : '',
        data.additionalNotes ? 'Notes: ' + data.additionalNotes : '',
      ].filter(Boolean),
      nextSteps: [
        'Our team will review your partnership category and collaboration interest.',
        'Shortlisted partners will receive a follow-up with scope, branding, and onboarding details.',
        'Feel free to reply if you want to share additional materials.',
      ],
      closing:
        'We look forward to exploring a partnership with you for Startup Confluence 2.0.',
    };
  }

  if (type === 'delegate') {
    var eventsText = data.events || '—';
    if (Object.prototype.toString.call(data.eventsList) === '[object Array]') {
      eventsText = data.eventsList.join(', ');
    } else if (
      Object.prototype.toString.call(data.events) === '[object Array]'
    ) {
      eventsText = data.events.join(', ');
    }

    return {
      subject:
        'Delegate / Visitor registration received — Startup Confluence 2.0',
      greetingName: data.fullName || 'Guest',
      intro:
        'Thank you for registering as a Delegate / Visitor for Startup Confluence 2.0. We have received your attendance registration with the details below.',
      summaryTitle: 'Your delegate registration',
      detailLines: [
        'Full name: ' + (data.fullName || '—'),
        'Email: ' + (data.email || '—'),
        'Phone: ' + (data.phone || '—'),
        'ID details received: Yes',
        'Events selected: ' + eventsText,
      ],
      nextSteps: [
        'Your registration will be verified by our team.',
        'Please carry a valid ID (matching the details you submitted) when you arrive.',
        'Event-day check-in and schedule updates will be shared closer to the summit.',
      ],
      closing:
        'We look forward to welcoming you at Startup Confluence 2.0 in Prayagraj.',
    };
  }

  // speaker
  var speakerTopic = resolveSpeakerTopic_(data);
  return {
    subject: 'Speaker application received — Startup Confluence 2.0',
    greetingName: data.speakerName || data.fullName || 'Speaker',
    intro:
      'Thank you for applying to speak at Startup Confluence 2.0. We have received your speaker application with the details below.',
    summaryTitle: 'Your speaker application',
    detailLines: [
      'Speaker: ' + (data.speakerName || data.fullName || '—'),
      'Organization: ' + (data.organization || '—'),
      'Designation: ' + (data.designation || '—'),
      'Email: ' + (data.email || '—'),
      'Phone: ' + (data.phone || '—'),
      'Proposed topic: ' + (speakerTopic || '—'),
      data.expertise || data.areaOfExpertise
        ? 'Expertise: ' + (data.expertise || data.areaOfExpertise)
        : '',
    ].filter(Boolean),
    nextSteps: [
      'Our curation team will review your profile and proposed topic.',
      'If shortlisted, we will confirm session format, timing, and logistics by email.',
      'You may reply with any additional bio, deck, or availability notes.',
    ],
    closing:
      'Thank you for offering to share your expertise at Startup Confluence 2.0.',
  };
}

function escapeHtml_(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Saves uploaded pitch deck to Drive and returns a shareable link.
 * Falls back to provided pitchDeckUrl when no file is attached.
 */
function savePitchDeck_(data) {
  var existingUrl = String(data.pitchDeckUrl || '').trim();
  var base64 = String(data.pitchDeckBase64 || '').trim();
  var fileName = String(data.pitchDeckFileName || '').trim();

  if (!base64 || !fileName) {
    return existingUrl;
  }

  try {
    var folder = getOrCreatePitchDeckFolder_();
    var mime = String(data.pitchDeckMimeType || 'application/octet-stream');
    var blob = Utilities.newBlob(
      Utilities.base64Decode(base64),
      mime,
      fileName
    );
    var file = folder.createFile(blob);
    try {
      file.setSharing(
        DriveApp.Access.ANYONE_WITH_LINK,
        DriveApp.Permission.VIEW
      );
    } catch (shareErr) {
      // Sharing may be restricted by Workspace policy — still return file URL
    }
    return file.getUrl();
  } catch (err) {
    return existingUrl || 'Upload failed: ' + String(err);
  }
}

function getOrCreatePitchDeckFolder_() {
  var folderName = 'Startup Confluence 2.0 — Pitch Decks';
  var folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) {
    return folders.next();
  }
  return DriveApp.createFolder(folderName);
}
