import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dormitory } from 'src/typeorm/entities/Dormitory';
import { SearchDormitoryDto } from 'src/dormitories/dtos/SearchDormitory.dto';
import { ListDormitoryDto } from 'src/dormitories/dtos/ListDormitory.dto';
import { CreateDormitoryDto } from 'src/dormitories/dtos/CreateDormitory.dto';
import { UpdateDormitoryDto } from 'src/dormitories/dtos/UpdateDormitory.dto';

@Injectable()
export class DormitoriesService {
    constructor(
        @InjectRepository(Dormitory)
        private readonly dormitoryRepository: Repository<Dormitory>,
    ) {}

    async findAll(searchDto: SearchDormitoryDto): Promise<ListDormitoryDto[]> {
        const queryBuilder = this.dormitoryRepository.createQueryBuilder('dormitory');

        if (searchDto.location) {
            queryBuilder.where('dormitory.Address LIKE :location', { location: `%${searchDto.location}%` });
        }
        if (searchDto.priceRange && searchDto.priceRange.min && searchDto.priceRange.max) {
            queryBuilder.andWhere('dormitory.Price BETWEEN :min AND :max', { min: searchDto.priceRange.min, max: searchDto.priceRange.max });
        }
        if (searchDto.amenities && searchDto.amenities.length > 0) {
            searchDto.amenities.forEach((amenity, index) => {
                queryBuilder.andWhere(`dormitory.Amenities LIKE :amenity${index}`, { [`amenity${index}`]: `%${amenity}%` });
            });
        }
        if (searchDto.distanceFromCampus) {
            queryBuilder.andWhere('dormitory.DistanceFromCampus <= :distance', { distance: searchDto.distanceFromCampus });
        }

        if (searchDto.sortBy && searchDto.sortOrder) {
            queryBuilder.orderBy(`dormitory.${searchDto.sortBy}`, searchDto.sortOrder);
        }

        const dormitories = await queryBuilder.getMany();

        return dormitories.map(dormitory => ({
            DormID: dormitory.DormID,
            Name: dormitory.Name,
            Address: dormitory.Address,
            Amenities: dormitory.Amenities,
            AverageRating: dormitory.AverageRating,
            Price: dormitory.Price,
            DistanceFromCampus: dormitory.DistanceFromCampus
        }));
    }

    async create(createDormitoryDto: CreateDormitoryDto): Promise<ListDormitoryDto> {
        const newDormitory = new Dormitory();
        Object.assign(newDormitory, createDormitoryDto);
        await this.dormitoryRepository.save(newDormitory);
        return {
            DormID: newDormitory.DormID,
            Name: newDormitory.Name,
            Address: newDormitory.Address,
            Amenities: newDormitory.Amenities,
            AverageRating: newDormitory.AverageRating,
            Price: newDormitory.Price,
            DistanceFromCampus: newDormitory.DistanceFromCampus
        };
    }

    async update(id: number, updateDormitoryDto: UpdateDormitoryDto): Promise<ListDormitoryDto> {
        const dormitory = await this.dormitoryRepository.findOneBy({ DormID: id });
        if (!dormitory) {
            throw new NotFoundException(`Dormitory with id ${id} not found`);
        }
        const updatedDormitory = Object.assign(dormitory, updateDormitoryDto);
        await this.dormitoryRepository.save(updatedDormitory);
        return {
            DormID: updatedDormitory.DormID,
            Name: updatedDormitory.Name,
            Address: updatedDormitory.Address,
            Amenities: updatedDormitory.Amenities,
            AverageRating: updatedDormitory.AverageRating,
            Price: updatedDormitory.Price,
            DistanceFromCampus: updatedDormitory.DistanceFromCampus
        };
    }

    async delete(id: number): Promise<void> {
        const dormitory = await this.dormitoryRepository.findOneBy({ DormID: id });
        if (!dormitory) {
            throw new NotFoundException(`Dormitory with id ${id} not found`);
        }
        await this.dormitoryRepository.remove(dormitory);
    }
}
