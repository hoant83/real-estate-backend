import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateEstateDto } from 'src/dto/estate/createEstate.dto';
import { UpdateEstateDto } from 'src/dto/estate/updateEstate.dto';
import { EstateEntity } from 'src/entity/estateInfo.entity';
import { EstateService } from './estate.service';

@Controller('estate')
export class EstateController {
  constructor(private estateService: EstateService) {}
  @Get()
  async getAllEstate(): Promise<EstateEntity[]> {
    const estates = await this.estateService.getAllEstate();
    return estates;
  }
  @Get('/filter')
  async getEstateWithFilter(
    @Query('take') take: number,
    @Query('skip') skip: number,
    @Query('category') category: string,
    @Query('price') price: number,
    @Query('gerion') gerion: string,
  ): Promise<EstateEntity[]> {
    const estatesFilter = await this.estateService.getEstatesFilter(
      take,
      skip,
      category,
      price,
      gerion,
    );
    return estatesFilter;
  }
  @Get('/:id')
  async getEstateById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<EstateEntity> {
    const estate = await this.estateService.getEstateById(id);
    return estate;
  }
  @Post()
  async postEstateById(@Body() estate: CreateEstateDto) {
    return this.estateService.createNewEstate(estate);
  }

  @Put('/update/:id')
  async updateEstateById(
    @Param('id', ParseIntPipe) id: number,
    @Body() estate: UpdateEstateDto,
  ) {
    return this.estateService.updateEstateById(id, estate);
  }
  @Delete(':id')
  deleteEstate(@Param('id', ParseIntPipe) id: number) {
    return this.estateService.deleteEstate(id);
  }
}
