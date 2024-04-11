import { Role } from "src/role/role.enum";

export class User {
    id?: number;
    nome: string;
    email: string;
    senha: string;
    roles?: string;
}
