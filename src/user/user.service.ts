import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto, roles: Role[]) {
    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      senha: await bcrypt.hash(createUserDto.senha, 10),
      roles: { set: roles },
    };

    const userCriado = await this.prisma.user.create({
      data,
    });

    const { senha, ...userSemSenha } = userCriado;
    return userCriado;
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email: email } });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        nome: true,
        email: true,
      },
    });
  }

  async comentar(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      }
    });

    if (user) {
      return { msg: `Como isso pode acontecer ${user.nome}?!` }
    }
  }

  async update(id: number, data: UpdateUserDto) {
    return await this.prisma.user.update({
      where: { id: id },
      data,
    });
  }

  async remove(id: number) {
    await this.prisma.user.delete({
      where: { id: id },
    });
    return `user ${id} removido`;
  }
}
