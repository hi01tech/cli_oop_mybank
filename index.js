#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Welcome message
console.log("-".repeat(60));
console.log(chalk.yellow.bold(`\n\t  "Welcome to MyBank Services"\n`));
console.log("-".repeat(60));
console.log('\n');
// Customer Class:
class Customer {
    firstName;
    lastName;
    gender;
    age;
    mobileNumber;
    account;
    constructor(firstName, lastName, gender, age, mobileNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}
// Bank Account Class:
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // Debit Money(withdraw):
    Debit(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.rgb(241, 195, 208)(`\n $${amount} Withdraw Sucessfully!`) + chalk.rgb(255, 255, 146)(`\n Remaining balance: $${this.balance}\n`));
        }
        else {
            console.log(chalk.redBright("\nYou have Insufficient Balance\n"));
        }
    }
    // Credidt Money(deposit):
    Credit(amount) {
        if (amount > 100) {
            amount -= 1; // $1 fee charge if more than 100 is deposit
        }
        this.balance += amount;
        console.log(chalk.rgb(241, 195, 208)(`\n $${amount} Deposit Sucessfully!`) + chalk.rgb(255, 255, 146)(`\n Remaining balance: $${this.balance}\n`));
    }
    // Check balance:
    checkBalance() {
        console.log(chalk.rgb(255, 255, 146)(`\nYour Current Balance: $${this.balance}\n`));
    }
}
// Create Bank Account:
const accounts = [
    new BankAccount(1001, 500),
    new BankAccount(1002, 1000),
    new BankAccount(1003, 2000)
];
// Create customer:
const coustomer = [
    new Customer("Huzaifa", "Khan", "male", 35, 3162223334, accounts[0]),
    new Customer("Usama", "Butt", "male", 24, 13227804212, accounts[1]),
    new Customer("Shagufta", "Malik", "female", 29, 92672533498, accounts[2])
];
// Function to Interaction with Bank Account: 
async function BankService() {
    do {
        const accInput = await inquirer.prompt({
            name: "accNumber",
            type: "number",
            message: chalk.white("Enter Your Account Number: "),
        });
        const coustom = coustomer.find(customers => customers.account.accountNumber === accInput.accNumber);
        if (coustom) {
            console.log(chalk.rgb(241, 195, 208)(`\n\t "Welcome! ${coustom.firstName} ${coustom.lastName}"\n`));
            const ans = await inquirer.prompt({
                name: "Select",
                type: "list",
                message: chalk.white("Please select the service: "),
                choices: ["Cash Withdraw", "Cash Deposit", "Check Balance", "Exit"]
            });
            switch (ans.Select) {
                case "Cash Deposit":
                    const depositeAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.white("Enter the amount to deposit: ")
                    });
                    coustom.account.Credit(depositeAmount.amount);
                    break;
                case "Cash Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.white("Enter the amount to withdraw: ")
                    });
                    coustom.account.Debit(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    coustom.account.checkBalance();
                    break;
                case "Exit":
                    console.log(chalk.greenBright.italic(`\n "Thank You for using our Bank services. Have a nice day!"\n`));
                    console.log(chalk.rgb(255, 255, 146)(" Exiting Bank Program...\n"));
                    return;
            }
        }
        else {
            console.log(chalk.redBright("\nInvalid Account Number!. Please try Again\n"));
        }
    } while (true);
}
// Calling bank service function
BankService();
