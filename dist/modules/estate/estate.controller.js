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
exports.EstateController = void 0;
const common_1 = require("@nestjs/common");
const createEstate_dto_1 = require("../../dto/estate/createEstate.dto");
const updateEstate_dto_1 = require("../../dto/estate/updateEstate.dto");
const estate_service_1 = require("./estate.service");
let EstateController = class EstateController {
    constructor(estateService) {
        this.estateService = estateService;
    }
    async getAllEstate() {
        const estates = await this.estateService.getAllEstate();
        return estates;
    }
    async getEstateWithFilter(take, skip, category, price, gerion) {
        const estatesFilter = await this.estateService.getEstatesFilter(take, skip, category, price, gerion);
        return estatesFilter;
    }
    async getEstateById(id) {
        const estate = await this.estateService.getEstateById(id);
        return estate;
    }
    async postEstateById(estate) {
        return this.estateService.createNewEstate(estate);
    }
    async updateEstateById(id, estate) {
        return this.estateService.updateEstateById(id, estate);
    }
    deleteEstate(id) {
        return this.estateService.deleteEstate(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EstateController.prototype, "getAllEstate", null);
__decorate([
    (0, common_1.Get)('/filter'),
    __param(0, (0, common_1.Query)('take')),
    __param(1, (0, common_1.Query)('skip')),
    __param(2, (0, common_1.Query)('category')),
    __param(3, (0, common_1.Query)('price')),
    __param(4, (0, common_1.Query)('gerion')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, Number, String]),
    __metadata("design:returntype", Promise)
], EstateController.prototype, "getEstateWithFilter", null);
__decorate([
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EstateController.prototype, "getEstateById", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createEstate_dto_1.CreateEstateDto]),
    __metadata("design:returntype", Promise)
], EstateController.prototype, "postEstateById", null);
__decorate([
    (0, common_1.Put)('/update/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateEstate_dto_1.UpdateEstateDto]),
    __metadata("design:returntype", Promise)
], EstateController.prototype, "updateEstateById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EstateController.prototype, "deleteEstate", null);
EstateController = __decorate([
    (0, common_1.Controller)('estate'),
    __metadata("design:paramtypes", [estate_service_1.EstateService])
], EstateController);
exports.EstateController = EstateController;
//# sourceMappingURL=estate.controller.js.map