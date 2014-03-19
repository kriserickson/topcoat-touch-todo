describe("Test toDoService", function () {
    var toDoService;
    
    before(function() {
        toDoService = new ToDoService({todos: "{\"1\":{\"id\":1,\"name\":\"Test 1 Name\",\"details\":\"Test 1 Details.\",\"dateDue\":\"2014-01-01T00:00:00.000Z\",\"complete\":false}," +
                    "\"2\":{\"id\":2,\"name\":\"Test 2 Name\",\"details\":\"Test 2 Details\",\"dateDue\":\"2014-05-02T00:00:00.000Z\",\"complete\":true}," +
                    "\"3\":{\"id\":3,\"name\":\"Test 3 Name\",\"details\":\"Test 3 Details\",\"dateDue\":\"2014-05-05T00:00:00.000Z\",\"complete\":false}," +
                    "\"4\":{\"id\":4,\"name\":\"Test 4 Name\",\"details\":\"Test 4 Details\",\"dateDue\":\"2014-06-01T00:00:00.000Z\",\"complete\":false}}"});
    });

    after(function() {


    });

    it('should have 4 toDos', function() {
        expect(Object.keys(toDoService.getAllToDos()).length).to.equal(4);
    });

    it('toDo 1 should be named Test 1 Name', function() {
        expect(toDoService.getToDo(1).name).to.equal("Test 1 Name");
    });

    it('toDo 4 should have a details called Test 4 Details', function() {
        expect(toDoService.getToDo(4).details).to.equal("Test 4 Details");
    });

    it('removing toDo should cause 3 toDos to remain', function() {
        var removeToDo = toDoService.getToDo(3);
        toDoService.removeToDo(removeToDo);
        expect(Object.keys(toDoService.getAllToDos()).length).to.equal(3);
        expect(toDoService.getToDo(3)).to.equal(undefined);

    });




});
