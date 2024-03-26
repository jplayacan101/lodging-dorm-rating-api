import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Dormitory } from './Dormitory';

@Entity({ name: 'Ratings' })
export class Rating {
    @PrimaryGeneratedColumn()
    RatingID: number;

    @Column()
    UserID: number;

    @Column()
    DormID: number;

    @Column({ type: 'decimal', precision: 2, scale: 1 })
    CleanlinessRating: number;

    @Column({ type: 'decimal', precision: 2, scale: 1 })
    AmenitiesRating: number;

    @Column({ type: 'decimal', precision: 2, scale: 1 })
    LocationRating: number;

    @Column({ type: 'decimal', precision: 2, scale: 1 })
    OverallRating: number;

    @Column({ type: 'text' })
    Review: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    RatingDate: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'UserID' })
    user: User;

    @ManyToOne(() => Dormitory)
    @JoinColumn({ name: 'DormID' })
    dormitory: Dormitory;
}
