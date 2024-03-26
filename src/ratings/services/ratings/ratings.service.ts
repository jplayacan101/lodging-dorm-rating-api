import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from 'src/typeorm/entities/Rating';
import { CreateRatingDto } from 'src/ratings/dtos/CreateRating.dto';
import { UpdateRatingDto } from 'src/ratings/dtos/UpdateRating.dto';

@Injectable()
export class RatingsService {
    constructor(
        @InjectRepository(Rating)
        private readonly ratingRepository: Repository<Rating>,
    ) {}

    async create(createRatingDto: CreateRatingDto): Promise<Rating> {
        const newRating = this.ratingRepository.create(createRatingDto);
        return await this.ratingRepository.save(newRating);
    }

    async findAll(): Promise<Rating[]> {
        return await this.ratingRepository.find();
    }

    async findOne(id: number): Promise<Rating> {
        const rating = await this.ratingRepository.findOneBy({ RatingID: id });
        if (!rating) {
            throw new NotFoundException(`Rating with id ${id} not found`);
        }
        return rating;
    }

    async update(id: number, updateRatingDto: UpdateRatingDto): Promise<Rating> {
        const rating = await this.findOne(id);
        this.ratingRepository.merge(rating, updateRatingDto);
        return await this.ratingRepository.save(rating);
    }

    async remove(id: number): Promise<void> {
        const rating = await this.findOne(id);
        await this.ratingRepository.remove(rating);
    }
}
