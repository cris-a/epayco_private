import { Controller, Get, Post, Param, Body, UsePipes,
    ValidationPipe, HttpCode, UseGuards, Request, 
    HttpStatus,
    HttpException} from "@nestjs/common";
    import { RecargaDto } from "../balance/dto/Recarga.dto";
import { BalanceService } from "./balance.service";
import { BalanceDto } from "./dto/Balance.dto";

@Controller('balance')
export class BalanceController {
    constructor(private balanceService: BalanceService) {}
    @Post('recarga')
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    async addToBalance(@Body() recargaDto: RecargaDto) {
        try {
            const add = await this.balanceService.addNewBalance(recargaDto)
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Saldo agregado correctamente',
                data: {
                    saldo: add.saldo
                }
            }
        } catch (error) {
            if(error instanceof HttpException) {
                throw error
            }
            throw new HttpException('Error al recargar saldo', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get(':clientDocument/:phone')
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    async checkBalance(@Param() balanceDto: BalanceDto) {
        try {
            const balance = await this.balanceService.getBalance(balanceDto)
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Saldo revisado exitosamente',
                data: {
                    saldo: balance
                }
            }
        } catch (error) {
            if(error instanceof HttpException) {
                throw error
            }
            throw new HttpException('Error al revisar saldo', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
