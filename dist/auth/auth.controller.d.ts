import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginInDto: Record<string, any>): Promise<import("./models/UserToken").UserToken>;
}
