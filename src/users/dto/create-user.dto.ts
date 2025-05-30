import { IsNumber, IsString } from "class-validator"

export class CreateUserDto {
    @IsString()
    name: string

    @IsString()
    lastname: string

    @IsString()
    email: string

    @IsString()
    password: string

    @IsNumber()
    id_restaurant: number

    @IsNumber()
    id_role: number
}
