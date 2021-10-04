const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = process.env.SERVER_PORT || 5000;

app.get('/puppet', async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.goto('http://google.com');
    const image = await page.screenshot({ fullPage: true });
    await browser.close();
    res.set('Content-Type', 'image/png');
    res.send(image);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
