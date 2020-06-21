function myFunction () {
  var ss = SpreadsheetApp.openById('1D1yKV2OSlTfS2oQL74Xcd0mJ8-DSsZn88hQAV-6N82k');
  var mySheet = ss.getSheets()[0];  
  
  const puppeteer = require('puppeteer');

  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = 'https://www.mercari.com/jp/u/546096468/'
    await page.goto(url);
  
    const name = await page.evaluate(() =>
      Array.from(document.querySelectorAll('h3.items-box-name'))
        .map((partner) => partner.innerText.trim()
      )
    );
    console.log(name);
    await browser.close();
  })();
  mySheet.getRange(1,1).setValue(name);
};