import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Establishment } from "src/establishment/entities/establishment.entity";
import { User } from "../../users/entities/user.entity";

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

@Entity()
export class Booking {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.bookings, { eager: true })
    user: User

    @ManyToOne(() => Establishment, { eager: true })
    establishment: Establishment
    
    @Column({ type: 'date' })
    bookingDate: Date

    @Column({ type: 'time' })
    bookingTime: string

    @Column({type: "int"})
    numberOfGuests: number

    @Column({type: "enum", enum: BookingStatus, default: BookingStatus.PENDING})
    status: BookingStatus

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date
}