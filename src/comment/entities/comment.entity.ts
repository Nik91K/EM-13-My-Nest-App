import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Establishment } from "src/establishment/entities/establishment.entity";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id:number

    @Column({ type: "text"})
    @ApiProperty({
        example: "Hello",
        description: "Review text"
    })
    text:string

    @Column({ type: "int"})
    @ApiProperty({
        example: 4,
        description: "Rating of the establishment (1-5)"
    })
    rating:number

    @CreateDateColumn({type:"timestamp"})
    @ApiProperty({
        description: "Create comment date"
    })
    createdAt:Date

    @ManyToOne(() => Establishment, (establishment) => establishment.comments, { eager: true, onDelete: 'CASCADE' })
    establishment: Establishment

}
