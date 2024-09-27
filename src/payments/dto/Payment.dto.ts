import { IsNotEmpty, IsNumber, IsString } from "class-validator";
export class PaymentDto {
    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    
    @IsNumber()
    @IsNotEmpty()
    amount: number
}