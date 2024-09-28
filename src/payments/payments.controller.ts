import { Controller, Post, Body, HttpCode, 
    UseGuards, Request, HttpStatus, HttpException} from "@nestjs/common";
import { PaymentsService } from "./payments.service";
import { PaymentDto } from "./dto/Payment.dto";
import { ConfirmDto } from "./dto/confirm.dto";
import { JWTAuthGuard } from "./jwt-guard";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags('Payments')
@ApiBearerAuth()
@Controller('payments')
export class PaymentsController {
    constructor(private paymentService: PaymentsService) {}

    @Post('create')
    @HttpCode(200)
    async makePayment(@Body() paymentDto: PaymentDto ) {
        const idSession = await this.paymentService.genTokenEmail(paymentDto)
        return {
            message: 'Se ha envíado un código a tu correo para confirmar tu compra',
            idSession: idSession
        }
    }

    @Post('confirm')
    @UseGuards(JWTAuthGuard)
    @HttpCode(200)
    async confirmPayment(@Body() confirmDto: ConfirmDto, @Request() req) {
        try {        
        const {amount, id, token} = req?.user         
        await this.paymentService.confirmPayment(confirmDto, amount, id, token)
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Pago confirmado exitosamente'
        }
        } catch (error) {            
            if(error instanceof HttpException) {
                throw error
            }        
            throw new HttpException('Hubo un error con tu pago', HttpStatus.INTERNAL_SERVER_ERROR);
           }
    }
    
}