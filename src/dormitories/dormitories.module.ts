import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dormitory } from 'src/typeorm/entities/Dormitory';
import { DormitoriesController } from './controllers/dormitories/dormitories.controller';
import { DormitoriesService } from './services/dormitories/dormitories.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret: 'jimson',
    signOptions: { expiresIn: '24h' }, 
  }),TypeOrmModule.forFeature([Dormitory])],
  controllers: [DormitoriesController],
  providers: [DormitoriesService],
})
export class DormitoriesModule {}
