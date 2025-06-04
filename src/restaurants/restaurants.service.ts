import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurants } from '@prisma/client';
import { FindOrThrow } from 'src/common/utils/find-or-throw';
import { ServiceResponse } from 'src/common/interfaces/service-response.interface';
import { buildResponse } from 'src/common/utils/build-response';

@Injectable()
export class RestaurantsService {

  constructor(private prisma: PrismaService) { }

  private async findOrThrowById(id: number): Promise<Restaurants> {
    return await FindOrThrow({
      finder: () => this.prisma.restaurants.findUnique({ where: { id } }),
      entityName: 'Restaurant',
      details: `By Id ${id}`
    });
  }

  private buildResponseRestaurants(data: Restaurants | Restaurants[], message: string = 'OK in restaurants') {
    return buildResponse({ key: 'restaurant', data, message, });
  }

  async create(data: CreateRestaurantDto): Promise<ServiceResponse<Restaurants>> {
    const restaurant = await this.prisma.restaurants.create({ data });
    return this.buildResponseRestaurants(restaurant, 'Restaurant was created successfully');
  }

  async getAll(): Promise<ServiceResponse<Restaurants[]>> {
    const restaurants = await this.prisma.restaurants.findMany();
    return this.buildResponseRestaurants(restaurants);
  }

  async getOne(id: number): Promise<ServiceResponse<Restaurants>> {
    const restaurant = await this.findOrThrowById(id);
    return this.buildResponseRestaurants(restaurant, 'Restaurant found');

  }

  async update(
    id: number,
    data: UpdateRestaurantDto
  ): Promise<ServiceResponse<Restaurants>> {

    await this.findOrThrowById(id);

    const restaurant = await this.prisma.restaurants.update({
      where: { id },
      data,
    });

    return this.buildResponseRestaurants(restaurant, 'Restaurant was updated successfully')
  }

  async delete(id: number): Promise<ServiceResponse<Restaurants>> {

    await this.findOrThrowById(id);

    const restaurant = await this.prisma.restaurants.delete({ where: { id } });

    return this.buildResponseRestaurants(restaurant, 'Restaurant was deleted successfully')

  }
}
