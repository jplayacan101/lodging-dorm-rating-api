import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DormitoryImage } from 'src/typeorm/entities/DormitoryImage';
import { CreateDormitoryImageDto } from 'src/dormitory-images/dtos/CreateDormitoryImage.dto';
import { UpdateDormitoryImageDto } from 'src/dormitory-images/dtos/UpdateDormitoryImage.dto';

@Injectable()
export class DormitoryImagesService {
    constructor(
        @InjectRepository(DormitoryImage)
        private readonly dormitoryImageRepository: Repository<DormitoryImage>,
    ) {}

    // async create(createDormitoryImageDto: CreateDormitoryImageDto): Promise<DormitoryImage> {
    //     const newDormitoryImage = this.dormitoryImageRepository.create(createDormitoryImageDto);
    //     return await this.dormitoryImageRepository.save(newDormitoryImage);
    // }
    async create(createDormitoryImageDto: CreateDormitoryImageDto): Promise<DormitoryImage> {
        const newDormitoryImage = new DormitoryImage();
        Object.assign(newDormitoryImage, createDormitoryImageDto);
        const dormitoryImage = await this.dormitoryImageRepository.save(newDormitoryImage);

        return dormitoryImage
    }


    async findAll(): Promise<DormitoryImage[]> {
        return await this.dormitoryImageRepository.find();
    }

    async findOne(id: number): Promise<DormitoryImage> {
        const dormitoryImage = await this.dormitoryImageRepository.findOneBy({ ImageID: id });
        if (!dormitoryImage) {
            throw new NotFoundException(`Dormitory image with id ${id} not found`);
        }
        return dormitoryImage;
    }

    async update(id: number, updateDormitoryImageDto: UpdateDormitoryImageDto): Promise<DormitoryImage> {
        const dormitoryImage = await this.findOne(id);
        Object.assign(dormitoryImage, updateDormitoryImageDto);
        await this.dormitoryImageRepository.save(dormitoryImage);

        return dormitoryImage
    }

    async remove(id: number): Promise<void> {
        const dormitoryImage = await this.findOne(id);
        await this.dormitoryImageRepository.remove(dormitoryImage);
    }
}
