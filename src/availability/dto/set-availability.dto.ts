import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, Min } from "class-validator";

export class SetAvailabilityDto {
    @IsInt()
    @Min(1)
    @ApiProperty({ example: 1, description: "ID закладу" })
    establishmentId: number;

    @IsDateString()
    @ApiProperty({ example: "2025-09-20", description: "Дата" })
    date: string;

    @IsInt()
    @Min(0)
    @ApiProperty({ example: 25, description: "Кількість доступних місць" })
    availableSeats: number;
}