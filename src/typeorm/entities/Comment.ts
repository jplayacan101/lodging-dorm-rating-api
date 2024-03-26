import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Dormitory } from './Dormitory';

@Entity({ name: 'Comments' })
export class Comment {
    @PrimaryGeneratedColumn()
    CommentID: number;

    @Column()
    UserID: number;

    @Column()
    DormID: number;

    @Column({ type: 'text' })
    Comment: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    CommentDate: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'UserID' })
    user: User;

    @ManyToOne(() => Dormitory)
    @JoinColumn({ name: 'DormID' })
    dormitory: Dormitory;
}
