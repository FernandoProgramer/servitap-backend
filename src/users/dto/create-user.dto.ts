import { IsInt, IsString } from "class-validator"

export class CreateUserDto {
    @IsString()
    name: string

    @IsString()
    lastname: string

    @IsString()
    email: string

    @IsString()
    password: string

    @IsInt()
    id_restaurant: number

    @IsInt()
    id_role: number
}
