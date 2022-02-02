import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RefTypeEnum } from 'src/enum/ref-type.enum';
import { Repository } from 'typeorm';
import { EventEntity, EventTypes } from './entities/event.entity';

@Injectable()
export class EventService {
    constructor(
        @InjectRepository(EventEntity)
        private readonly eventRepository: Repository<EventEntity>,
      ) {}
   async getEventByUser(refId:number,reftype:RefTypeEnum,userId:number,type:EventTypes){
     const event =  await this.eventRepository.find({
            where:{
                refId,
                reftype,
                userId,
                type
            }
        })
        return event 
    }
}
