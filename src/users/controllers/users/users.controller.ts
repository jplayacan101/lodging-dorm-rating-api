import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, UnauthorizedException, Patch } from '@nestjs/common';
import { UsersService } from 'src/users/services/users/users.service';
import { AuthService } from 'src/users/services/auth/auth.service';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { User } from 'src/typeorm/entities/user';
import { JwtAuthGuard } from 'src/guards/guards/jwt-auth/jwt-auth.guard';
import { LoginDto } from 'src/users/dtos/Login.dto';
import { ChangePasswordDto } from 'src/users/dtos/ChangePassword.dto';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) {}

    @Get()
    @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard to the findAll method
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard to the findOne method
    async findOne(@Param('id') id: string): Promise<User> {
        return this.usersService.findOne(parseInt(id, 10));
    }

    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard to the lo method
    async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
        return this.usersService.update(parseInt(id, 10), updateUserDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard) // Apply JwtAuthGuard to the remove method
    async remove(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(parseInt(id, 10));
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto.Email, loginDto.Password);
    }

    @Patch(':id/change-password')
    @UseGuards(JwtAuthGuard) 
    async changePassword(@Param('id') id: string, @Body() changePasswordDto: ChangePasswordDto): Promise<void> {
        return this.usersService.changePassword(+id, changePasswordDto);
    }

    
}
