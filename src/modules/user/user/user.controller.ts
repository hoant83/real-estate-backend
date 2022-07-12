import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtGuard } from 'src/guard/jwt.guard';
import { CreateUserDto } from 'src/dto/user/createUser.dto';
import { UpdateUserDto } from 'src/dto/user/updateUser.dto';
import { UserEntity } from 'src/entity/user.entity';
import { UserService } from './user.service';
import { SigninUserDto } from 'src/dto/user/signinUser.dto';
import { ChangePassword } from 'src/dto/user/changePassword';
import { ForgotPassword } from 'src/dto/user/forgotPassword';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor) //pipe for Exclude...
  @Get()
  async getUsers(): Promise<UserEntity[]> {
    const users = await this.userService.getAllUsers();
    return users;
  }
  @UseInterceptors(ClassSerializerInterceptor) //pipe for Exclude...
  @Get(':phone')
  async getUserByPhone(@Param('phone') phone: string): Promise<UserEntity> {
    const users = await this.userService.getUserByPhone(phone);
    return users;
  }
  @UseInterceptors(ClassSerializerInterceptor) //pipe for Exclude...
  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }
  @Post('signin')
  async signinUser(@Body() signinUserDto: SigninUserDto) {
    const user = await this.userService.signinUser(signinUserDto);
    return user;
  }
  @Put('/update/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() model: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.userService.updateUser(id, model);
  }
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUser(id);
  }

  @Delete(':id/idEstate')
  deleteEstateById(
    @Param('id', ParseIntPipe) id: number,
    @Param('idEstate', ParseIntPipe) idEstate: number,
  ) {
    return this.userService.deleteEstateById(id, idEstate);
  }
  @UseInterceptors(ClassSerializerInterceptor) //pipe for Exclude...
  @UseGuards(JwtGuard)
  @Put('/changepass/:id/:passwordold')
  changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Param('passwordold') passwordold: string,
    @Body() model: ChangePassword,
  ) {
    return this.userService.changePassword(id, passwordold, model);
  }

  @Post('/forgotpassword')
  forgotPassword(@Body() dto: ForgotPassword) {
    return this.userService.forgotPassword(dto);
  }

  @UseGuards(JwtGuard)
  @Get('/accesstoken/check')
  checkAccessToken() {
    return 'oke';
  }
}
