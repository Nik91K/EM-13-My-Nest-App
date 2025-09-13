import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "../UserRole";
import { Establishment } from "src/establishment/entities/establishment.entity";

@Entity()
export class Auth {
    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "text"})
    name: string

    // @Column({type: "text"})
    // password: string

    @Column({type: "text"})
    email: string

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date

    @Column({ type: 'enum', enum: UserRole, default: UserRole.CLIENT, })
    role: UserRole;

    @ManyToOne(() => Establishment, (establishment) => establishment.users, {nullable: true, onDelete: 'SET NULL'})
    establishment?: Establishment

}
