import { IsString } from "class-validator";

export class CreatePostDto {
    @IsString()
    title:string;
    @IsString()
    content:string;
    @IsString()
    location:string;
    @IsString({each:true})//برای تمام اعضای داخلی
    categories:string[]
}
