import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import { UserRole } from "../UserRole";

export class LoginAuthDto {
  @ApiProperty({ example: 'user@example.com', description: 'Email' })
  @IsEmail()
  email: string;
}
