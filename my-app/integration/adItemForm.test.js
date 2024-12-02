describe('addItemForm',()=>{
    it('correct', async()=>{
        await page.goto('http://localhost:6006/iframe.html?id=aditemform--logged-out&viewMode=story')
        const image = await page.screenshot();

        expect(image).toMatchImageSnapshot()
    })
} )