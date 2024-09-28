import { Controller, Post, Body, UsePipes,
ValidationPipe, HttpCode, HttpStatus,
HttpException} from "@nestjs/common";
import { ClientService } from "./clients.service";
import { CreateUserDo } from "./dto/Client.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Client')
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
}