import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private idCounter = 1;

  create(post: Post): Post {
    post.id = this.idCounter++;
    post.createdDate = new Date();
    this.posts.push(post);
    return post;
  }

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post {
    const foundPost = this.posts.find(post => post.id === id);
    if (!foundPost) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
    return foundPost;
  }

  update(id: number, post: Post): Post {
    const index = this.posts.findIndex(p => p.id === id);
    if (index !== -1) {
      this.posts[index] = { ...this.posts[index], ...post };
      return this.posts[index];
    } else {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }

  remove(id: number): void {
    const initialLength = this.posts.length;
    this.posts = this.posts.filter(post => post.id !== id);
    if (this.posts.length === initialLength) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
