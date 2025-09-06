import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CommentNoSpec {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id:number

    @Column({ type: "text", nullable: true})
    @ApiProperty({
        example: "Bakery",
        description: "Review of the establishment"
    })
    establishment:string

    @Column({ type: "text", nullable: true})
    @ApiProperty({
        example: "Hello",
        description: "Review text"
    })
    text:string

    @Column({ type: "int", nullable: true})
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
}
