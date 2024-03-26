import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'Users'})
export class User {
    @PrimaryGeneratedColumn({ type: 'bigint' })
    UserID: number;

    @Column({ unique: true })
    Username: string;

    @Column({ unique: true })
    Email: string;

    @Column()
    Password: string;

    @Column({ nullable: true })
    Phone: string;

    @Column({ nullable: true })
    SocialMedia: string;

    @Column({ default: () => 'CURRENT_TIMESTAMP' })
    RegistrationDate: Date;

    @Column({ nullable: true })
    AuthStrategy: string;
}
