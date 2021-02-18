const puppeteer = require('puppeteer')

async function getTitlesInPages () {
    let pagesProducts = [
        '', // pages
    ]
    let titles = []
    try {    
        for(pageProduct of pagesProducts) {

        
        const browser = await puppeteer.launch({headless: false})
        const page = await browser.newPage()
        await page.goto(pageProduct)
    

        const image_btn_close = await page.$('.btn-close')
        if(image_btn_close) {
            await image_btn_close.click()
        }
        const title = await page.$eval('.product-title-text', element => element.innerHTML)
        await browser.close()

        String.prototype.slugify = function () {
            return  this.toString().toLowerCase()
            .replace(/[àÀáÁâÂãäÄÅåª]+/g, 'a')       // Special Characters #1
            .replace(/[èÈéÉêÊëË]+/g, 'e')       	// Special Characters #2
            .replace(/[ìÌíÍîÎïÏ]+/g, 'i')       	// Special Characters #3
            .replace(/[òÒóÓôÔõÕöÖº]+/g, 'o')       	// Special Characters #4
            .replace(/[ùÙúÚûÛüÜ]+/g, 'u')       	// Special Characters #5
            .replace(/[ýÝÿŸ]+/g, 'y')       		// Special Characters #6
            .replace(/[ñÑ]+/g, 'n')       			// Special Characters #7
            .replace(/[çÇ]+/g, 'c')       			// Special Characters #8
            .replace(/[ß]+/g, 'ss')       			// Special Characters #9
            .replace(/[Ææ]+/g, 'ae')       			// Special Characters #10
            .replace(/[Øøœ]+/g, 'oe')       		// Special Characters #11
            .replace(/[%]+/g, 'pct')    
            // .replace(/\s+/g, '-')           		// Replace spaces with -
            .replace(/[^\w\-]+/g, '-')       		// Remove all non-word chars
            .replace(/\-\-+/g, '-')         		// Replace multiple - with single -
            .replace(/^-+/, '-')             		// Trim - from start of text
            .replace(/-+$/, '-');            		// Trim - from end of text
            
            }


        console.info(title.slugify())
        titles.push(title.slugify())
        }
        console.info(titles)
    } catch (error) {
        console.error(error)
    }
}

getTitlesInPages()