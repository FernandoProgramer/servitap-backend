import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurants } from '@prisma/client';

@Injectable()
export class RestaurantsService {

  constructor(private prisma: PrismaService) { }

  create(data: CreateRestaurantDto): Promise<Restaurants> {
    return this.prisma.restaurants.create({
      data
    });
  }

  getAll(): Promise<Restaurants[]> {
    return this.prisma.restaurants.findMany();
  }

  async getOne(id: number): Promise<Restaurants> {
    const restaurant = await this.prisma.restaurants.findFirst({ where: { id } });
    if (!restaurant) throw new NotFoundException(`Not found restaurant by id ${id}`);
    return restaurant;
  }

  async update(id: number, data: UpdateRestaurantDto): Promise<UpdateRestaurantDto> {
    const restaurant = await this.prisma.restaurants.findFirst({
      where: { id }
    });
    if (!restaurant) throw new NotFoundException(`Not found restaurant by id ${id} to update`);
    return await this.prisma.restaurants.update({
      where: { id },
      data
    });
  }
}
