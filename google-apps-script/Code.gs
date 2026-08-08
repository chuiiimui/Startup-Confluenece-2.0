/**
 * Startup Confluence 2.0 — Registration Web App
 *
 * RECOMMENDED SETUP (avoids permission errors):
 * 1. Create a NEW Google Sheet under YOUR Google account
 * 2. Rename tabs to: Startup, Sponsor, Partner, Speaker, Delegate
 * 3. Copy the Sheet ID from the URL:
 *    https://docs.google.com/spreadsheets/d/THIS_IS_THE_ID/edit
 * 4. Paste that ID into SPREADSHEET_ID below
 * 5. Go to https://script.google.com → New project (under YOUR account)
 * 6. Paste this file into Code.gs → Save
 * 7. Run doGet once → Allow permissions
 * 8. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 9. Put the /exec URL into VITE_GOOGLE_SCRIPT_URL
 *
 * If SPREADSHEET_ID is empty, the script uses the Sheet it is bound to
 * (Extensions → Apps Script from inside that Sheet).
 */

// Paste ONLY the Sheet ID (not the full URL), e.g.:
// 11mb5ve-0zL5jlt4KhEjHgnNdlH9tlfULf7u7Z1o8Qmw
// If you paste a full docs.google.com URL, it will be extracted automatically.
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
  return ContentService.createTextOutput(
    JSON.stringify({
      ok: true,
      service: 'Startup Confluence 2.0 Registration',
      message: 'Web app is live. Use POST to submit forms.',
    })
  ).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return json_({ ok: false, error: 'Empty request body' });
    }

    var data = JSON.parse(e.postData.contents);
    var type = String(data.registrationType || '').toLowerCase().trim();

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

    var quotaLeft = '';
    try {
      quotaLeft = MailApp.getRemainingDailyQuota();
    } catch (quotaErr) {
      quotaLeft = 'n/a';
    }
    emailResult.quotaLeft = quotaLeft;

    // Write row after email attempt so quota reflects remaining sends today
    appendToSheet_(type, data, {
      emailSent: emailResult.sent ? 'Yes' : 'No',
      emailQuotaLeft: quotaLeft,
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
  // Allow pasting a full Sheets URL by mistake
  var match = value.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match && match[1]) return match[1];
  // Strip query/hash if somehow appended
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
    return;
  }

  // Upgrade existing header row if new columns were added
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

function appendToSheet_(type, data, emailMeta) {
  var sheet = getSheet_(type);
  var ts = data.timestamp || new Date().toISOString();
  var emailSent = (emailMeta && emailMeta.emailSent) || 'No';
  var emailQuotaLeft =
    emailMeta && emailMeta.emailQuotaLeft !== undefined
      ? emailMeta.emailQuotaLeft
      : '';

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
      'Email Quota Left',
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
      data.phone || '',
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
      emailQuotaLeft,
      data.stallRequired || data.needStall || '',
      data.accommodationRequired || '',
      data.accommodationDetails || '',
    ]);
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
      'Email Quota Left',
      'Sponsorship Type',
      'Sponsorship Amount',
    ];
    ensureHeaders_(sheet, sponsorHeaders);
    sheet.appendRow([
      ts,
      data.organizationName || data.orgName || '',
      data.contactPerson || '',
      data.email || '',
      data.phone || '',
      data.website || '',
      data.sponsorshipCategory || data.sponsorshipType || '',
      data.companyDescription || '',
      data.expectedContribution || '',
      data.additionalNotes || '',
      emailSent,
      emailQuotaLeft,
      data.sponsorshipType || data.sponsorshipCategory || '',
      data.sponsorshipAmount || '',
    ]);
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
      'Email Quota Left',
    ];
    ensureHeaders_(sheet, partnerHeaders);
    sheet.appendRow([
      ts,
      data.organizationName || data.orgName || '',
      data.contactPerson || '',
      data.email || '',
      data.phone || '',
      data.website || '',
      data.partnerCategory || '',
      data.companyDescription || '',
      data.additionalNotes || '',
      emailSent,
      emailQuotaLeft,
    ]);
    return;
  }

  if (type === 'delegate') {
    var eventsValue = data.events || '';
    if (Object.prototype.toString.call(data.eventsList) === '[object Array]') {
      eventsValue = data.eventsList.join(', ');
    } else if (Object.prototype.toString.call(data.events) === '[object Array]') {
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
      'Email Quota Left',
    ];
    ensureHeaders_(sheet, delegateHeaders);
    sheet.appendRow([
      ts,
      data.fullName || '',
      data.email || '',
      data.phone || '',
      data.idDetails || '',
      eventsValue,
      emailSent,
      emailQuotaLeft,
    ]);
    return;
  }

  // speaker
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
    'Email Quota Left',
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
    data.phone || '',
    data.linkedIn || data.linkedin || '',
    data.speakerBio || '',
    data.areaOfExpertise || data.expertise || '',
    data.topicProposal || data.speakerTopic || '',
    data.previousSpeakingExperience || data.previousExperience || '',
    data.personalWebsite || '',
    emailSent,
    emailQuotaLeft,
    data.speakerName || data.fullName || '',
    data.speakerTopic || data.topicProposal || '',
  ]);
}

function isValidEmail_(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
}

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

  MailApp.sendEmail({
    to: to,
    subject: content.subject,
    htmlBody: html,
    body: text,
    name: 'Startup Confluence 2.0',
    replyTo: CONTACT_EMAIL,
  });

  return { sent: true, to: to };
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
        'Stall booking: ' + (data.stallRequired || data.needStall || '—') + ' (FCFS)',
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
        'Sponsorship type: ' + (data.sponsorshipType || data.sponsorshipCategory || '—'),
        'Proposed amount: ' +
          (data.expectedContribution || data.sponsorshipAmount || '—'),
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
    } else if (Object.prototype.toString.call(data.events) === '[object Array]') {
      eventsText = data.events.join(', ');
    }

    return {
      subject: 'Delegate / Visitor registration received — Startup Confluence 2.0',
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
      'Proposed topic: ' + (data.speakerTopic || data.topicProposal || '—'),
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
    // If Drive upload fails, keep any provided URL so the row is still useful
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
