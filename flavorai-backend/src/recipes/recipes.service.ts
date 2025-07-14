import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) { }

  async create(userId: number, dto: CreateRecipeDto) {
    return this.prisma.recipe.create({
      data: {
        ...dto,
        userId,
      },
    });
  }

  async findAll(search?: string) {
    return this.prisma.recipe.findMany({
      where: search
        ? {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        }
        : {},
    });
  }

  async findByUser(userId: number) {
    return this.prisma.recipe.findMany({
      where: { userId },
    });
  }

  async findOne(id: number) {
    return this.prisma.recipe.findUnique({
      where: { id },
    });
  }

  async update(id: number, dto: Partial<CreateRecipeDto>, userId: number) {
    const recipe = await this.prisma.recipe.findUnique({ where: { id } });

    if (!recipe || recipe.userId !== userId) {
      throw new ForbiddenException('You are not allowed to update this recipe');
    }

    return this.prisma.recipe.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number, userId: number) {
    const recipe = await this.prisma.recipe.findUnique({ where: { id } });

    if (!recipe || recipe.userId !== userId) {
      throw new ForbiddenException('You are not allowed to delete this recipe');
    }

    return this.prisma.recipe.delete({
      where: { id },
    });
  }
}
