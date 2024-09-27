import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { ObjectId } from 'mongoose'
export class CreateUserDo {

    // @IsNotEmpty()
    // @IsString()
    // readonly id: string

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
    password: string

    @IsNotEmpty()
    @IsString()
    phone: string 

}