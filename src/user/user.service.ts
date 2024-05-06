import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { Action } from 'src/casl/authorization/action.type';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private caslAbilityFactory: CaslAbilityFactory) { }

  async create(createUserDto: CreateUserDto) {

    const passwordHashed = await bcrypt.hash(createUserDto.password, 10);

    let isAdmin = false;

    if (createUserDto.email === 'felipe@gmail.com') isAdmin = true;

    const data: Prisma.UserCreateInput = {
      ...createUserDto,
      isAdmin,
      password: passwordHashed,
    };

    const userCriado = await this.prisma.user.create({
      data,
    });

    if (isAdmin) {
      const ability = this.caslAbilityFactory.createForUser(userCriado);
      ability.can(Action.Manage, 'all');

      userCriado.isAdmin = true;
    }

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
      where: { id: id },
    });
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
