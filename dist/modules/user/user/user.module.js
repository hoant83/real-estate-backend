"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const authHelper_1 = require("../../../auth/authHelper");
const estateInfo_entity_1 = require("../../../entity/estateInfo.entity");
const user_entity_1 = require("../../../entity/user.entity");
const jwt_strategy_1 = require("../../../strategy/jwt.strategy");
const user_controller_1 = require("./user.controller");
const user_service_1 = require("./user.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, estateInfo_entity_1.EstateEntity])],
        controllers: [user_controller_1.UserController],
        providers: [
            user_service_1.UserService,
            user_entity_1.UserEntity,
            Object,
            estateInfo_entity_1.EstateEntity,
            authHelper_1.AuthHelper,
            jwt_1.JwtService,
            config_1.ConfigService,
            jwt_strategy_1.JwtStrategy,
        ],
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map