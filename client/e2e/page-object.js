import ReactSelector from 'testcafe-react-selectors';

export default class ContentTest {
    constructor () {
        this.items     = ReactSelector('TableBody TableRow');
        this.filterItems = ReactSelector('FilterHolder div Select')
        this.addButton = ReactSelector('Paper div RaisedButton')
        this.addWrapper = ReactSelector('Paper')
        this.submitContent = ReactSelector('AddContent').find('.addNewContent')
        this.addNewContent = ReactSelector('ContentList').find('.addNewContent')
    }
}