import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Dormitory } from './Dormitory';
import { User } from './User';

@Entity({ name: 'DormitoryImages' })
export class DormitoryImage {
    @PrimaryGeneratedColumn()
    ImageID: number;

    @Column()
    DormID: number;

    @Column()
    UserID: number;

    @Column({ type: 'longtext' })
    ImageURL: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    UploadDate: Date;

    @ManyToOne(() => Dormitory)
    @JoinColumn({ name: 'DormID' })
    dormitory: Dormitory;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'UserID' })
    user: User;
}
