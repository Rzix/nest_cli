import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, Res } from '@nestjs/common';
import { query } from 'express';

@Controller('student')
export class StudentController {
    @Get()
    @HttpCode(HttpStatus.GONE)
    // findAll(@Res()res){
    //      res.status(HttpStatus.GONE).send('That all')
    // }
    findAll(){
        return 'All student'
   }

    @Get('/:id')
    findOne(@Param('id')id){
        return `find student ${id}`;
    }

    @Get('/paginated')
    findAll_Paginated(@Query()query){
        return`All student ,paginated,page${query.page},count: ${query.count}`
   }
    // @Post('/')
    // insert(@Body()body){
    //     return`insert new student ${body.name}`
    // }
    @Post('/')
    insert2(@Body('name')name){
        return`insert new student ${name}`
    }

    @Put(':id')
    update(@Param('id')id,@Body()body){
        return `Update student , id of ${id} and body${body.name}`
    }
    
    @Patch(':id')
    patch(@Param('id')id, @Body()body){
        return `patch student. id of ${id}and body${body.name}`
    }

    @Delete(':id')
    delete(@Param('id')id){
        return `Im delete student by ID ${id}`
    }
}
