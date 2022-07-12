import { CreateUserDto } from 'src/dto/user/createUser.dto';
import { UpdateUserDto } from 'src/dto/user/updateUser.dto';
import { UserEntity } from 'src/entity/user.entity';
import { UserService } from './user.service';
import { SigninUserDto } from 'src/dto/user/signinUser.dto';
import { ChangePassword } from 'src/dto/user/changePassword';
import { ForgotPassword } from 'src/dto/user/forgotPassword';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getUsers(): Promise<UserEntity[]>;
    getUserByPhone(phone: string): Promise<UserEntity>;
    createUser(createUserDto: CreateUserDto): Promise<UserEntity>;
    signinUser(signinUserDto: SigninUserDto): Promise<{
        access_token: string;
    }>;
    updateUser(id: number, model: UpdateUserDto): Promise<UserEntity>;
    deleteUser(id: number): Promise<import("@nestjs/common").HttpException>;
    deleteEstateById(id: number, idEstate: number): Promise<import("@nestjs/common").HttpException>;
    changePassword(id: number, passwordold: string, model: ChangePassword): Promise<UserEntity>;
    forgotPassword(dto: ForgotPassword): Promise<void>;
    checkAccessToken(): string;
}
