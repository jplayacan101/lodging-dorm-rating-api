import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/guards/jwt-auth/jwt-auth.guard';
import { DormitoriesService } from 'src/dormitories/services/dormitories/dormitories.service';
import { SearchDormitoryDto } from 'src/dormitories/dtos/SearchDormitory.dto';
import { CreateDormitoryDto } from 'src/dormitories/dtos/CreateDormitory.dto';
import { UpdateDormitoryDto } from 'src/dormitories/dtos/UpdateDormitory.dto';
import { ListDormitoryDto } from 'src/dormitories/dtos/ListDormitory.dto';
import { CreateDormitoryImageDto } from 'src/dormitory-images/dtos/CreateDormitoryImage.dto';

@Controller('dormitories')
export class DormitoriesController {
    constructor(private readonly dormitoriesService: DormitoriesService) {}

    @Get()
    async findAll(@Body() searchDto: SearchDormitoryDto): Promise<ListDormitoryDto[]> {
        return await this.dormitoriesService.findAll(searchDto);
    }

    @Post()
    async create(@Body() createDormitoryDto: CreateDormitoryDto, @Body() createDormitoryImageDto: CreateDormitoryImageDto): Promise<ListDormitoryDto> {
        return await this.dormitoriesService.create(createDormitoryDto, createDormitoryImageDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async update(@Param('id') id: string, @Body() updateDormitoryDto: UpdateDormitoryDto, @Body() createDormitoryImageDto: CreateDormitoryImageDto): Promise<ListDormitoryDto> {
        return await this.dormitoriesService.update(+id, updateDormitoryDto, createDormitoryImageDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async remove(@Param('id') id: string): Promise<void> {
        await this.dormitoriesService.delete(+id);
    }
}
