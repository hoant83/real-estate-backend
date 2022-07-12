"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const estateInfo_entity_1 = require("../../../entity/estateInfo.entity");
const user_entity_1 = require("../../../entity/user.entity");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const authHelper_1 = require("../../../auth/authHelper");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    constructor(userRepository, estateRepository, userEntity, config, jwt) {
        this.userRepository = userRepository;
        this.estateRepository = estateRepository;
        this.userEntity = userEntity;
        this.config = config;
        this.jwt = jwt;
    }
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
            throw new common_1.HttpException('User Not Exits!', common_1.HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
    async getUserById(id) {
        return this.userRepository.findOne({
            where: { id },
            relations: ['estateEntities'],
        });
    }
    async createUser(createUserDto) {
        const { email, fullName, phone, password, place } = createUserDto;
        let user = await this.userRepository.findOne({
            where: { phone: phone },
        });
        if (user) {
            throw new common_1.HttpException('User Already Exits!', common_1.HttpStatus.CONFLICT);
        }
        user = new user_entity_1.UserEntity();
        user.email = email || '';
        user.fullName = fullName || '';
        user.phone = phone;
        user.place = place || '';
        user.password = this.helper.encodePassword(password);
        const newUser = await this.userRepository.save(user);
        return newUser;
    }
    async signinUser(signinBody) {
        const { phone, password } = signinBody;
        const user = await this.userRepository.findOne({
            where: { phone },
        });
        if (!user) {
            throw new common_1.HttpException('User Not Exits!', common_1.HttpStatus.UNAUTHORIZED);
        }
        console.log(user.password);
        console.log(user);
        const isMatches = await bcrypt.compare(password, user.password);
        if (!isMatches) {
            throw new common_1.HttpException('Password wrong!', common_1.HttpStatus.FORBIDDEN);
        }
        return this.signToken(user.id, user.phone);
    }
    async signToken(userId, phone) {
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
    async updateUser(id, updateUserDto) {
        const { email, fullName, phone, place, idEstate } = updateUserDto;
        const user = await this.getUserById(id);
        if (!user) {
            throw new common_1.HttpException('User Not Exits!', common_1.HttpStatus.NOT_FOUND);
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
        if (checkEstate)
            user.estateEntities.push(estateFind);
        await this.userRepository.save(user);
        const updateUser = this.getUserById(id);
        return updateUser;
    }
    async deleteUser(id) {
        const user = await this.getUserById(id);
        if (!user) {
            throw new common_1.HttpException('Not found!', common_1.HttpStatus.NOT_FOUND);
        }
        await this.userRepository.delete(id);
        return new common_1.HttpException('Delete success!', common_1.HttpStatus.OK);
    }
    async deleteEstateById(id, idEstate) {
        const user = await this.getUserById(id);
        if (!user) {
            throw new common_1.HttpException('Not found user!', common_1.HttpStatus.NOT_FOUND);
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
            throw new common_1.HttpException('Not found estate!', common_1.HttpStatus.NOT_FOUND);
        }
        return new common_1.HttpException('Delete success!', common_1.HttpStatus.OK);
    }
    async changePassword(id, passwordOld, dto) {
        const user = await this.userRepository.findOne({
            where: { id },
        });
        const isMatches = await bcrypt.compare(passwordOld, user.password);
        if (!isMatches) {
            throw new common_1.ForbiddenException('Credentials taken');
        }
        user.password = this.helper.encodePassword(dto.password);
        const editPass = await this.userRepository.save(user);
        return editPass;
    }
    async forgotPassword(dto) {
        const newPass = {
            password: dto.newPassword,
        };
        const user = await this.getUserByPhone(dto.phone);
        if (!user) {
            throw new common_1.HttpException('Not found estate!', common_1.HttpStatus.NOT_FOUND);
        }
        await this.changePassword(user.id, user.password, newPass);
    }
};
__decorate([
    (0, common_1.Inject)(authHelper_1.AuthHelper),
    __metadata("design:type", authHelper_1.AuthHelper)
], UserService.prototype, "helper", void 0);
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(estateInfo_entity_1.EstateEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        user_entity_1.UserEntity,
        config_1.ConfigService,
        jwt_1.JwtService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map