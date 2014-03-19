/** @namespace $iframeContents **/
describe("Test ToDoApp Home Page", function () {


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

describe("Test ToDoApp View ToDo", function () {

    before(function(done) {
        var $res = $iframeContents.find('#todoList li[data-id="2"]');
        $res.trigger('click');
        (function checkDone() {
            if ($iframeContents.find('#todoView').hasClass('page-center')) {
                done();
            } else {
                setTimeout(checkDone, 20);
            }
        })();
    });

    after(function(done) {
        $iframeContents.find('#todoView .topcoat-icon--back').trigger('click');
        (function checkDone() {
            if ($iframeContents.find('#home').hasClass('page-center')) {
                done();
            } else {
                setTimeout(checkDone, 20);
            }
        })();
    });

    it('View Should Have Test 2 Name', function() {
        expect($iframeContents.find('#nameField').text()).to.equal('Test 2 Name');
    });


});

describe("Test ToDoApp Add ToDo", function () {


    before(function(done) {
        $iframeContents.find('#addButton').trigger('click');
        (function checkDone() {
            if ($iframeContents.find('#todoEdit').hasClass('page-center')) {
                done();
            } else {
                setTimeout(checkDone, 20);
            }
        })();
    });

    it('It should Add ToDo', function(done) {
        var nameText = 'Create ToDo Test';
        $iframeContents.find('#nameInput').val(nameText);
        $iframeContents.find('#dueDateInput').val('2014-06-06');
        $iframeContents.find('#detailsTextarea').val('Testing Creating ToDo');
        $iframeContents.find('#saveButton').trigger('click');
        (function checkDone() {
            if ($iframeContents.find('#home').hasClass('page-center')) {
                expect($iframeContents.find('#todoList li').length).to.equal(5);
                expect($($iframeContents.find('#todoList li')[4]).find('.toDoName').text()).to.equal(nameText);
                done();
            } else {
                setTimeout(checkDone, 20);
            }
        })();
    });


});



