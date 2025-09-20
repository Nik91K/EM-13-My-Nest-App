import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsDateString, Min } from "class-validator";

export class ReservationDto {
    @IsInt()
    @Min(1)
    @ApiProperty({ example: 1, description: "ID закладу" })
    establishmentId: number;

    @IsDateString()
    @ApiProperty({ example: "2025-09-20", description: "Дата бронювання" })
    date: string;

    @IsInt()
    @Min(1)
    @ApiProperty({ example: 4, description: "Кількість місць для бронювання" })
    count: number;
}
