import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostController } from './post/post.controller';
import { PostService } from './post/post.service';

import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { EventService } from './event/event.service';
import { EventModule } from './event/event.module';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UtilityModule } from './utility/utility.module';
import { ConfigModule } from './config/config.module';





@Module({
imports:[PostModule,TypeOrmModule.forRoot({
    type:'postgres',
    host:'localhost',
    username: 'postgres', 
    port:5432,
    password: 'reza2019',
    database:'nestjs',
    synchronize:true,
    extra:{
        trustServerCertificate:true
    },
    autoLoadEntities:true
}), UserModule, EventModule, ConfigModule],
controllers:[AppController,UserController],   
providers:[AppService,{
    provide:'Mail_Api',
    useValue:'http://mail.google.com'
}, 
    // {
    // provide:'Post',
    // useClass:PostService
    // }                             بااستفاده از توکن)این معادله پایینه)
   // PostService,
], 
})
export class AppModule {}
