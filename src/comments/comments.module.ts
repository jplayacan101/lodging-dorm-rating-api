import { Module } from '@nestjs/common';
import { CommentsController } from './controllers/comments/comments.controller';
import { CommentsService } from './services/comments/comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from 'src/typeorm/entities/Comment';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret: 'jimson',
    signOptions: { expiresIn: '24h' }, 
  }),TypeOrmModule.forFeature([Comment])],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
