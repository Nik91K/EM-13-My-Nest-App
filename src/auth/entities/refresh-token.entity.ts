import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/users/entities/user.entity";
import { timestamp } from "rxjs";

@Entity('refresh-token')
export class RefreshToken {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    hashedToken: string

    @ManyToOne(() => User, (user) => user.refreshToken, { onDelete: 'CASCADE' })
    user: User

    @Column({type: 'timestamp'})
    expiresAt: Date

    @CreateDateColumn()
    createdAt: Date

}
