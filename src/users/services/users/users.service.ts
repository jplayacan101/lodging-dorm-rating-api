import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import * as bcrypt from 'bcrypt'; // Import bcrypt for password hashing
import { ChangePasswordDto } from 'src/users/dtos/ChangePassword.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepository.findOneBy({ UserID: id });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        // Hash the password before saving the user
        const hashedPassword = await bcrypt.hash(createUserDto.Password, 10); // Hash password with bcrypt
        const newUser = this.userRepository.create({ ...createUserDto, Password: hashedPassword }); // Include hashed password in the user object
        return await this.userRepository.save(newUser);
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);
        this.userRepository.merge(user, updateUserDto);
        return await this.userRepository.save(user);
    }

    async remove(id: number): Promise<void> {
        const user = await this.findOne(id);
        await this.userRepository.remove(user);
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userRepository.findOne({ where: { Email: email } });
    }

    async changePassword(id: number, changePasswordDto: ChangePasswordDto): Promise<void> {
        const user = await this.userRepository.findOneBy({ UserID: id });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }

        const { oldPassword, newPassword } = changePasswordDto;

        const passwordMatch = await bcrypt.compare(oldPassword, user.Password);
        if (!passwordMatch) {
            throw new Error('Old password is incorrect');
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.Password = hashedNewPassword;
        await this.userRepository.save(user);
    }
}
