"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var ToDoList = /** @class */ (function () {
    function ToDoList() {
        this.tasks = [];
    }
    ToDoList.prototype.addTask = function (title) {
        this.tasks.push({ title: title, completed: false });
        console.log('Task "' + title + '" added.');
    };
    ToDoList.prototype.removeTask = function (index) {
        if (index < 0 || index >= this.tasks.length) {
            console.log("Invalid task number.");
            return;
        }
        var removedTask = this.tasks.splice(index, 1);
        console.log('Task "' + removedTask[0].title + '" removed.');
    };
    ToDoList.prototype.completeTask = function (index) {
        if (index < 0 || index >= this.tasks.length) {
            console.log("Invalid task number.");
            return;
        }
        this.tasks[index].completed = true;
        console.log('Task "' + this.tasks[index].title + '" marked as completed.');
    };
    ToDoList.prototype.viewTasks = function () {
        if (this.tasks.length === 0) {
            console.log("No tasks available.");
            return;
        }
        console.log("Your To-Do List:");
        for (var i = 0; i < this.tasks.length; i++) {
            var task = this.tasks[i];
            var status_1 = task.completed ? "✓" : "✗";
            console.log((i + 1) + '. [' + status_1 + '] ' + task.title);
        }
    };
    return ToDoList;
}());
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
var todoList = new ToDoList();
var gameLoop = function () {
    rl.question("\nEnter a command (add, remove, complete, view, exit): ", function (command) {
        var parts = command.split(" ");
        var action = parts[0];
        if (action === "add") {
            var title = parts.slice(1).join(" ");
            todoList.addTask(title);
        }
        else if (action === "remove") {
            var removeIndex = parseInt(parts[1]) - 1;
            todoList.removeTask(removeIndex);
        }
        else if (action === "complete") {
            var completeIndex = parseInt(parts[1]) - 1;
            todoList.completeTask(completeIndex);
        }
        else if (action === "view") {
            todoList.viewTasks();
        }
        else if (action === "exit") {
            console.log("Thanks for using my To-Do List ^_^");
            rl.close();
            return;
        }
        else {
            console.log("Unknown command. Please try again.");
        }
        gameLoop();
    });
};
console.log("Welcome to my To-Do List ^_^");
gameLoop();
