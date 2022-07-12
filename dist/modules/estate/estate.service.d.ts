import { HttpException } from '@nestjs/common';
import { CreateEstateDto } from 'src/dto/estate/createEstate.dto';
import { UpdateEstateDto } from 'src/dto/estate/updateEstate.dto';
import { EstateEntity } from 'src/entity/estateInfo.entity';
import { Repository } from 'typeorm';
export declare class EstateService {
    private estateRepository;
    constructor(estateRepository: Repository<EstateEntity>);
    getAllEstate(): Promise<EstateEntity[]>;
    getEstateById(id: number): Promise<EstateEntity>;
    createNewEstate(estateDto: CreateEstateDto): Promise<EstateEntity>;
    updateEstateById(id: number, estateDto: UpdateEstateDto): Promise<EstateEntity>;
    deleteEstate(id: number): Promise<HttpException>;
    getEstatesFilter(take: number, skip: number, category: string, price: number, gerion: string): Promise<EstateEntity[]>;
}
