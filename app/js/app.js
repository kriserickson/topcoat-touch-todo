/**
 * Demo App for TopcoatTouch
 */
$(document).ready(function() {

    // Create the topcoatTouch object
    var tt = new TopcoatTouch();

    tt.goTo('home');

    var toDos = toDoService.getAllToDos();

    var todoList = '';

    $.each(toDos, function(key, toDo) {
        todoList += '<li class="topcoat-list__item" data-rel="todoView" data-id="' + toDo.id + '">' +
            '<span class="toDoName two-thirds">' + toDo.name + '</span>' +
            '<span class="toDoDate">' + toDo.dateDueString() + '</span>' +
            '<span class="chevron"></span></li>';
    });

    $('#todoList').html(todoList);

    $('#todoList').on('click', 'li[data-id]', function() {
        var toDo = toDoService.getToDo($(this).data('id'));
        $('#todoView .header, #nameField').text(toDo.name);
        $('#dueDateField').text(toDo.dateDue.toLocaleString());
        $('#detailsField').text(toDo.details);
    })

});
