import { HttpException } from '@nestjs/common';
import { CreateUserDto } from 'src/dto/user/createUser.dto';
import { UpdateUserDto } from 'src/dto/user/updateUser.dto';
import { EstateEntity } from 'src/entity/estateInfo.entity';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { SigninUserDto } from 'src/dto/user/signinUser.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ChangePassword } from 'src/dto/user/changePassword';
import { ForgotPassword } from 'src/dto/user/forgotPassword';
export declare class UserService {
    private userRepository;
    private estateRepository;
    private userEntity;
    private config;
    private jwt;
    constructor(userRepository: Repository<UserEntity>, estateRepository: Repository<EstateEntity>, userEntity: UserEntity, config: ConfigService, jwt: JwtService);
    private readonly helper;
    getAllUsers(): Promise<UserEntity[]>;
    getUserByPhone(phone: any): Promise<UserEntity>;
    getUserById(id: number): Promise<UserEntity>;
    createUser(createUserDto: CreateUserDto): Promise<UserEntity>;
    signinUser(signinBody: SigninUserDto): Promise<{
        access_token: string;
    }>;
    signToken(userId: number, phone: string): Promise<{
        access_token: string;
    }>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity>;
    deleteUser(id: number): Promise<HttpException>;
    deleteEstateById(id: number, idEstate: number): Promise<HttpException>;
    changePassword(id: number, passwordOld: string, dto: ChangePassword): Promise<UserEntity>;
    forgotPassword(dto: ForgotPassword): Promise<void>;
}
