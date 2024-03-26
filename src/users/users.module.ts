import { Module } from '@nestjs/common';
import { UsersService } from './services/users/users.service';
import { UsersController } from './controllers/users/users.controller';
import { AuthService } from './services/auth/auth.service';
import { JwtModule } from '@nestjs/jwt'; // Import JwtModule
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';

@Module({
  imports: [
    JwtModule.register({
      secret: 'jimson',
      signOptions: { expiresIn: '24h' }, 
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [
    UsersService,
    AuthService,
  ],
  controllers: [UsersController],
  exports: [UsersService, AuthService], 
})
export class UsersModule {}
