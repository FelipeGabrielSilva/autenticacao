import { IsNumber, IsString } from "class-validator";

export class CreatePostDto {
    @IsNumber()
    id: number;

    @IsString()
    tittle: string;

    @IsString()
    content: string;
}
