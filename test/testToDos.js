/**global: $iframeContents **/

describe("Test ToDoApp Home Page", function () {


    before(function() {

    });

    after(function() {

    });

    it('should be on the home page', function() {
        expect($iframeContents.find('#home').hasClass('page-center')).to.be.true;
    });

    it('toDo list should have 4 items', function() {
        expect($iframeContents.find('#todoList li').length).to.equal(4);
    });

    it('toDo list item 1 should be called Test1Name', function() {
        expect($($iframeContents.find('#todoList li')[0]).find('.toDoName').text()).to.equal('Test 1 Name');
    });

    it('toDo list item 3 should had id of 3', function() {
        expect($($iframeContents.find('#todoList li')[2]).data('id')).to.equal(3);
    });



});


