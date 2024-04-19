import { IsDate, IsNumber, IsString } from "class-validator";

export class CreatePostDto {
    @IsString()
    tittle: string;

    @IsString()
    content: string;
}
