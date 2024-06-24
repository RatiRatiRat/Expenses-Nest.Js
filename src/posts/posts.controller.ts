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
import { PostsService } from './posts.service';
import { Post as BlogPost } from './post.entity';

@Controller('api')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('posts')
  create(@Body() post: BlogPost): BlogPost {
    return this.postsService.create(post);
  }

  @Get('posts')
  findAll(): BlogPost[] {
    return this.postsService.findAll();
  }

  @Get('posts/:id')
  findOne(@Param('id') id: number): BlogPost {
    try {
      return this.postsService.findOne(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Put('posts/:id')
  update(@Param('id') id: number, @Body() post: BlogPost): BlogPost {
    try {
      return this.postsService.update(id, post);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete('posts/:id')
  remove(@Param('id') id: number): void {
    try {
      this.postsService.remove(id);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
