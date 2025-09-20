import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Establishment } from "src/establishment/entities/establishment.entity";

@Entity()
export class Availability {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Establishment)
    establishment: Establishment

    @Column({ type: "date" })
    date: string

    @Column({ type: "int" })
    availableSeats: number

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date
}
