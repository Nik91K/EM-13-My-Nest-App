import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsDateString, Min } from "class-validator";

export class GetAvailabilityDto {
    @IsInt()
    @Min(1)
    @ApiProperty({ example: 1, description: "ID закладу" })
    establishmentId: number;

    @IsDateString()
    @ApiProperty({ example: "2025-09-20", description: "Дата" })
    date: string;
}