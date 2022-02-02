
import { IsString, minLength, MinLength } from "class-validator";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
export enum EventTypes{
    Liked='LIKED',
    Commented='COMMENTED'
}

@Entity('event')
export class EventEntity {
    @PrimaryGeneratedColumn()
    id:number; 
    @Column()
    @IsString()
    @MinLength(20)
    message: EventTypes;
    @Column()
    reftype:string;
    @Column()
    refId:number;
    @ManyToOne(()=>UserEntity,user=>user.events)
    @JoinColumn()
    user:UserEntity
}

