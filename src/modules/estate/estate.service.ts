import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateEstateDto } from 'src/dto/estate/createEstate.dto';
import { UpdateEstateDto } from 'src/dto/estate/updateEstate.dto';
import { EstateEntity } from 'src/entity/estateInfo.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class EstateService {
  constructor(
    @InjectRepository(EstateEntity)
    private estateRepository: Repository<EstateEntity>,
  ) {}
  async getAllEstate() {
    const estates = await this.estateRepository.find({
      order: { id: 'ASC' },
      relations: ['userEntities'],
    });
    return estates;
  }
  async getEstateById(id: number) {
    const estate = await this.estateRepository.findOne({
      where: {
        id,
      },
      relations: ['userEntities'],
    });
    if (!estate) {
      throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
    }
    return estate;
  }
  async createNewEstate(estateDto: CreateEstateDto) {
    const {
      name,
      category,
      price,
      bed,
      m2,
      notification,
      toilet,
      pool,
      imgUrl,
      widthStreet,
      otoStreet,
      gerion,
      status,
      type,
    }: CreateEstateDto = estateDto;
    const estate = new EstateEntity();
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

  async updateEstateById(id: number, estateDto: UpdateEstateDto) {
    const {
      name,
      category,
      price,
      bed,
      m2,
      notification,
      toilet,
      pool,
      imgUrl,
      widthStreet,
      otoStreet,
      gerion,
      status,
      type,
    }: CreateEstateDto = estateDto;
    const estate = await this.estateRepository.findOne({
      where: {
        id,
      },
    });
    if (!estate) {
      throw new HttpException('Not found!', HttpStatus.NOT_FOUND);
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

  async deleteEstate(id: number) {
    const estate = await this.getEstateById(id);
    estate.userEntities = [];
    await this.estateRepository.save(estate);
    await this.estateRepository.delete(id);
    return new HttpException('Delete success!', HttpStatus.OK);
  }
  async getEstatesFilter(
    take: number,
    skip: number,
    category: string,
    price: number,
    gerion: string,
  ) {
    console.log(take);
    const allEstates = await this.estateRepository.find({
      where: {
        category,
        gerion,
        price: Between(0, price || 100000000),
      },
      take: take || 8,
      skip: skip || 0,
      order: { id: 'ASC' },
      relations: ['userEntities'],
    });
    return allEstates;
  }
}
