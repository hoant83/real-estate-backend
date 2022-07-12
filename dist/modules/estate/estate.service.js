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
exports.EstateService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const estateInfo_entity_1 = require("../../entity/estateInfo.entity");
const typeorm_2 = require("typeorm");
let EstateService = class EstateService {
    constructor(estateRepository) {
        this.estateRepository = estateRepository;
    }
    async getAllEstate() {
        const estates = await this.estateRepository.find({
            order: { id: 'ASC' },
            relations: ['userEntities'],
        });
        return estates;
    }
    async getEstateById(id) {
        const estate = await this.estateRepository.findOne({
            where: {
                id,
            },
            relations: ['userEntities'],
        });
        if (!estate) {
            throw new common_1.HttpException('Not found!', common_1.HttpStatus.NOT_FOUND);
        }
        return estate;
    }
    async createNewEstate(estateDto) {
        const { name, category, price, bed, m2, notification, toilet, pool, imgUrl, widthStreet, otoStreet, gerion, status, type, } = estateDto;
        const estate = new estateInfo_entity_1.EstateEntity();
        estate.name = name;
        estate.category = category;
        estate.price = price;
        estate.bed = bed;
        estate.toilet = toilet;
        estate.pool = pool;
        estate.imgUrl = imgUrl;
        estate.m2 = m2;
        estate.notification = notification;
        estate.widthStreet = widthStreet;
        estate.otoStreet = otoStreet;
        estate.gerion = gerion;
        estate.status = status;
        estate.type = type;
        const newState = await this.estateRepository.save(estate);
        return newState;
    }
    async updateEstateById(id, estateDto) {
        const { name, category, price, bed, m2, notification, toilet, pool, imgUrl, widthStreet, otoStreet, gerion, status, type, } = estateDto;
        const estate = await this.estateRepository.findOne({
            where: {
                id,
            },
        });
        if (!estate) {
            throw new common_1.HttpException('Not found!', common_1.HttpStatus.NOT_FOUND);
        }
        estate.name = name || estate.name;
        estate.category = category || estate.category;
        estate.price = price || estate.price;
        estate.bed = bed || estate.bed;
        estate.m2 = m2 || estate.m2;
        estate.notification = notification || estate.notification;
        estate.toilet = toilet || estate.toilet;
        estate.pool = pool || estate.pool;
        estate.imgUrl = imgUrl || estate.imgUrl;
        estate.widthStreet = widthStreet || estate.widthStreet;
        estate.otoStreet = otoStreet || estate.otoStreet;
        estate.gerion = gerion || estate.gerion;
        estate.status = status || estate.status;
        estate.type = type || estate.type;
        await this.estateRepository.update(id, estate);
        return this.estateRepository.findOne({
            where: { id },
        });
    }
    async deleteEstate(id) {
        const estate = await this.getEstateById(id);
        estate.userEntities = [];
        await this.estateRepository.save(estate);
        await this.estateRepository.delete(id);
        return new common_1.HttpException('Delete success!', common_1.HttpStatus.OK);
    }
    async getEstatesFilter(take, skip, category, price, gerion) {
        console.log(take);
        const allEstates = await this.estateRepository.find({
            where: {
                category,
                gerion,
                price: (0, typeorm_2.Between)(0, price || 100000000),
            },
            take: take || 8,
            skip: skip || 0,
            order: { id: 'ASC' },
            relations: ['userEntities'],
        });
        return allEstates;
    }
};
EstateService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(estateInfo_entity_1.EstateEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EstateService);
exports.EstateService = EstateService;
//# sourceMappingURL=estate.service.js.map