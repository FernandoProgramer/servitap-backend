import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Users } from "@prisma/client";

@Injectable()
export class UsersService {

  constructor(private prisma: PrismaService) { }

  async create(data: CreateUserDto): Promise<Users> {
    const { id_restaurant, id_role, ...rest } = data;
    return await this.prisma.users.create({
      data: {
        ...rest,
        Restaurant: {
          connect: { id: id_restaurant }
        },
        Role: {
          connect: { id: id_role }
        }
      }
    })
  }

  getAll(): Promise<Users[]> {
    return this.prisma.users.findMany()
  }
}