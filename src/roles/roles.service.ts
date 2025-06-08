import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Roles } from '@prisma/client';
import { CreateRoleDto } from './dto/create-role.dto';
import { buildResponse } from 'src/common/utils/build-response';

@Injectable()
export class RolesService {

  constructor(private prisma: PrismaService) { }

  private buildResponse(
    data: Roles | Roles[],
    message: string = 'Ok in roles',
    key: string = 'roles'
  ) {
    return buildResponse({
      data,
      key,
      message
    });
  }

  async create(data: CreateRoleDto) {
    const new_role = await this.prisma.roles.create({
      data
    });
    return this.buildResponse(new_role);
  }

  getAll(): Promise<Roles[]> {
    return this.prisma.roles.findMany();
  }

}
