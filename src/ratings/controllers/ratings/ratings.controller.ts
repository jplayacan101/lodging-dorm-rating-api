import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/guards/jwt-auth/jwt-auth.guard';
import { RatingsService } from 'src/ratings/services/ratings/ratings.service';
import { CreateRatingDto } from 'src/ratings/dtos/CreateRating.dto';
import { UpdateRatingDto } from 'src/ratings/dtos/UpdateRating.dto';
import { Rating } from 'src/typeorm/entities/Rating';

@Controller('ratings')
export class RatingsController {
    constructor(private readonly ratingsService: RatingsService) {}

    @Post()
    @UseGuards(JwtAuthGuard) // Apply the JWTAuthGuard to the create endpoint
    async create(@Body() createRatingDto: CreateRatingDto): Promise<Rating> {
        return await this.ratingsService.create(createRatingDto);
    }

    @Get()
    async findAll(): Promise<Rating[]> {
        return await this.ratingsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Rating> {
        return await this.ratingsService.findOne(+id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard) // Apply the JWTAuthGuard to the update endpoint
    async update(@Param('id') id: string, @Body() updateRatingDto: UpdateRatingDto): Promise<Rating> {
        return await this.ratingsService.update(+id, updateRatingDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard) // Apply the JWTAuthGuard to the delete endpoint
    async remove(@Param('id') id: string): Promise<void> {
        await this.ratingsService.remove(+id);
    }
}
