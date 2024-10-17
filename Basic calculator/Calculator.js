"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
console.log("Welcome to my Basic Calculator");
var Calculator = /** @class */ (function () {
    function Calculator() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }
    Calculator.prototype.start = function () {
        this.askName();
    };
    Calculator.prototype.askName = function () {
        var _this = this;
        this.rl.question('Tell me your name? ', function (name) {
            console.log("Howdy, ".concat(name, "!"));
            _this.askOperation();
        });
    };
    Calculator.prototype.askOperation = function () {
        var _this = this;
        console.log('What operation would you like to perform?');
        console.log('(add (0), subtract (1), multiply (2), divide (3))');
        this.rl.question('Enter operation: ', function (operation) {
            // Validate operation input
            if (_this.isValidOperation(operation)) {
                _this.askNumbers(operation.trim());
            }
            else {
                console.error('Invalid operation. Please use (add (0), subtract (1), multiply (2), divide (3)).');
                _this.askOperation(); // Prompt again for valid operation
            }
        });
    };
    Calculator.prototype.askNumbers = function (operation) {
        var _this = this;
        this.rl.question('Enter first number: ', function (num1) {
            _this.rl.question('Enter second number: ', function (num2) {
                var firstNum = parseFloat(num1);
                var secondNum = parseFloat(num2);
                if (isNaN(firstNum) || isNaN(secondNum)) {
                    console.error('Invalid number(s). Please enter valid numbers.');
                    _this.askNumbers(operation); // Prompt for numbers again
                }
                else {
                    _this.calculate(operation, firstNum, secondNum);
                }
            });
        });
    };
    Calculator.prototype.isValidOperation = function (operation) {
        return ['0', '1', '2', '3'].includes(operation.trim());
    };
    Calculator.prototype.calculate = function (operation, num1, num2) {
        var result;
        switch (operation) {
            case '0': // add
                result = num1 + num2;
                break;
            case '1': // subtract
                result = num1 - num2;
                break;
            case '2': // multiply
                result = num1 * num2;
                break;
            case '3': // divide
                if (num2 === 0) {
                    console.error('Error: Division by zero is not allowed.');
                    this.askOperation(); // Ask for operation again instead of closing
                    return;
                }
                result = num1 / num2;
                break;
            default:
                console.error('Invalid operation encountered.'); // Fallback error handling
                return;
        }
        console.log("Result: ".concat(result));
        this.askAnotherCalculation(); // Ask if user wants to perform another calculation
    };
    Calculator.prototype.askAnotherCalculation = function () {
        var _this = this;
        this.rl.question('Do you want to perform another calculation? (yes/no): ', function (answer) {
            if (answer.toLowerCase() === 'yes') {
                _this.askOperation();
            }
            else {
                console.log("Thanks for using my basic calculator ^_^");
                _this.rl.close();
            }
        });
    };
    return Calculator;
}());
var calculator = new Calculator();
calculator.start();
