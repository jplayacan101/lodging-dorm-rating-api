import { Controller, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/guards/jwt-auth/jwt-auth.guard';
import { DormitoriesService } from 'src/dormitories/services/dormitories/dormitories.service';
import { SearchDormitoryDto } from 'src/dormitories/dtos/SearchDormitory.dto';
import { CreateDormitoryDto } from 'src/dormitories/dtos/CreateDormitory.dto';
import { UpdateDormitoryDto } from 'src/dormitories/dtos/UpdateDormitory.dto';
import { ListDormitoryDto } from 'src/dormitories/dtos/ListDormitory.dto';

@Controller('dormitories')
export class DormitoriesController {
    constructor(private readonly dormitoriesService: DormitoriesService) {}

    @Get()
    async findAll(@Body() searchDto: SearchDormitoryDto): Promise<ListDormitoryDto[]> {
        return await this.dormitoriesService.findAll(searchDto);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() createDormitoryDto: CreateDormitoryDto): Promise<ListDormitoryDto> {
        return await this.dormitoriesService.create(createDormitoryDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async update(@Param('id') id: string, @Body() updateDormitoryDto: UpdateDormitoryDto): Promise<ListDormitoryDto> {
        return await this.dormitoriesService.update(+id, updateDormitoryDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async remove(@Param('id') id: string): Promise<void> {
        await this.dormitoriesService.delete(+id);
    }
}
