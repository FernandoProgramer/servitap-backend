import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { RolesModule } from './roles/roles.module';
import { CategoriesModule } from './categories/categories.module';
import { DishesModule } from './dishes/dishes.module';
import { TablesModule } from './tables/tables.module';
import { OrdersModule } from './orders/orders.module';
import { BillsModule } from './bills/bills.module';


@Module({
  imports: [UsersModule, RestaurantsModule, RolesModule, CategoriesModule, DishesModule, TablesModule, OrdersModule, BillsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
