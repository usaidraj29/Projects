    import * as readline from 'readline';

    type Task = {
        title: string;
        completed: boolean;
    };

    class ToDoList {
        tasks: Task[];

        constructor() {
            this.tasks = []; 
        }

        addTask(title: string) {
            this.tasks.push({ title: title, completed: false });
            console.log('Task "' + title + '" added.');
        }

        removeTask(index: number) {
            if (index < 0 || index >= this.tasks.length) {
                console.log("Invalid task number.");
                return;
            }
            const removedTask = this.tasks.splice(index, 1);
            console.log('Task "' + removedTask[0].title + '" removed.');
        }

        completeTask(index: number) {
            if (index < 0 || index >= this.tasks.length) {
                console.log("Invalid task number.");
                return;
            }
            this.tasks[index].completed = true;
            console.log('Task "' + this.tasks[index].title + '" marked as completed.');
        }

        viewTasks() {
            if (this.tasks.length === 0) {
                console.log("No tasks available.");
                return;
            }
            console.log("Your To-Do List:");
            for (let i = 0; i < this.tasks.length; i++) {
                const task = this.tasks[i];
                const status = task.completed ? "✓" : "✗";
                console.log((i + 1) + '. [' + status + '] ' + task.title);
            }
        }
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const todoList = new ToDoList();

    const gameLoop = () => {
        rl.question("\nEnter a command (add, remove, complete, view, exit): ", (command) => {
            const parts = command.split(" ");
            const action = parts[0];

            if (action === "add") {
                const title = parts.slice(1).join(" ");
                todoList.addTask(title);
            } else if (action === "remove") {
                const removeIndex = parseInt(parts[1]) - 1;
                todoList.removeTask(removeIndex);
            } else if (action === "complete") {
                const completeIndex = parseInt(parts[1]) - 1;
                todoList.completeTask(completeIndex);
            } else if (action === "view") {
                todoList.viewTasks();
            } else if (action === "exit") {
                console.log("Thanks for using my To-Do List ^_^");
                rl.close();
                return;
            } else {
                console.log("Unknown command. Please try again.");
            }
            gameLoop(); 
        });
    };

    console.log("Welcome to my To-Do List ^_^");
    gameLoop();
