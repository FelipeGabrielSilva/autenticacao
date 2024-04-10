import { User } from '../entities/user.entity';
export declare class CreateUserDto extends User {
    nome: string;
    email: string;
    senha: string;
}
