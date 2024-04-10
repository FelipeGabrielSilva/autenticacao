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
    }>;
    findAll(): Promise<{
        id: number;
        nome: string;
        email: string;
        senha: string;
    }[]>;
    findOne(id: string): Promise<{
        id: number;
        nome: string;
        email: string;
        senha: string;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: number;
        nome: string;
        email: string;
        senha: string;
    }>;
    remove(id: string): Promise<string>;
}
