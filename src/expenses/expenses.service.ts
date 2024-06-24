import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Expense } from './expenes.entity';

@Injectable()
export class ExpensesService {
  private expenses: Expense[] = [];
  private idCounter = 1;

  create(expense: Expense): Expense {
    console.log('Service: Creating expense', expense);
    expense.id = this.idCounter++;
    expense.createdDate = new Date();
    this.expenses.push(expense);
    console.log('Service: Expense created', expense);
    return expense;
  }

  findAll(): Expense[] {
    console.log('Service: Finding all expenses');
    return this.expenses;
  }

  findWithId(id: number): Expense {
    console.log(`Service: Finding expense with ID: ${id}`);
    const foundExpense = this.expenses.find(expense => expense.id === id);
    if (!foundExpense) {
      console.error(`Service: Expense with ID: ${id} not found`);
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }
    console.log('Service: Expense found', foundExpense);
    return foundExpense;
  }

  update(id: number, expense: Expense): Expense {
    console.log(`Service: Updating expense with ID: ${id}`, expense);
    const index = this.expenses.findIndex(exp => exp.id === id);
    if (index !== -1) {
      this.expenses[index] = { ...this.expenses[index], ...expense, id }; // Ensure ID is not overwritten
      console.log('Service: Expense updated', this.expenses[index]);
      return this.expenses[index];
    } else {
      console.error(`Service: Expense with ID: ${id} not found`);
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }
  }

  remove(id: number): void {
    console.log(`Service: Removing expense with ID: ${id}`);
    const initialLength = this.expenses.length;
    this.expenses = this.expenses.filter(expense => expense.id !== id);
    if (this.expenses.length === initialLength) {
      console.error(`Service: Expense with ID: ${id} not found`);
      throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
    }
    console.log(`Service: Expense with ID: ${id} removed`);
  }
}
