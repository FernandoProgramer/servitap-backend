import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) { }

  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  getAll() {
    return this.restaurantsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.restaurantsService.getOne(+id);
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateRestaurantDto) {
    return this.restaurantsService.update(+id, data)
  }

}
