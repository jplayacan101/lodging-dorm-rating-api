export class SearchDormitoryDto {
    readonly location?: string;
    readonly priceRange?: { min: number; max: number };
    readonly amenities?: string[];
    readonly distanceFromCampus?: number;
    readonly sortBy?: 'price' | 'distance' | 'averageRating';
    readonly sortOrder?: 'ASC' | 'DESC';
}
