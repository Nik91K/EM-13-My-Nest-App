import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsDateString, Min } from "class-validator";

export class UpdateAvailabilityDto {
    @IsOptional()
    @IsDateString()
    @ApiProperty({ example: "2025-09-20", required: false })
    date?: string

    @IsOptional()
    @IsInt()
    @Min(0)
    @ApiProperty({ example: 30, required: false })
    availableSeats?: number
}
