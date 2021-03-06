"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstateModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const estateInfo_entity_1 = require("../../entity/estateInfo.entity");
const estate_controller_1 = require("./estate.controller");
const estate_service_1 = require("./estate.service");
let EstateModule = class EstateModule {
};
EstateModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([estateInfo_entity_1.EstateEntity])],
        controllers: [estate_controller_1.EstateController],
        providers: [estate_service_1.EstateService],
    })
], EstateModule);
exports.EstateModule = EstateModule;
//# sourceMappingURL=estate.module.js.map