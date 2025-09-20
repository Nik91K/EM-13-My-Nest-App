import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, IsDateString, Min, IsNotEmpty } from "class-validator";

export class CreateBookingDto {
    @ApiProperty({ description: 'Establishment ID for booking' })
    @IsString()
    @IsNotEmpty()
    establishment: string;

    @ApiProperty({ description: 'Reservation date', example: '2024-12-25' })
    @IsDateString()
    @IsNotEmpty()
    bookingDate: string;

    @ApiProperty({ description: 'Reservation time', example: '18:30' })
    @IsString()
    @IsNotEmpty()
    bookingTime: string;

    @ApiProperty({ description: 'Number of guests', minimum: 1 })
    @IsInt()
    @Min(1)
    numberOfGuests: number;
}