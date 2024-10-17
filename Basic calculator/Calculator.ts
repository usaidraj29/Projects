import * as readline from 'readline';

console.log("Welcome to my Basic Calculator");

class Calculator {
  private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  public start(): void {
    this.askName();
  }

  private askName(): void {
    this.rl.question('Tell me your name? ', (name: string) => {
      console.log(`Howdy, ${name}!`);
      this.askOperation();
    });
  }

  private askOperation(): void {
    console.log('What operation would you like to perform?');
    console.log('(add (0), subtract (1), multiply (2), divide (3))');
    this.rl.question('Enter operation: ', (operation: string) => {
      // Validate operation input
      if (this.isValidOperation(operation)) {
        this.askNumbers(operation.trim());
      } else {
        console.error('Invalid operation. Please use (add (0), subtract (1), multiply (2), divide (3)).');
        this.askOperation(); // Prompt again for valid operation
      }
    });
  }

  private askNumbers(operation: string): void {
    this.rl.question('Enter first number: ', (num1: string) => {
      this.rl.question('Enter second number: ', (num2: string) => {
        const firstNum = parseFloat(num1);
        const secondNum = parseFloat(num2);
        
        if (isNaN(firstNum) || isNaN(secondNum)) {
          console.error('Invalid number(s). Please enter valid numbers.');
          this.askNumbers(operation); // Prompt for numbers again
        } else {
          this.calculate(operation, firstNum, secondNum);
        }
      });
    });
  }

  private isValidOperation(operation: string): boolean {
    return ['0', '1', '2', '3'].includes(operation.trim());
  }

  private calculate(operation: string, num1: number, num2: number): void {
    let result: number;

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

    console.log(`Result: ${result}`);
    this.askAnotherCalculation(); // Ask if user wants to perform another calculation
  }

  private askAnotherCalculation(): void {
    this.rl.question('Do you want to perform another calculation? (yes/no): ', (answer: string) => {
      if (answer.toLowerCase() === 'yes') {
        this.askOperation(); 
      } else {
        console.log("Thanks for using my basic calculator ^_^")

        this.rl.close();
      }
    });
  }
}

const calculator = new Calculator();
calculator.start();
