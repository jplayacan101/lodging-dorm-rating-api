
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dormitory } from 'src/typeorm/entities/Dormitory';
import { CreateDormitoryDto } from 'src/dormitories/dtos/CreateDormitory.dto';
import { UpdateDormitoryDto } from 'src/dormitories/dtos/UpdateDormitory.dto';
import { ListDormitoryDto } from 'src/dormitories/dtos/ListDormitory.dto';
import { DormitoryImage } from 'src/typeorm/entities/DormitoryImage';
import { CreateDormitoryImageDto } from 'src/dormitory-images/dtos/CreateDormitoryImage.dto';
import { DormitoryImagesService } from 'src/dormitory-images/services/dormitory-images/dormitory-images.service';
import { SearchDormitoryDto } from 'src/dormitories/dtos/SearchDormitory.dto';

@Injectable()
export class DormitoriesService {
    constructor(
        @InjectRepository(Dormitory)
        private readonly dormitoryRepository: Repository<Dormitory>,
        private readonly dormitoryImagesService: DormitoryImagesService, // Inject DormitoryImagesService
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


    // async create(createDormitoryDto: CreateDormitoryDto, createDormitoryImageDto: CreateDormitoryImageDto): Promise<ListDormitoryDto> {
    //     const newDormitory = new Dormitory();
    //     Object.assign(newDormitory, createDormitoryDto);
    //     const dormitory = await this.dormitoryRepository.save(newDormitory);

    //     // Create dormitory image
    //     await this.dormitoryImagesService.create({...createDormitoryImageDto, DormID: dormitory.DormID});

    //     return {
    //         DormID: dormitory.DormID,
    //         Name: dormitory.Name,
    //         Address: dormitory.Address,
    //         Amenities: dormitory.Amenities,
    //         AverageRating: dormitory.AverageRating,
    //         Price: dormitory.Price,
    //         DistanceFromCampus: dormitory.DistanceFromCampus
    //     };
    // }
    async create(createDormitoryDto: CreateDormitoryDto, createDormitoryImageDto: CreateDormitoryImageDto): Promise<ListDormitoryDto> {
        const newDormitory = new Dormitory();
        Object.assign(newDormitory, createDormitoryDto);

        // Coordinates of the campus
        const campusLatitude = 14.646365427923756;
        const campusLongitude = 121.07702858156227;

        // Coordinates of the dormitory
        const dormLatitude = createDormitoryDto.Latitude;
        const dormLongitude = createDormitoryDto.Longitude;

        // Calculate distance from campus using Haversine formula
        const distanceFromCampus = this.calculateDistance(campusLatitude, campusLongitude, dormLatitude, dormLongitude);

        // Set the distance to the dormitory entity
        newDormitory.DistanceFromCampus = distanceFromCampus;

        // Save dormitory entity
        const dormitory = await this.dormitoryRepository.save(newDormitory);

        // Create dormitory image
        await this.dormitoryImagesService.create({...createDormitoryImageDto, DormID: dormitory.DormID});

        return dormitory;
    }

    // Function to calculate distance using Haversine formula
    private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371.0; // Earth radius in kilometers

        const dLat = this.toRadians(lat2 - lat1);
        const dLon = this.toRadians(lon2 - lon1);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        return distance;
    }

    // Function to convert degrees to radians
    private toRadians(degrees: number): number {
        return degrees * (Math.PI / 180);
    }

    async update(id: number, updateDormitoryDto: UpdateDormitoryDto, createDormitoryImageDto: CreateDormitoryImageDto): Promise<ListDormitoryDto> {
        const dormitory = await this.dormitoryRepository.findOne({ where: { DormID: id } });
        if (!dormitory) {
            throw new NotFoundException(`Dormitory with id ${id} not found`);
        }
        Object.assign(dormitory, updateDormitoryDto);
        await this.dormitoryRepository.save(dormitory);

        // Update or create dormitory image
        await this.dormitoryImagesService.update(id, createDormitoryImageDto);

        return {
            DormID: dormitory.DormID,
            Name: dormitory.Name,
            Address: dormitory.Address,
            Amenities: dormitory.Amenities,
            AverageRating: dormitory.AverageRating,
            Price: dormitory.Price,
            DistanceFromCampus: dormitory.DistanceFromCampus
        };
    }

    async delete(id: number): Promise<void> {
        const dormitory = await this.dormitoryRepository.findOne({ where: { DormID: id } });
        if (!dormitory) {
            throw new NotFoundException(`Dormitory with id ${id} not found`);
        }
        await this.dormitoryRepository.remove(dormitory);
    }
}
