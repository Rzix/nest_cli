import { EventEntity } from "src/event/entities/event.entity";
import { PostEntity } from "src/post/entities/post.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    Id:number
    @Column()
    name:string
    @OneToMany(()=>PostEntity,post=> post.user)
    post:PostEntity[]
    @OneToMany(()=>EventEntity,event=>event.user)
    events:EventEntity[]
}
