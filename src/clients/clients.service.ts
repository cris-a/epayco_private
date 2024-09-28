import { ConflictException, Injectable } from "@nestjs/common";
import { BadRequestException } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Client } from "src/models/Client.Schema";
import { CreateUserDo } from "./dto/Client.dto";
import generarId from "src/helpers/generarId";
import * as bcrypt from 'bcrypt';
import { LoginDto } from "./dto/Login.dto";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class ClientService {
    constructor(@InjectModel(Client.name) private userModel: Model<Client>, 
    private readonly jwtService: JwtService) {}
    async createUser(createUserDto: CreateUserDo): Promise<Client> {   
        const passwordRegex = /^(?=.*[A-Z])(?=(.*[A-Za-z]){4,})(?=(.*\d){4,})(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;
    
        if (!passwordRegex.test(createUserDto.password)) {
          throw new BadRequestException('La contraseña debe contener al menos 1 letra mayúscula, 4 letras, 4 números y 1 símbolo.');
        }     
        const clientExists = await this.userModel.findOne({
            email: createUserDto.email
        })

        if(clientExists) throw new ConflictException('Este cliente ya tiene una cuenta creada.')       
        const {password} = createUserDto
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        const payload = {...createUserDto, password: hash, id: generarId()}      
        const createdClient = new this.userModel(payload)        
        return await createdClient.save()
    }

    async login(loginDto:LoginDto) {
        const {email, password} = loginDto
        const client = await this.userModel.findOne({email:email})
        if(!client) throw new ConflictException('Este cliente no tiene una cuenta creada')
        const isValidPassword = await bcrypt.compare(password, client.password);
        if(!isValidPassword) throw new ConflictException('Password no es válido');
        const payload = {id: client.id}
        const token = await this.jwtService.signAsync(payload)
        return {token:token}
    }

}