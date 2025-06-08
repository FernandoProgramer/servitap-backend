import { Body, Controller, Get, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  create(@Body() data: CreateRoleDto) {
    return this.rolesService.create(data)
  }
  @Get()
  getAll() {
    return this.rolesService.getAll();
  }


}
