import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { DormitoriesModule } from './dormitories/dormitories.module';
import { Dormitory } from './typeorm/entities/Dormitory';
import { DormitoryImage } from './typeorm/entities/DormitoryImage';
import { Rating } from './typeorm/entities/Rating';
import { Comment } from './typeorm/entities/Comment';
import { DormitoryImagesModule } from './dormitory-images/dormitory-images.module';
import { RatingsModule } from './ratings/ratings.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'jimson123',
    database: 'dorm_reviews',
    entities: [User, Dormitory, DormitoryImage, Rating, Comment],
    synchronize: true,
  }), UsersModule, DormitoriesModule, DormitoryImagesModule, RatingsModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
