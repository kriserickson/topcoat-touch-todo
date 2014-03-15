/**
 * Demo App for TopcoatTouch
 */
$(document).ready(function() {

    // Create the topcoatTouch object
    var tt = new TopcoatTouch();
    var toDo;
    var state;

    function createToDoList() {
        var toDos = toDoService.getAllToDos();
        var todoList = '';
        $.each(toDos, function (key, toDo) {
            todoList += '<li class="topcoat-list__item" data-rel="todoView" data-id="' + toDo.id + '">' +
                '<span class="toDoName two-thirds">' + toDo.name + '</span>' +
                '<span class="toDoDate">' + toDo.dateDueString() + '</span>' +
                '<span class="chevron"></span></li>';
        });
        $('#todoList').html(todoList);
    }

    function deleteToDo(delToDo) {
        toDoService.removeToDo(delToDo);
        toDoService.save();
        createToDoList();
        if (tt.currentPage() != 'home') {
            tt.goTo('home');
        }
    }

    function showDeleteButton() {

        // reference the just swiped list item
        var $li = $(this);
        var toDoId = $li.data('id');

        // create buttons and div container
        var $deleteBtn = $('<button class="deleteButton topcoat-button">Delete</buton>');

        $deleteBtn.css({opacity: 0})
            .bind('click', function () {
                $deleteBtn.remove();
                deleteToDo(toDoService.getToDo(toDoId))
            });

        // insert swipe div into list item
        $li.prepend($deleteBtn);
        $deleteBtn.animate({opacity: 1}, 150);

        return false;
    }

    createToDoList();

    $('#todoList').on('click', 'li[data-id]', function() {
        toDo = toDoService.getToDo($(this).data('id'));
        $('#todoView .header, #nameField').text(toDo.name);
        $('#dueDateField').text(toDo.dateDue.toLocaleString());
        $('#detailsField').text(toDo.details);
    });

    var $todoEdit = $('#todoEdit');

    tt.on(tt.clickEvent, '#addButton', 'home', function() {
        state = 'new';
        $todoEdit.find('.header').text('Add ToDo');
        $todoEdit.find('input, textarea').val('');  // Clear out the input and text..
        tt.goTo($todoEdit);
    });

    tt.on(tt.clickEvent, '#editButton', 'todoView', function() {
        state = 'save';
        $todoEdit.find('.header').text('Edit ' + toDo.name);
        $todoEdit.find('#nameInput').val(toDo.name);
        $todoEdit.find('#dueDateInput').val(toDo.dateDueString());
        $todoEdit.find('#detailsTextarea').val(toDo.details);
        tt.goTo($todoEdit);
    });

    tt.on(tt.clickEvent, '#deleteButton', 'todoView', function() {
        deleteToDo(toDo);
    });

    tt.on('swiperight', 'li', 'home', showDeleteButton);

    tt.on(tt.EVENTS.PAGE_END, 'home', function() {
        $('.deleteButton').remove();
    });

    tt.on(tt.clickEvent, '#saveButton', 'todoEdit', function() {
        var name = $('#nameInput').val();
        var details = $('#detailsTextarea').val();
        var dueDate = $('#dueDateInput').val();
        if (state == 'new') {
            toDoService.addToDo(name, details, dueDate);
        } else {
            toDo.name = name;
            toDo.details = details;
            toDo.dueDate = dueDate;
        }
        toDoService.save();
        createToDoList();
        tt.goTo('#home');
    });

    tt.goTo('home');

});
