function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Nepal Home Tuition Vacancies");

  if (!sheet) {
    var sheets = SpreadsheetApp.getActiveSpreadsheet().getSheets().map(function(s) { return s.getName(); });
    return ContentService.createTextOutput(JSON.stringify({
      error: "Sheet 'Nepal Home Tuition Vacancies' not found",
      availableSheets: sheets
    })).setMimeType(ContentService.MimeType.JSON);
  }

  var rows = sheet.getDataRange().getValues();
  var headers = rows[0].map(function(h) { return String(h).trim(); });
  var data = [];

  if (rows.length <= 1) {
    return ContentService.createTextOutput(JSON.stringify([]))
      .setMimeType(ContentService.MimeType.JSON);
  }

  for (var i = 1; i < rows.length; i++) {
    var row = rows[i];
    var record = {};
    for (var j = 0; j < headers.length; j++) {
      record[headers[j]] = row[j];
    }

    var active = String(record["Active"]).toUpperCase() === "TRUE";
    if (!active) continue;

    data.push({
      id: String(record["ID"] || "").trim(),
      status: String(record["Status"] || "").trim().toUpperCase(),
      subject: String(record["Subject"] || "").trim(),
      "class": String(record["Class"] || "").trim(),
      location: String(record["Location"] || "").trim(),
      salary: Number(record["Salary"]) || 0,
      teacherGender: String(record["TeacherGender"] || "").trim(),
      duration: String(record["Duration"] || "").trim(),
      description: String(record["Description"] || "").trim(),
      postedDate: String(record["PostedDate"] || "").trim(),
      experience: String(record["Experience"] || "").trim(),
      education: String(record["Education"] || "").trim(),
      urgent: String(record["Urgent"]).toUpperCase() === "TRUE",
      active: true
    });
  }

  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
