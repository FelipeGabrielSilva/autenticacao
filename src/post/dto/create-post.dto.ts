import { IsNumber, IsString } from "class-validator";

export class CreatePostDto {
    @IsNumber()
    id: number;

    @IsString()
    titulo: string;

    @IsString()
    conteudo: string;
}
