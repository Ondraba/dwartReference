import PageObject from './page-object.js';

fixture `Content add test`
	.page `localhost:4000/#/content/add`;
    

test('New content saved and redirect', async t => {
    const page = new PageObject();
    const contentItemsCount = await page.items.count;
    console.log(contentItemsCount)
    await t
        .click(page.submitContent)

    await t
        .expect(page.addWrapper.id).notEql('detailPaper')
        .expect(page.items.count).eql(contentItemsCount)
});





