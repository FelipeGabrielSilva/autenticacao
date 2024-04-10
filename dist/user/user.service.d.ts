import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
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
        nome: string;
        email: string;
        id: number;
    }>;
    update(id: number, data: UpdateUserDto): Promise<{
        id: number;
        nome: string;
        email: string;
        senha: string;
    }>;
    remove(id: number): Promise<string>;
}
