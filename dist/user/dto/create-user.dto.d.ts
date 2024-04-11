import { User } from '../entities/user.entity';
import { Role } from 'src/role/role.enum';
export declare class CreateUserDto extends User {
    nome: string;
    email: string;
    senha: string;
    roles?: Role[];
}
