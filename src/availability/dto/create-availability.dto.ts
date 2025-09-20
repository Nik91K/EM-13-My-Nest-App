import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsInt, IsDateString, Min } from "class-validator";

export class CreateAvailabilityDto {
    @IsString()
    @ApiProperty({ example: "1", description: "Establishment ID" })
    establishment: string

    @IsDateString()
    @ApiProperty({ example: "2025-09-20" })
    date: string

    @IsInt()
    @Min(0)
    @ApiProperty({ example: 25 })
    availableSeats: number
}
