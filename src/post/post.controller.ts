
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { query } from 'express';
import { EventTypes } from 'src/event/entities/event.entity';
import { PaginatedDto } from './dto/pagination.dto';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostService } from './post.service';

@Controller('Post')
export class PostController {
    constructor(private readonly postService:PostService){}
    @Get()
    @HttpCode(HttpStatus.GONE)
    // findAll(@Res()res){
    //      res.status(HttpStatus.GONE).send('That all')
    // }
    findAll(){
        return this.postService.findAll()
   }

    @Get('/:id')
    findOne(@Param('id')id){
       return this.postService.findOne(+id)// === parseInt(id )
    }
    @Post('/')
    insert2(@Body()body:CreatePostDto){
       return this.postService.create(body)
    }

    @Put(':id')
  update(@Param('id') id, @Body() body: UpdatePostDto) {
    return this.postService.update(+id, body);
  }
    @Patch(':id')
    patch(@Param('id') id, @Body() body: UpdatePostDto) {
      console.log(body instanceof UpdatePostDto);
      return this.postService.update(+id, body);
    }

    @Delete(':id')
    delete(@Param('id')id){
        return this.postService.delete(parseInt(id))
    }

    @Get('/paginated')
    findAllPaginated(@Query() query: PaginatedDto) {
        return this.postService.findAll(query);
      }
    // @Post('/')
    // insert(@Body()body){
    //     return`insert new Post ${body.name}`
    // }

    @Patch(':id/event/:type/:userId')
    like(@Param('id') id,@Param('userId') userId, @Param() type:EventTypes) {
       return this.postService.event(+id,type,userId)
    }
    
}

