/**
 * Demo App for TopcoatTouch
 */
$(document).ready(function() {


    // Create the topcoatTouch object
    var tt = new TopcoatTouch();

    function ToDo(name, details, dateDue, complete) {
        this.name = name;
        this.details = details;
        this.dateDue = function() {
            return dateDue.getFullYear() + '-' + (Array(2).join(0) +  dateDue.getMonth()).slice(-2) + '-' +
                (Array(2).join(0) +  dateDue.getDate()).slice(-2);
        };
        this.complete = !!complete;
    }

    // First page we go to home...  This could be done in code by setting the class to 'page page-center', but here is how to do it in code...
    var todos = [new ToDo('Create TODO App', '', new Date(2014,3,30)),
        new ToDo('Test TODO App', '', new Date(2014,4,2)),
        new ToDo('Profit!!!', '', new Date(2014,4,5))
    ];

    var todoList = '';

    $.each(todos, function(key, todo) {
        todoList += '<li class="topcoat-list__item" data-rel="todoView">' +
            '<span class="toDoName two-thirds">' + todo.name + '</span>' +
            '<span class="toDoDate">' + todo.dateDue() + '</span>' +
            '<span class="chevron"></span></li>';
    });

    $('#todoList').html(todoList);

    tt.goTo('home');



});
