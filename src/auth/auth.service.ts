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

    if (user) {
      const payload: UserPayload = {
        sub: user.id,
        email: user.email,
        senha: user.senha,
      };

      const accessToken = await this.jwtService.signAsync(payload);

      return {
        access_token: accessToken,
      };
    } else {
      throw new UnauthorizedException('Usuário não encontrado.');
    }

    const isSenhaValid = await bcrypt.compare(senha, user.senha);

    if (!isSenhaValid) {
      throw new UnauthorizedException('Senha incorreta.');
    }
  }

  async validateUser(email: string, senha: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(senha, user.senha))) {
      return {
        ...user,
        senha: undefined,
      };
    }

    return null;
  }
}
