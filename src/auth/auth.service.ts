import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async login(email: string, senha: string): Promise<UserToken> {
    const user = await this.userService.findByEmail(email);
    if (user?.senha != senha) {
      throw new UnauthorizedException('Senha incorreta.');
    }

    const payload: UserPayload = {
      sub: user.id,
      email: user.email,  
      senha: user.senha,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, senha: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isSenhaValid = await bcrypt.compare(senha, user.senha);

      if (isSenhaValid) {
        return {
          ...user,
          senha: undefined,
        };
      }
    }

    throw new UnauthorizedException('E-mail ou senha incorretos.');
  }
}
