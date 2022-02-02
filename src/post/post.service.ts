import { BadRequestException, HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import events from 'events';
import { skip, throwError } from 'rxjs';
import { RefTypeEnum } from 'src/enum/ref-type.enum';
import { EventEntity, EventTypes } from 'src/event/entities/event.entity';
import { EventService } from 'src/event/event.service';
import { Any, Connection, Not, Repository } from 'typeorm';
import { CURRENCY_SING } from './constanste/token.constans';
import { PaginatedDto } from './dto/pagination.dto';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { CategoryEntity } from './entities/category.entity.ts';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
   
    constructor(
        @Inject('Mail_Api')
        private readonly  mail_api:string ,
        @InjectRepository(PostEntity)
        private readonly postRepository:Repository<PostEntity>,//نوع ریپازیتوری<>
        @InjectRepository(CategoryEntity) 
        private readonly categoryRepository:Repository<CategoryEntity>,
        @InjectRepository(EventEntity)
        private readonly eventRepository:Repository<EventEntity>,
        private readonly connection: Connection,
        private readonly eventService: EventService,
        @Inject(CURRENCY_SING) private readonly currencySing:string
    ){
        console.log(`PostService: constructor, mail api is: ${mail_api}`); 
        console.log(`PostService: constructor,the currencysing was ${this.currencySing}`)
    }

    findAll(pagination?:PaginatedDto){
        return this.postRepository.find({
            relations:['categories'], // برای مشخص کردن کتگوری در لیست گرفتن
            skip:pagination.page*pagination.page_count,
            take:pagination.page_count
        });
    }
    findOne(id:number){
        return this.postRepository.findOne(id,{
            relations:['categories']
        })                     //this.posts.find(x=>x.id === id)
    }
    async preload_categor(item:string){
        const category= await this.categoryRepository.findOne({
            where:{
            name:item //or // where:{name:item}
            }
        })
        if(category){
            return category;
        }
        else{
          return  this.categoryRepository.create({
                name:item       ////اد کردن در صورت عدم وجود
            })
        }
    }
  
    async create(body:CreatePostDto){
        const categories = await Promise.all(
            body.categories.map((_item) => {
              return this.preload_categor(_item);
            }),
          );
          console.log(categories);
          const post = this.postRepository.create({
            ...body,
            categories,
          });
       return this.postRepository.save(post)
        
        
        /*
        const post:PostEntity=new PostEntity();
        post.id==this.posts.length+1;
         this.posts.push(post);
        return body
        */
    }

 
    async update(id: number, body: UpdatePostDto) {
        const categories = await Promise.all(
          body.categories.map((_item) => {
            return this.preload_categor(_item);
          }),
        );
        const post = await this.postRepository.preload({
          id: id,
          ...body,
          categories,
        });
        if (!post) {
          throw new NotFoundException(`post with id ${id} not found`);
        }
       /*
        const post= await this.findOne(id);
        if(post){
            if(body.title){
            post.title=body.title;
            }
            if(body.content){
            post.content=body.content;
            }
            if(body.categories){
            post.categories=body.categories;
            }
            if(body.location){
            post.location=body.location;
            }else
            {
                throw new HttpException(`Not Found`,HttpStatus.NOT_FOUND)
            }
        }
        */
        return this.postRepository.save(post)
    }

   async delete(id:number){
        const post =await this.findOne(id);
        this.postRepository.remove(post)
        /*
        const index =this.posts.findIndex((x) => x.id === id);
        const post= this.posts[index]
        if(index>=0){
            this.posts.splice(index,1)
        }
        return post
    }
    */
   return post;
}
   async event(id:number,type:EventTypes,userId:number){
        const queryRunner=this.connection.createQueryRunner();
        let post =await this.findOne(id);
        this.eventService.getEventByUser(post.id,RefTypeEnum.post,userId,EventTypes.Liked   )
        if (events.length > 0) {
            throw new BadRequestException(`This user already liked this post`);
          }
        if(type==EventTypes.Liked){
            post.LikedCount++;
        }
        await queryRunner.connect();
         await queryRunner.startTransaction();
        try{
        post = await this.postRepository.save(post);
        const event = this.eventRepository.create({
            message: type,
            refId: post.id,
            reftype: RefTypeEnum.post,
          });
         await queryRunner.manager.save(event);
       await queryRunner.commitTransaction()
        }
        catch(e)
        {
        await queryRunner.rollbackTransaction()
        }
        finally{
         await queryRunner.release()
        }
        return post
    }
    
   
}
