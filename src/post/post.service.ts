import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostEntity } from './entities/post.entity';

@Injectable()
export class PostService {
    private posts:PostEntity[]=[{
        id:1,
        title:'pride',
        content:'Danger car',
        location:'Mashhad',
        categories:['car']
    }]
    constructor(){
        console.log(`PostService:constructor`); 
    }

    findAll(){
        return this.posts;
    }
    findOne(id:number){
        return this.posts.find(x=>x.id === id)
    }

    create(body:CreatePostDto){
        const post:PostEntity=new PostEntity(body);
        post.id==this.posts.length+1;
         this.posts.push(post);
        return body
    }

    update(body:UpdatePostDto, id:number){
        const post= this.findOne(id);
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
        return post;
    }

    delete(id:number){
        const index =this.posts.findIndex((x) => x.id === id);
        const post= this.posts[index]
        if(index>=0){
            this.posts.splice(index,1)
        }
        return post
    }
  
}
