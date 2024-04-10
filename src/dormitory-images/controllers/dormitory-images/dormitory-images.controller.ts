import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/guards/jwt-auth/jwt-auth.guard';
import { DormitoryImagesService } from 'src/dormitory-images/services/dormitory-images/dormitory-images.service';
import { CreateDormitoryImageDto } from 'src/dormitory-images/dtos/CreateDormitoryImage.dto';
import { UpdateDormitoryImageDto } from 'src/dormitory-images/dtos/UpdateDormitoryImage.dto';
import { DormitoryImage } from 'src/typeorm/entities/DormitoryImage';

@Controller('dormitory-images')
export class DormitoryImagesController {
    constructor(private readonly dormitoryImagesService: DormitoryImagesService) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createDormitoryImageDto: CreateDormitoryImageDto): Promise<DormitoryImage> {
        return await this.dormitoryImagesService.create(createDormitoryImageDto);
    }

    @Get()
    async findAll(): Promise<DormitoryImage[]> {
        return await this.dormitoryImagesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<DormitoryImage> {
        return await this.dormitoryImagesService.findOne(+id);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async update(@Param('id') id: string, @Body() createDormitoryImageDto: CreateDormitoryImageDto): Promise<DormitoryImage> {
        return await this.dormitoryImagesService.update(+id, createDormitoryImageDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async remove(@Param('id') id: string): Promise<void> {
        await this.dormitoryImagesService.remove(+id);
    }
}
