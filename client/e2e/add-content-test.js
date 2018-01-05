import PageObject from './page-object.js';

fixture `Content add test`
	.page `localhost:4000/#/content/add`;
    

test('New content saved and redirect', async t => {
    const page = new PageObject();
    const contentItemsCount = await page.items.count;
    const pc = page.items.count;
    function huhu(){
        const prom = () => new Promise(function(resolve, reject){
            try{
                 resolve(contentItemsCount)
            }
            catch(e){
                 reject(e)   
            }
       })
        return prom()
    }
    

    await t
        .click(page.submitContent)

    await t
        .expect(page.addWrapper.id).notEql('detailPaper')
        .expect(page.items.count).eql(huhu())
});





