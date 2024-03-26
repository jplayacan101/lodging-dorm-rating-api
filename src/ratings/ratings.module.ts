import { Module } from '@nestjs/common';
import { RatingsController } from './controllers/ratings/ratings.controller';
import { RatingsService } from './services/ratings/ratings.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from 'src/typeorm/entities/Rating';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({
    secret: 'jimson',
    signOptions: { expiresIn: '24h' }, 
  }),TypeOrmModule.forFeature([Rating])],
  controllers: [RatingsController],
  providers: [RatingsService]
})
export class RatingsModule {}
