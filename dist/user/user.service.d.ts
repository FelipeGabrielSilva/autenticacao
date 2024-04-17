import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        nome: string;
        email: string;
        senha: string;
    }>;
    findByEmail(email: string): Promise<{
        id: number;
        nome: string;
        email: string;
        senha: string;
    }>;
    findAll(): Promise<{
        id: number;
        nome: string;
        email: string;
        senha: string;
    }[]>;
    findOne(id: number): Promise<{
        id: number;
        nome: string;
        email: string;
    }>;
    comentar(id: number): Promise<{
        msg: string;
    }>;
    update(id: number, data: UpdateUserDto): Promise<{
        id: number;
        nome: string;
        email: string;
        senha: string;
    }>;
    remove(id: number): Promise<string>;
}
