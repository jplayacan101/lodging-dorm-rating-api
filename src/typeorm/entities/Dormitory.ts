import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Dormitories'})
export class Dormitory {
    @PrimaryGeneratedColumn()
    DormID: number;

    @Column({ length: 100 })
    Name: string;

    @Column({ length: 255 })
    Address: string;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    Price: number;

    @Column({ type: 'text', nullable: true })
    Amenities: string;

    @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
    Latitude: number;

    @Column({ type: 'decimal', precision: 10, scale: 6, nullable: true })
    Longitude: number;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    DistanceFromCampus: number;

    @Column({ type: 'decimal', precision: 3, scale: 2, nullable: true })
    AverageRating: number;
}
