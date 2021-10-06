const express = require('express');
const puppeteer = require('puppeteer');
const validUrl = require('valid-url');

const app = express();
const port = process.env.PORT || 5000;

app.get('/', async (req, res) => {
  const urlToScreenshot = decodeURIComponent(req.query.url);
  const { width, height, wait } = req.query;

  if (validUrl.isWebUri(urlToScreenshot)) {
    console.log('Screenshotting: ', urlToScreenshot);
    (async () => {
      const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      });

      const page = await browser.newPage();

      if (height && width) {
        await page.setViewport({
          width: Number(width),
          height: Number(height),
        });
      }
      await page.goto(urlToScreenshot, { waitUntil: 'networkidle0' });

      if (wait) {
        await page.waitForSelector(wait, { visible: true });
      }

      await page.screenshot().then(buffer => {
        res.setHeader(
          'Content-Disposition',
          `attachment;filename="${urlToScreenshot}.png"`
        );
        res.setHeader('Content-Type', 'image/png');
        res.send(buffer);
      });

      await browser.close();
    })();
  } else {
    res.send('Invalid url: ', urlToScreenshot);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
