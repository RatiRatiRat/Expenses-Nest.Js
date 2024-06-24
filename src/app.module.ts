import { Module } from '@nestjs/common';
import { ExpensesModule } from './expenses/expenses.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [ExpensesModule,PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
