import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        nome: string;
        email: string;
        senha: string;
        roles: import(".prisma/client").$Enums.Role;
    }>;
    comentar(id: string): Promise<{
        msg: string;
    }>;
    findAll(): Promise<{
        id: number;
        nome: string;
        email: string;
        senha: string;
        roles: import(".prisma/client").$Enums.Role;
    }[]>;
    findOne(id: string): Promise<{
        nome: string;
        email: string;
        id: number;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: number;
        nome: string;
        email: string;
        senha: string;
        roles: import(".prisma/client").$Enums.Role;
    }>;
    remove(id: string): Promise<string>;
}
