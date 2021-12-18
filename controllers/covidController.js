const puppeteer = require('puppeteer');
const cheerio = require("cheerio");
const CovidInfo = require('../models/CovidInfo');
const e = require('express');

module.exports.getCovidInfo = async () => {
  const browser = await puppeteer.launch({
    headless: true
  });
  const page = await browser.newPage();
  await page.goto('https://covid-19.nchc.org.tw/index.php');
  await page.waitForSelector('section');
  let body = await page.content();
  let $ = await cheerio.load(body);

  var now = new Date();
  const date = now.getFullYear().toString() + '/' + (now.getMonth() + 1).toString() + '/' + now.getDate().toString();

  var totalConfirmed, localConfirmed, newTotalConfirmed, newLocalConfirmed, totalDeath, newDeath, injection , newInjection;
  
  $('div.container div.row div.col-lg-3.col-sm-6.col-6.text-center.my-5').each((i, el) => { //p.text-muted span.country_confirmed_percent small
    var $el = $(el);
    if(i == 0){ //累積確診
      totalConfirmed = $el.find('h1.country_confirmed.mb-1.text-success').text().trim();
      localConfirmed = $el.find('p.text-muted span.country_confirmed_percent small').text().substring(4).trim();
    }
    else if(i == 1){ //新增確診
      newTotalConfirmed = $el.find('h1.country_recovered.mb-1.text-info').text().substring(1).trim();
      newLocalConfirmed = $el.find('p.text-muted span.country_confirmed_percent small').text().substring(4).trim();
    }
    else if(i == 2){ //累積死亡
      totalDeath = $el.find('a h1.country_deaths.mb-1.text-dark').text().trim();
      newDeath = $el.find('p.text-muted span.country_deaths_change').text().substring(1).trim();
    }
    else if(i == 3){ //疫苗涵蓋率
      injection = $el.find('a h1.country_deaths.mb-1.text-danger').text().trim();
      newInjection = $el.find('p.text-muted span.country_deaths_change').text().substring(1).trim();
    }
  });  

  try{
    const covidInfo = await CovidInfo.create({
      date, totalConfirmed, localConfirmed, newTotalConfirmed, newLocalConfirmed, totalDeath, newDeath, injection, newInjection
    });
    console.log(covidInfo)
  } catch(err) {
    console.log(err);
  }

  await browser.close();
}

module.exports.covid_get = async (req, res) => {
  const data = await CovidInfo.findOne({}, {}, { sort: { 'created_at' : -1 } });

  if(data) {
    res.status(200).json({ 
      date: data.date,
      totalConfirmed: data.totalConfirmed, localConfirmed: data.localConfirmed,
      newTotalConfirmed: data.newTotalConfirmed, newLocalConfirmed: data.newLocalConfirmed,
      totalDeath: data.totalDeath, newDeath: data.newDeath,
      injection: data.injection, newInjection: data.newInjection 
    });  
  } else {
    res.send('no data');
  }
  
};
