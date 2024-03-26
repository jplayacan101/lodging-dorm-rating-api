export class CreateRatingDto {
    readonly UserID: number;
    readonly DormID: number;
    readonly CleanlinessRating: number;
    readonly AmenitiesRating: number;
    readonly LocationRating: number;
    readonly OverallRating: number;
    readonly Review: string;
}
