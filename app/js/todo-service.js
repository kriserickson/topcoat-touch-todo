// This todoService is a singleton, so we new an Anonymous function.
window.ToDoService = function ToDoService(localStorage) {
    var id = 1;
    var toDos = {};
    var self = this;

    // The ToDo class is only avaialble in the toDoService
    function ToDo(name, details, dateDue, complete) {
        this.id = id++;
        this.name = name;
        this.details = details;
        this.dateDue = new Date(dateDue);
        this.dateDueString = function() {
            // Create a YYYY-mm-dd style date, in production use Moment.js
            return this.dateDue.getFullYear() + '-' + (Array(2).join(0) + (this.dateDue.getMonth() + 1)).slice(-2) + '-' +
                (Array(2).join(0) +  this.dateDue.getDate()).slice(-2);
        };
        this.complete = !!complete; // Enforce a boolean
    }

    this.addToDo = function(name, details, dateDue, complete) {
        var todo = new ToDo(name, details, dateDue, complete);
        toDos[todo.id] = todo;
        return todo;
    };

    this.removeToDo = function(toDo) {
        delete toDos[toDo.id];
    };

    this.save = function() {
        window.localStorage['todos'] = JSON.stringify(toDos);
    };

    this.getAllToDos = function() {
        return toDos;
    };

    this.getToDo = function(id) {
        return toDos[id];
    };

    // If we already have todos, load them
    if (localStorage['todos']) {
        var toDoPojos = JSON.parse(localStorage['todos']);
        $.each(toDoPojos, function(index, val) {
            self.addToDo(val.name, val.details, val.dateDue, val.complete);
        });
    } else {
        // Load some bogus todos to start, delete this before production...
        this.addToDo('Create TODO App', 'Step 1 is to create the ToDo app', new Date(2014,3,30));
        this.addToDo('Test TODO App', 'Step 2 is some quick testing', new Date(2014,4,2));
        this.addToDo('Profit!!!', 'Step 3 is sell our ToDo app for millions on the app store', new Date(2014,4,5));
        this.save();
    }


};