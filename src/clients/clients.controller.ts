import { Controller, Get, Post, Param, Body, UsePipes,
ValidationPipe, HttpCode, UseGuards, Request, 
HttpStatus,
HttpException} from "@nestjs/common";
import { ClientService } from "./clients.service";
import { CreateUserDo } from "./dto/Client.dto";
import { LoginDto } from "./dto/Login.dto";


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
        console.log(error);
        
        throw new HttpException('Error al registrar usuario', HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }
}