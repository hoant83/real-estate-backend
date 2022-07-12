import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/user/createUser.dto';
import { UpdateUserDto } from 'src/dto/user/updateUser.dto';
import { EstateEntity } from 'src/entity/estateInfo.entity';
import { UserEntity } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthHelper } from 'src/auth/authHelper';
import { SigninUserDto } from 'src/dto/user/signinUser.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ChangePassword } from 'src/dto/user/changePassword';
import { ForgotPassword } from 'src/dto/user/forgotPassword';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(EstateEntity)
    private estateRepository: Repository<EstateEntity>,
    private userEntity: UserEntity,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  async getAllUsers() {
    return this.userRepository.find({
      order: { id: 'ASC' },
      relations: ['estateEntities'],
    });
  }
  async getUserByPhone(phone) {
    const user = await this.userRepository.findOne({
      where: { phone: phone },
    });
    if (!user) {
      throw new HttpException('User Not Exits!', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
  async getUserById(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: ['estateEntities'],
    });
  }
  async createUser(createUserDto: CreateUserDto) {
    const { email, fullName, phone, password, place }: CreateUserDto =
      createUserDto;
    let user: UserEntity = await this.userRepository.findOne({
      where: { phone: phone },
    });
    if (user) {
      throw new HttpException('User Already Exits!', HttpStatus.CONFLICT);
    }
    user = new UserEntity();
    user.email = email || '';
    user.fullName = fullName || '';
    user.phone = phone;
    user.place = place || '';
    user.password = this.helper.encodePassword(password);
    const newUser = await this.userRepository.save(user);
    return newUser;
  }
  async signinUser(signinBody: SigninUserDto) {
    const { phone, password }: SigninUserDto = signinBody;
    const user = await this.userRepository.findOne({
      where: { phone },
    });
    if (!user) {
      throw new HttpException('User Not Exits!', HttpStatus.UNAUTHORIZED);
    }
    console.log(user.password);
    console.log(user);
    const isMatches = await bcrypt.compare(password, user.password);
    if (!isMatches) {
      throw new HttpException('Password wrong!', HttpStatus.FORBIDDEN);
    }
    return this.signToken(user.id, user.phone);
  }
  async signToken(
    userId: number,
    phone: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      phone,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.sign(payload, {
      expiresIn: '15m',
      secret: secret,
    });
    return { access_token: token };
  }
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const { email, fullName, phone, place, idEstate }: UpdateUserDto =
      updateUserDto;
    const user: UserEntity = await this.getUserById(id);

    if (!user) {
      throw new HttpException('User Not Exits!', HttpStatus.NOT_FOUND);
    }
    const estateFind = await this.estateRepository.findOne({
      where: {
        id: idEstate || -1,
      },
      relations: ['userEntities'],
    });
    user.email = email || user.email;
    user.fullName = fullName || user.fullName;
    user.phone = phone || user.phone;
    user.place = place || user.place;
    let checkEstate = true;
    user.estateEntities.forEach((element) => {
      if (element.id === idEstate) {
        checkEstate = false;
      }
    });
    if (checkEstate) user.estateEntities.push(estateFind);
    await this.userRepository.save(user);
    const updateUser = this.getUserById(id);
    return updateUser;
  }

  async deleteUser(id: number) {
    const user: UserEntity = await this.getUserById(id);
    if (!user) {
      throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.delete(id);
    return new HttpException('Delete success!', HttpStatus.OK);
  }

  async deleteEstateById(id: number, idEstate: number) {
    const user: UserEntity = await this.getUserById(id);
    if (!user) {
      throw new HttpException('Not found user!', HttpStatus.NOT_FOUND);
    }
    let foundEstate = false;
    for (let i = 0; i < user.estateEntities.length; i++) {
      if (user.estateEntities[i].id === idEstate) {
        user.estateEntities.splice(i, 1);
        foundEstate = true;
        break;
      }
    }
    if (!foundEstate) {
      throw new HttpException('Not found estate!', HttpStatus.NOT_FOUND);
    }
    return new HttpException('Delete success!', HttpStatus.OK);
  }

  async changePassword(id: number, passwordOld: string, dto: ChangePassword) {
    const user = await this.userRepository.findOne({
      where: { id },
    });
    const isMatches = await bcrypt.compare(passwordOld, user.password);
    if (!isMatches) {
      throw new ForbiddenException('Credentials taken');
    }
    user.password = this.helper.encodePassword(dto.password);
    const editPass = await this.userRepository.save(user);
    return editPass;
  }
  async forgotPassword(dto: ForgotPassword) {
    const newPass = {
      password: dto.newPassword,
    };
    const user = await this.getUserByPhone(dto.phone);
    if (!user) {
      throw new HttpException('Not found estate!', HttpStatus.NOT_FOUND);
    }
    await this.changePassword(user.id, user.password, newPass);
  }
}
