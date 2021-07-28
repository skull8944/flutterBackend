const puppeteer = require('puppeteer');
const cheerio = require("cheerio");

module.exports.covid_get = async (req, res) => {
  (async () => {
    const browser = await puppeteer.launch({
        headless: true
        //false 會讓瀏覽器實際開啟
        //true 會再後台開啟
    });
    const page = await browser.newPage();
    await page.goto('https://covid-19.nchc.org.tw/index.php');
    await page.waitForSelector('section')
    let body = await page.content()
    let $ = await cheerio.load(body)
    
    //我們把cheerio找到的資料轉成文字並存進data這個變數
    let data = [];
    $('div.container div.row div.col-lg-3.col-sm-6.col-6.text-center.my-5').each((i, el) => { //p.text-muted span.country_confirmed_percent small
      const $el = $(el);
      if(i == 0){ //累積確診
        data.push($el.find('h1.country_confirmed.mb-1.text-success').text().trim());
        data.push($el.find('p.text-muted span.country_confirmed_percent small').text().substring(4).trim());
      }
      else if(i == 1){ //新增確診
        data.push($el.find('h1.country_recovered.mb-1.text-info').text().substring(1).trim());
        data.push($el.find('p.text-muted span.country_confirmed_percent small').text().substring(4).trim());
      }
      else if(i == 2){ //累積死亡
        data.push($el.find('a h1.country_deaths.mb-1.text-dark').text().trim());
        data.push($el.find('p.text-muted span.country_deaths_change').text().substring(1).trim());
      }
      else if(i == 3){ //疫苗涵蓋率
        data.push($el.find('a h1.country_deaths.mb-1.text-danger').text().trim());
        data.push($el.find('p.text-muted span.country_deaths_change').text().substring(1).trim());
      }
    });

    res.status(200).json({ totalConfirmed: data[0], localConfirmed: data[1],
                            newTotalConfirmed: data[2], newLocalConfirmed: data[3],
                            totalDeath: data[4], newDeath: data[5],
                            injection: data[6], newInjection: data[7] });

    await browser.close()
  })();
};
