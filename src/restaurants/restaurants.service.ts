import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { Restaurants } from '@prisma/client';
import { ServiceResponse } from 'src/common/interfaces/service-response.interface';
import { buildResponse } from 'src/common/utils/build-response';
import { FindOrThrow } from 'src/common/utils/find-or-throw';
import { BuildResponseProps } from 'src/common/interfaces/build-response.interface';

const MESSAGE_RESTAURANT = Object.freeze({
  CREATE: 'Restaurant was created successfully',
  UPDATE: 'Restaurant was updated successfully',
  DELETE: 'Restaurant was deleted successfully',
});

@Injectable()
export class RestaurantsService {

  private readonly entityName = 'restaurant';
  constructor(private readonly prisma: PrismaService) { }

  private findOrThrowById(id: number): Promise<Restaurants> {

    return FindOrThrow({
      finder: () => this.prisma.restaurants.findUnique({ where: { id } }),
      details: `by Id ${id}`,
      entityName: this.entityName
    });
  }

  private buildRestaurantResponse<T>({
    key,
    data,
    message,
  }: BuildResponseProps<T>): ServiceResponse<T> {

    key = key || (Array.isArray(data) ? 'restaurants' : 'restaurant');
    return buildResponse({ key, data, message });
  }

  async create(data: CreateRestaurantDto): Promise<ServiceResponse<Restaurants>> {
    const restaurant = await this.prisma.restaurants.create({ data });
    return this.buildRestaurantResponse({
      data: restaurant,
      message: MESSAGE_RESTAURANT.CREATE
    });
  }

  async findAll(): Promise<ServiceResponse<Restaurants[]>> {
    const restaurants = await this.prisma.restaurants.findMany();
    return this.buildRestaurantResponse({
      data: restaurants
    });
  }

  async findOne(id: number): Promise<ServiceResponse<Restaurants>> {
    const restaurant = await this.findOrThrowById(id);
    return this.buildRestaurantResponse({
      data: restaurant,
      key: 'restaurant_found'
    });

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

    return this.buildRestaurantResponse({
      data: restaurant,
      message: MESSAGE_RESTAURANT.UPDATE
    });
  }

  async remove(id: number): Promise<ServiceResponse<Restaurants>> {

    await this.findOrThrowById(id);

    const restaurant = await this.prisma.restaurants.delete({ where: { id } });

    return this.buildRestaurantResponse({
      data: restaurant,
      key: 'restaurant_removed',
      message: MESSAGE_RESTAURANT.DELETE
    });

  }
}
