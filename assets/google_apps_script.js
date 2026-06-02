// Google Apps Script — вставь этот код в script.google.com
// Привяжи к своей Google Таблице, задеплой как Web App.

function doGet() {
  return ContentService.createTextOutput("ok");
}

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const d = JSON.parse(e.postData.contents);

    // Создать шапку если таблица пустая
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "TIME", "LOCAL TIME", "TZ", "LANGUAGE",
        "OS", "BROWSER", "PLATFORM",
        "SCREEN", "VIEWPORT", "DPR", "COLOR DEPTH", "TOUCH PTS",
        "CPU CORES", "RAM GB", "BATTERY",
        "CONN TYPE", "DOWNLINK", "RTT", "SAVE DATA",
        "ONLINE", "COOKIES", "REFERRER",
        "IP", "CITY", "REGION", "COUNTRY", "ORG", "LAT", "LON"
      ]);
    }

    sheet.appendRow([
      d.time, d.local_time, d.tz, d.language,
      d.os, d.browser, d.platform,
      d.screen, d.viewport, d.dpr, d.color_depth, d.touch,
      d.cpu_cores, d.ram_gb, d.battery || "",
      d.conn_type, d.downlink, d.rtt, d.save_data,
      d.online, d.cookies, d.referrer,
      d.ip, d.city, d.region, d.country, d.org, d.lat, d.lon
    ]);
  } catch (err) {
    // тихо
  }

  return ContentService
    .createTextOutput("ok")
    .setMimeType(ContentService.MimeType.TEXT);
}
