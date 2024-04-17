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
  ) { }

  async login(email: string, senha: string): Promise<UserToken> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado.');
    }

    const isSenhaValid = await bcrypt.compare(senha, user.senha);

    if (!isSenhaValid) {
      throw new UnauthorizedException('Senha incorreta.');
    }

    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      access_token: accessToken,
    };
  }

  async validateUser(email: string, senha: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(senha, user.senha))) {
      // Removido a senha do retorno do usuário para evitar retornar informações sensíveis
      return {
        ...user,
        senha: undefined,
      };
    }

    return null;
  }
}
