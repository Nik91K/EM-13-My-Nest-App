import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

export class Establishment {
    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number

    @Column({type: "text", length: 255})
    name: string

    @Column({ type: "text", length: 500 })
    address: string

    @Column({ type: "text", nullable: true})
    description?: string

    @Column({ type: "int"})
    totalSeats: number

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date

    

}
