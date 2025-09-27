import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comment } from "../../comment/entities/comment.entity";
import { User } from "../../users/entities/user.entity";

@Entity()
export class Establishment {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @Column({type: "text" })
    name: string

    @Column({ type: "text" })
    address: string

    @Column({ type: "text" })
    description?: string

    @Column({ type: "int", default: 0})
    totalSeats: number

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date

    @OneToMany(() => Comment, (comment) => comment.establishment)
    comments: Comment[]

    @OneToMany(() => User, (user) => user.establishment)
    moderators: User[]

}
