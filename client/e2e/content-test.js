import PageObject from './page-object.js';

fixture `Content test`
	.page `localhost:4000/#/admin`;
    
const page = new PageObject();

test('Content items rendered', async t => {
    const contentItemsCount = await page.items.count;
    await t
        .expect(page.items.count).gt(1)
});

test('Filters filled by selects', async t => {
    const contentItemsCount = await page.filterItems.count;
    await t
        .expect(page.filterItems.count).gt(1)
});


test('New content saved and redirect', async t => {
     const contentItemsCount = await page.items.count;
     const res = page.items.count;

    await t
        .click(page.addNewContent)

    await t
        .click(page.submitContent)
         
    await t
        .expect(page.addWrapper.id).notEql('detailPaper')
        .expect(page.items.count).eql(waitForRender() + 1) 
});




async function waitForRender(x) {
    const contentItemsCount = await page.items.count;
    return contentItemsCount;
}.then()