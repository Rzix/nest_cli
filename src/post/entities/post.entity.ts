import { CreatePostDto } from "../dtos/create-post.dto";

export class PostEntity {
    constructor(post:CreatePostDto){
         this.title=post.title
         this.content=post.content
         this.location=post.location
         this.categories=post.categories
    }
     id:number;
    title:string;
    content:string;
    location:string;
    categories:string[];
}


