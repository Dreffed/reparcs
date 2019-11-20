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

        // add a table scraper for this page.. tailored to the site..
        const teams = await page.evaluate(() => {
            // get the ineer text from element helper
            const grabFromRow = (row, classname) => row
                .querySelector(`td.${classname}`)
                .innerText
                .trim()
            
            // set up the selector
            const TEAM_ROW_SELECTOR = 'tr.team'

            // save the data...
            const data = []

            // get all the rows
            const teamRows = document.querySelectorAll(TEAM_ROW_SELECTOR)

            // process the results
            for (const tr of teamRows){
                data.push({
                    name: grabFromRow(tr, 'name'),
                    year: grabFromRow(tr, 'year'),
                    wins: grabFromRow(tr, 'wins'),
                    losses: grabFromRow(tr, 'losses')
                })
            }

            return data
        })

        // log the output
        console.log(JSON.stringify(teams, null, 2))

        // save the output
        const fs = require('fs')
        fs.writeFile(
            './json/teams.json',
            JSON.stringify(teams, null, 2),
            (err) => err ? console.error('Data not written', err): console.log('Data Written!')
        )

        // close and clean up
        await browser.close()

    } catch(error){
        // handle the error
        console.log(error)
    }
})()