import { Controller } from "@nestjs/common";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreatePostDto } from "../dtos/create-post.dto";
import { CategoryEntity } from "./category.entity.ts";
@Entity('MyPost')
export class PostEntity {
    
    @PrimaryGeneratedColumn()
     id:number;
     @Column()
    title:string;
    @Column()
    content:string;
    @Column()
    location:string;
    @ManyToMany(type=>CategoryEntity,
        category=> category.posts,{
            cascade:true //خالی بود جاش میزارهcatgoryاگه 
        })
    // @Column({type:'json'})//'simple-json'باید بنویسیم mssqlبرای
    @JoinTable()//کافیه برای هردو انتیتی نمی خواد بزاریم join table اضافه کردن یک 
    categories: CategoryEntity[];
    @Column({
        default:0
    })
    LikedCount:number;
    @ManyToOne(()=>UserEntity,user=> user.post)
    @JoinColumn()
    user:UserEntity

    @Column({
        default:0
    })
     price:number
}


