import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { User, UserRole } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
 constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ){}

  async register(dto: CreateAuthDto) {
    const existing = await this.userRepo.findOne({ where: { email: dto.email } })
    if (existing) throw new ConflictException('User already exists')

    const hash = await bcrypt.hash(dto.password, 10)
    const user = this.userRepo.create({ ...dto, password: hash });
    await this.userRepo.save(user)

    const tokens = await this.getTokens(user.id, user.email, user.role)
    return { user, ...tokens }
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } })
    if (!user) throw new UnauthorizedException('Invalid credentials')

    const valid = await bcrypt.compare(dto.password, user.password)
    if (!valid) throw new UnauthorizedException('Invalid credentials')

    const tokens = await this.getTokens(user.id, user.email, user.role)
    return { user, ...tokens }
  }

  async getTokens(userId: number, email: string, role: UserRole) {
    const payload = { sub: userId, email, role }

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    })

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    })

    return { accessToken, refreshToken };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      })
      return this.getTokens(payload.sub, payload.email, payload.role)
    } catch {
      throw new UnauthorizedException('Invalid refresh token')
    }
  }

  async findAll () {
    const user = await this.userRepo.find({relations: ['establishment']})
    return user.map(user => user)
  }

  async update(id: number, dto: UpdateAuthDto) {
    const user = await this.userRepo.findOneBy({ id })
    if (!user) return null

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10)
    }

    Object.assign(user, dto)
    return this.userRepo.save(user)
  }


async deleteUser(id: number) {
  const user = await this.userRepo.findOneBy({ id });
  if (!user) {
    throw new NotFoundException(`User ${id} not found`);
  }
  await this.userRepo.delete(id)
  return user;
}

}
