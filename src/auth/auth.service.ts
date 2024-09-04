import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { AuthRegisterDTO } from './dto/auth.register.dto';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createToken(user: User) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '30 days',
          subject: String(user.id),
          issuer: 'login',
          audience: 'users',
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: 'users',
        issuer: 'login',
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('email e/ou senha invalidos!');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('email e/ou senha invalidos!');
    }

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('email invalido!');
    }
    const token = this.jwtService.sign(
      { id: user.id },
      {
        expiresIn: '30 minutes',
        subject: String(user.id),
        issuer: 'forget',
        audience: 'users',
      },
    );
    return token;
  }

  async reset(password: string, token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: 'forget',
        audience: 'users',
      });
      if (!String(data.id)) {
        throw new BadRequestException('Token invalido.');
      }

      password = await bcrypt.hash(password, 10);
      const user = await this.prisma.user.update({
        where: {
          id: String(data.id),
        },
        data: {
          password,
        },
      });

      return this.createToken(user);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data);

    return this.createToken(user);
  }
}
