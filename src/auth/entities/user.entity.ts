import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../../availability/UserRole";
import { Establishment } from "src/establishment/entities/establishment.entity";
import { Booking } from "src/booking/entities/booking.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "text"})
    name: string

    @Column({type: "text"})
    password: string

    @Column({type: "text", unique: true})
    email: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date

    @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT, })
    role: UserRole;

    @ManyToOne(() => Establishment, (establishment) => establishment.moderators, {nullable: true, onDelete: 'SET NULL'})
    establishment?: Establishment

    @OneToMany(() => Booking, (booking) => booking.user)
    bookings: Booking[]
}