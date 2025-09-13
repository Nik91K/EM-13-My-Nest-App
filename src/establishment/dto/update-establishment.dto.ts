import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UpdateEstablishmentDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "Bakery",
        description: "Some name"
    })
    name?: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "Haharina St, 29, Cherkasy, Cherkasy Oblast, 18000",
        description: "Address of the establishment"
    })
    address?: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: "Calm and comfortable establishment",
        description: "Some description"
    })
    description?: string

    @IsNumber()
    @Min(1)
    @ApiProperty({
        example: 20,
        description: "Total number of seats"
    })
    totalSeats?: number
}
