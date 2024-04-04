import {Controller, Get, Post, Body, Patch, Param, Delete, Version, Query, Req} from '@nestjs/common';
import { CvsService } from './cvs.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import {randDirectoryPath, randFirstName, randJobTitle, randLastName} from "@ngneat/falso";
import {randomStringGenerator} from "@nestjs/common/utils/random-string-generator.util";
import {version} from "eslint-plugin-prettier";
import * as path from "path";


@Controller(
    {
      path:'cvs',
      version:'1',
    }
)
export class CvsController {
  constructor(
      private readonly cvsService: CvsService,
  ) {}

  @Get("/random")
  random()
  {
    return this.cvsService.randomize()
  }

  @Post('')
  create(@Body() createCvDto: CreateCvDto) {
    return this.cvsService.create(createCvDto);
  }

  @Get()
  findAll() {
    return this.cvsService.findAll();
  }

  @Get('/find/:age/:chaine?')
  find(@Param('age')age:number,@Param('chaine')chaine:string){
    return this.cvsService.find(age,chaine)
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


@Controller(
    {
      path:'cvs',
      version:'2',
    }
)
export class CvsControllerV2 {
  constructor(
      private readonly cvsService: CvsService,
  ) {}

  @Get("/random")
  random()
  {
    return this.cvsService.randomize()
  }

  @Post('')
  create(@Body() createCvDto: CreateCvDto,@Req()req:Request) {
    let userId=req['userInfo']['user-id']
    return this.cvsService.createV2(createCvDto,userId);
  }

  @Get()
  findAll() {
    return this.cvsService.findAll();
  }

  @Get('/find/:age/:chaine?')
  find(@Param('age')age:number,@Param('chaine')chaine:string){
    return this.cvsService.find(age,chaine)
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvsService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto,@Req()req:Request) {
    let userId=req['userInfo']['user-id']
    return this.cvsService.updateV2(id, updateCvDto,userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Req()req:Request) {
    let userId=req['userInfo']['user-id']
    return this.cvsService.remove(id);
  }

}
