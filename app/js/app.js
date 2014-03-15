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
        tt.goTo('#home');
    }

    createToDoList();

    $('#todoList').on('click', 'li[data-id]', function() {
        toDo = toDoService.getToDo($(this).data('id'));
        $('#todoView .header, #nameField').text(toDo.name);
        $('#dueDateField').text(toDo.dateDue.toLocaleString());
        $('#detailsField').text(toDo.details);
    });

    var $todoEdit = $('#todoEdit');

    $('#addButton').click(function() {
        state = 'new';
        $todoEdit.find('.header').text('Add ToDo');
        $todoEdit.find('input, textarea').val('');  // Clear out the input and text..
        tt.goTo($todoEdit);
    });

    $('#editButton').click(function() {
        state = 'save';
        $todoEdit.find('.header').text('Edit ' + toDo.name);
        $todoEdit.find('#nameInput').val(toDo.name);
        $todoEdit.find('#dueDateInput').val(toDo.dateDueString());
        $todoEdit.find('#detailsTextarea').val(toDo.details);
        tt.goTo($todoEdit);
    });

    $('#deleteButton').click(function() {
        deleteToDo(toDo);
    });


    $('#saveButton').click(function() {
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
