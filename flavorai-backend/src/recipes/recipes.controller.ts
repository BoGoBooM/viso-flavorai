import {
  Controller, Post, Get, Param, Body, Delete, Put, UseGuards, Req, Query
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Req() req, @Body() dto: CreateRecipeDto) {
    return this.recipesService.create(req.user.sub, dto);
  }

  @Get()
  findAll(@Query('search') search: string) {
    return this.recipesService.findAll(search);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('mine')
  findMine(@Req() req) {
    return this.recipesService.findByUser(req.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: Partial<CreateRecipeDto>, @Req() req) {
    return this.recipesService.update(+id, dto, req.user.sub);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.recipesService.remove(+id, req.user.sub);
  }
}
