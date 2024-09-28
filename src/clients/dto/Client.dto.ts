import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateUserDo {

    @IsNotEmpty()
    @IsString()
    clientDocument: string

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string

    @IsNotEmpty()
    @IsString()
    phone: string 
}