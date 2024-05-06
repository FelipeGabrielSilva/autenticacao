import { IsBoolean, IsNumber, IsString } from "class-validator";
import { Post } from "../entities/post.entity";

export class CreatePostDto extends Post {
    @IsString()
    tittle: string;

    @IsString()
    content: string;
}
