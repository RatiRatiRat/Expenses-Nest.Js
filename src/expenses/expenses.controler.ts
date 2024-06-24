import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { Expense } from './expenes.entity';

@Controller('api')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post('expenses')
  create(@Body() expense: Expense): Expense {
    console.log('Creating expense:', expense);
    return this.expensesService.create(expense);
  }

  @Get('expenses')
  findAll(): Expense[] {
    console.log('Finding all expenses');
    return this.expensesService.findAll();
  }

  @Get('expenses/:id')
  findWithId(@Param('id') id: number): Expense {
    console.log('Finding expense with ID:', id);
    try {
      return this.expensesService.findWithId(id);
    } catch (error) {
      console.error('Error finding expense with ID:', id, error.message);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put('expenses/:id')
  update(@Param('id') id: number, @Body() expense: Expense): Expense {
    console.log('Updating expense with ID:', id, expense);
    try {
      const updatedExpense = this.expensesService.update(id, expense);
      if (!updatedExpense) {
        throw new HttpException('Expense not found', HttpStatus.NOT_FOUND);
      }
      return updatedExpense;
    } catch (error) {
      console.error('Error updating expense with ID:', id, error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('expenses/:id')
  remove(@Param('id') id: number): void {
    console.log('Removing expense with ID:', id);
    try {
      this.expensesService.remove(id);
    } catch (error) {
      console.error('Error removing expense with ID:', id, error.message);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
