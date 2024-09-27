import { Controller, Get, Post, Param, Body, UsePipes,
ValidationPipe, HttpCode, UseGuards, Request } from "@nestjs/common";
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
        return this.clienteService.createUser(createUserDto)
    }
}