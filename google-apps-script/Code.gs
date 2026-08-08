/**
 * Startup Confluence 2.0 — Registration Web App
 *
 * RECOMMENDED SETUP (avoids permission errors):
 * 1. Create a NEW Google Sheet under YOUR Google account
 * 2. Rename 3 tabs to: Startup, Sponsor, Speaker
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
  speaker: 'Speaker',
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
        error: 'Invalid registrationType. Use startup, sponsor, or speaker.',
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
        '". Create tabs named Startup, Sponsor, and Speaker.'
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
      data.needStall || '',
      data.fundingGrant || '',
      data.wantPitch || '',
      pitchDeckLink || data.pitchDeckUrl || '',
      data.linkedIn || data.linkedin || '',
      emailSent,
      emailQuotaLeft,
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
    ];
    ensureHeaders_(sheet, sponsorHeaders);
    sheet.appendRow([
      ts,
      data.organizationName || data.orgName || '',
      data.contactPerson || '',
      data.email || '',
      data.phone || '',
      data.website || '',
      data.sponsorshipCategory || '',
      data.companyDescription || '',
      data.expectedContribution || '',
      data.additionalNotes || '',
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
  ];
  ensureHeaders_(sheet, speakerHeaders);
  sheet.appendRow([
    ts,
    data.fullName || '',
    data.organization || '',
    data.designation || '',
    data.email || '',
    data.phone || '',
    data.linkedIn || data.linkedin || '',
    data.speakerBio || '',
    data.areaOfExpertise || data.expertise || '',
    data.topicProposal || '',
    data.previousSpeakingExperience || data.previousExperience || '',
    data.personalWebsite || '',
    emailSent,
    emailQuotaLeft,
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

  var subject = '';
  var greetingName = '';
  var detailLines = [];

  if (type === 'startup') {
    subject = 'Registration received — Startup Confluence 2.0';
    greetingName = data.founderName || 'Founder';
    detailLines = [
      'Registration type: Startup',
      'Startup: ' + (data.startupName || '—'),
      'Stage: ' + (data.startupStage || '—'),
      'Industry: ' + (data.industry || '—'),
      'Received Funding: ' + (data.fundingGrant || '—'),
      'Want to Pitch: ' + (data.wantPitch || '—'),
    ];
  } else if (type === 'sponsor') {
    subject = 'Partnership inquiry received — Startup Confluence 2.0';
    greetingName = data.contactPerson || 'Partner';
    detailLines = [
      'Registration type: Sponsor',
      'Organization: ' + (data.organizationName || data.orgName || '—'),
      'Category: ' + (data.sponsorshipCategory || '—'),
    ];
  } else {
    subject = 'Speaker application received — Startup Confluence 2.0';
    greetingName = data.fullName || 'Speaker';
    detailLines = [
      'Registration type: Speaker',
      'Organization: ' + (data.organization || '—'),
      'Topic: ' + (data.topicProposal || '—'),
    ];
  }

  var html =
    '<div style="font-family:Arial,Helvetica,sans-serif;line-height:1.55;color:#0f172a;max-width:560px">' +
    '<h2 style="color:#5B21B6;margin:0 0 12px">Startup Confluence 2.0</h2>' +
    '<p>Hi ' +
    escapeHtml_(greetingName) +
    ',</p>' +
    '<p>Thanks for applying. We have received your submission and our team will review it shortly.</p>' +
    '<div style="background:#f5f3ff;border:1px solid #ddd6fe;border-radius:12px;padding:14px 16px;margin:16px 0">' +
    detailLines
      .map(function (line) {
        return '<div>' + escapeHtml_(line) + '</div>';
      })
      .join('') +
    '</div>' +
    '<p>If you have questions, reply to this email or contact us at ' +
    '<a href="mailto:' +
    CONTACT_EMAIL +
    '">' +
    CONTACT_EMAIL +
    '</a>.</p>' +
    '<p style="color:#64748b;font-size:13px;margin-top:24px">United Incubation Hub · Prayagraj</p>' +
    '</div>';

  var text =
    'Hi ' +
    greetingName +
    ',\n\n' +
    'Thanks for applying to Startup Confluence 2.0. We have received your submission.\n\n' +
    detailLines.join('\n') +
    '\n\nContact: ' +
    CONTACT_EMAIL +
    '\n';

  MailApp.sendEmail({
    to: to,
    subject: subject,
    htmlBody: html,
    body: text,
    name: 'Startup Confluence 2.0',
    replyTo: CONTACT_EMAIL,
  });

  return { sent: true, to: to };
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
