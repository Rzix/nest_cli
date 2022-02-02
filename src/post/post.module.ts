import { Inject, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';
import { EventEntity } from 'src/event/entities/event.entity';
import { EventModule } from 'src/event/event.module';
import { UtilityModule } from 'src/utility/utility.module';
import { UtilityService } from 'src/utility/utility.service';
import { CategoryEntity } from './entities/category.entity.ts';
import { PostEntity } from './entities/post.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';
const config:string='erou'
@Module({
    imports:[TypeOrmModule.forFeature([PostEntity,CategoryEntity,EventEntity]),
    EventModule,UtilityModule,ConfigModule
    
],
    controllers:[PostController],
    providers:[PostService,{
        provide:'Mail_Api',
        useValue:'http://mail.google.com',
    },
    {
provide:'CURRENCY_SING',
useFactory:async (UtilityService: UtilityService,configService:ConfigService)=>{
    const config= await configService.getCurrencyValue ()
   return UtilityService.getCurrencySign(config.value)
},
inject:[UtilityService,ConfigService]
    }
]
})
export class PostModule {}
