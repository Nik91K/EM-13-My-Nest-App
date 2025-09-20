import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { UserRole } from "../UserRole";

export class UpdateAuthDto {
    @IsString()
    @ApiProperty({example: 'Name', description: 'User name'})
    name?: string

    @IsString()
    @MinLength(8)
    @ApiProperty({example: "Password123", description: "Password"})
    password?: string

    @IsEnum(UserRole)
    @ApiProperty({example: UserRole.CLIENT, description: "User role", enum: UserRole, default: UserRole.CLIENT})
    role?: UserRole
    
    @IsOptional()
    @ApiProperty({ example: 1, description: "Esablishment ID"})
    establishmentId?: number

}
