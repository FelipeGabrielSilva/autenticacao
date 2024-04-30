import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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

  async login(email: string, password: string): Promise<UserToken> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado.');
    }

    const ispasswordValid = await bcrypt.compare(password, user.password);

    if (!ispasswordValid) {
      throw new UnauthorizedException('Senha incorreta.');
    }

    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      access_token: accessToken,
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      // Removido a password do retorno do usuário para evitar retornar informações sensíveis
      return {
        ...user,
        password: undefined,
      };
    }

    return null;
  }

}
