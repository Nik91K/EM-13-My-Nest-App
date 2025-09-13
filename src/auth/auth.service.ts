import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login.dto';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';
// import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,
    private jwtService: JwtService
  ){}

  async create(createAuthDto: CreateAuthDto) {
    const existingUser = await this.authRepository.findOne({
      where: { email: createAuthDto.email }
    })

    if (existingUser) {
      throw new ConflictException("Email already in use")
    }

    const user = this.authRepository.create(createAuthDto)
    const savedUser = await this.authRepository.save(user)

    const payload = { id: savedUser.id, email: savedUser.email, role: savedUser.role }
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' })
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' })

    return { accessToken, refreshToken, user: savedUser }

  }

  async findAll() {
    const users = await this.authRepository.find({ relations: ['establishment']})

    return users.map(user => user)
  }

  async update(id: number, UpdateAuthDto: UpdateAuthDto) {
    const user = await this.authRepository.findOneBy({id})
    await this.authRepository.update(id, UpdateAuthDto)
    const updatedUser = await this.authRepository.findOne({
      where: { id },
      relations: ['establishment']
    })
    return updatedUser
  }

  async remove(id: number) {
    const user = await this.authRepository.findOneBy({id})
    await this.authRepository.delete(id)
    return user
  }

  async login(loginAuthDto: LoginAuthDto) {
      const user = await this.authRepository.findOneBy({ email: loginAuthDto.email })
      if (!user) {
          throw new NotFoundException("User not found")
      }

    const payload = { id: user.id, email: user.email, role: user.role }
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' })
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' })

    return { accessToken, refreshToken }
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token)
      const newAccessToken = this.jwtService.sign({ id: payload.id, email: payload.email, role: payload.role }, { expiresIn: '1h' })
      return { accessToken: newAccessToken }
    } catch (error) {
      throw new NotFoundException("Invalid refresh token")
    }
  }

}
