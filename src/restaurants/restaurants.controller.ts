import { Controller, Post, Body, Get, Param, Patch, Delete, HttpCode } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';
import { IdDto } from 'src/common/dto/id.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) { }

  @Post()
  @HttpCode(201)
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  @HttpCode(200)
  getAll() {
    return this.restaurantsService.getAll();
  }

  @Get(':id')
  @HttpCode(200)
  getOne(@Param() { id }: IdDto) {
    return this.restaurantsService.getOne(id);
  }

  @Patch(':id')
  @HttpCode(200)
  update(@Param() { id }: IdDto, @Body() data: UpdateRestaurantDto) {
    return this.restaurantsService.update(id, data)
  }

  @Delete(':id')
  @HttpCode(200)
  delete(@Param() { id }: IdDto) {
    return this.restaurantsService.delete(id)
  }

}
