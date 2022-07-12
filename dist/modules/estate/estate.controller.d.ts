import { CreateEstateDto } from 'src/dto/estate/createEstate.dto';
import { UpdateEstateDto } from 'src/dto/estate/updateEstate.dto';
import { EstateEntity } from 'src/entity/estateInfo.entity';
import { EstateService } from './estate.service';
export declare class EstateController {
    private estateService;
    constructor(estateService: EstateService);
    getAllEstate(): Promise<EstateEntity[]>;
    getEstateWithFilter(take: number, skip: number, category: string, price: number, gerion: string): Promise<EstateEntity[]>;
    getEstateById(id: number): Promise<EstateEntity>;
    postEstateById(estate: CreateEstateDto): Promise<EstateEntity>;
    updateEstateById(id: number, estate: UpdateEstateDto): Promise<EstateEntity>;
    deleteEstate(id: number): Promise<import("@nestjs/common").HttpException>;
}
