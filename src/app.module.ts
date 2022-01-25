import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';

import { PostModule } from './post/post.module';





@Module({
imports:[PostModule],
controllers:[AppController],
providers:[AppService,
    // {
    // provide:'Post',
    // useClass:PostService
    // }                             بااستفاده از توکن)این معادله پایینه)
   // PostService,
], 
})
export class AppModule {}
