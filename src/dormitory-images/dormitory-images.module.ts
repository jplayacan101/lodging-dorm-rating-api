import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DormitoryImage } from 'src/typeorm/entities/DormitoryImage';
import { DormitoryImagesController } from './controllers/dormitory-images/dormitory-images.controller';
import { DormitoryImagesService } from './services/dormitory-images/dormitory-images.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [JwtModule.register({
      secret: 'jimson',
      signOptions: { expiresIn: '24h' }, 
    }),TypeOrmModule.forFeature([DormitoryImage])],
    controllers: [DormitoryImagesController],
    providers: [DormitoryImagesService],
  })
export class DormitoryImagesModule {}
