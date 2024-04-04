import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CvsService } from './cvs.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import {randDirectoryPath, randFirstName, randJobTitle, randLastName} from "@ngneat/falso";
import {randomStringGenerator} from "@nestjs/common/utils/random-string-generator.util";


@Controller('cvs')
export class CvsController {
  constructor(
      private readonly cvsService: CvsService,
  ) {}

  @Get("/random")
  random()
  {
    return this.cvsService.randomize()
  }

  @Post('/create')
  create(@Body() createCvDto: CreateCvDto) {
    return this.cvsService.create(createCvDto);
  }

  @Get()
  findAll() {
    return this.cvsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvsService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto) {
    return this.cvsService.update(id, updateCvDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cvsService.remove(id);
  }
}
