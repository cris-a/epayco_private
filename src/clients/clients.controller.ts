import { Controller, Get, Post, Param, Body, UsePipes,
ValidationPipe, HttpCode, UseGuards, Request, 
HttpStatus,
HttpException} from "@nestjs/common";
import { ClientService } from "./clients.service";
import { CreateUserDo } from "./dto/Client.dto";
import { RecargaDto } from "./dto/Recarga.dto";


@Controller('clients')
export class ClientController {
    constructor(private clienteService: ClientService) {}
    @Post('create')
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    async createUser(@Body() createUserDto: CreateUserDo) { 
       try {
        const client = await this.clienteService.createUser(createUserDto)
        return {
            statusCode: HttpStatus.CREATED,
            message: 'Cliente registrado exitosamente',
            data: {
                id: client.id
            }
        }
       } catch (error) {
        if(error instanceof HttpException) {
            throw error
        }        
        throw new HttpException('Error al registrar usuario', HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }

    @Post('recarga')
    @HttpCode(200)
    @UsePipes(new ValidationPipe())
    async addToBalance(@Body() recargaDto: RecargaDto) {
        try {
            const add = await this.clienteService.addNewBalance(recargaDto)
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
}