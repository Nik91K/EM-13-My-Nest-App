import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: "Create new user" })
  @ApiResponse({ status: 201, description: "User created" })
  @ApiResponse({ status: 409, description: "Email already in use" })
  create(@Body() CreateAuthDto: CreateAuthDto) {
    return this.authService.register(CreateAuthDto)
  }

  @Post('login')
  @ApiOperation({ summary: "Login user" })
  @ApiResponse({ status: 201, description: "Login successful" })
  @ApiResponse({ status: 404, description: "User not found" })
  login(@Body() loginAuthDto: LoginDto) {
    return this.authService.login(loginAuthDto)
  }

  @Post('refresh')
  @ApiOperation({ summary: "Refresh access token" })
  @ApiResponse({ status: 200, description: "Token refreshed successfully" })
  @ApiResponse({ status: 400, description: "Invalid refresh token" })
  refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken)
  }

  // @Get()
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Get all users' })
  // @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
  // findAll() {
  //   return this.authService.findAll()
  // }

  // @Delete(":id")
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // @ApiOperation({ summary: 'Delete user' })
  // @ApiResponse({ status: 200, description: 'User deleted successfully' })
  // @ApiResponse({ status: 404, description: 'User not found' })
  // remove(@Param('id') id: number) {
  //   return this.authService.delete(id)
  // }
}
