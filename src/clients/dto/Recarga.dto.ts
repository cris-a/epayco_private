import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class RecargaDto {

    @IsNotEmpty()
    @IsString()
    clientDocument: string

    @IsNotEmpty()
    @IsString()
    phone: string 

    @IsNotEmpty()
    @IsNumber()
    saldo: number 

}