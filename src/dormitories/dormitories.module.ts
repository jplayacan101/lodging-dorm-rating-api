import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dormitory } from 'src/typeorm/entities/Dormitory';
import { DormitoriesController } from './controllers/dormitories/dormitories.controller';
import { DormitoriesService } from './services/dormitories/dormitories.service';
import { JwtModule } from '@nestjs/jwt';
import { DormitoryImagesService } from 'src/dormitory-images/services/dormitory-images/dormitory-images.service';
import { DormitoryImage } from 'src/typeorm/entities/DormitoryImage';

@Module({
  imports: [JwtModule.register({
    secret: 'jimson',
    signOptions: { expiresIn: '24h' }, 
  }),TypeOrmModule.forFeature([Dormitory, DormitoryImage])],
  controllers: [DormitoriesController],
  providers: [DormitoriesService, DormitoryImagesService],
})
export class DormitoriesModule {}
