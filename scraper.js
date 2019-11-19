// include modules
const puppeteer = require('puppeteer')

// main loop
void(async () => {
    try {
        // action and process
        const browser = await puppeteer.launch()

        // create a page
        const page = await browser.newPage()

        // navigate to a page
        await page.goto('https://scrapethissite.com/pages/forms/')

        // save a screnshot
        await page.screenshot({
            path: './screenshots/page1.png'
        })

        // save a pdf
        await page.pdf({
            path: './pdfs/page1.pdf'
        })

        // close and clean up
        await browser.close()

    } catch(error){
        // handle the error
        console.log(error)
    }
})()