import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Client } from "src/models/Client.Schema";
import { CreateUserDo } from "./dto/Client.dto";
import { RecargaDto } from "./dto/Recarga.dto";
import generarId from "src/helpers/generarId";
import generarToken from "src/helpers/generarToken";
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientService {
    constructor(@InjectModel(Client.name) private userModel: Model<Client>) {}
    async createUser(createUserDto: CreateUserDo): Promise<Client> {
        const userExists = await this.userModel.findOne({
            email: createUserDto.email
        })

        if(userExists) throw new ConflictException('Este cliente ya tiene una cuenta creada.')
        
        const {password} = createUserDto
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        const payload = {...createUserDto, password: hash, token: generarToken(), id: generarId()}      
        const createdClient = new this.userModel(payload)        
        return await createdClient.save()
    }

    async addNewBalance(recargaDto: RecargaDto): Promise<Client> {
        const userExists = await this.userModel.findOne({
            $and: [
                {clientDocument: recargaDto.clientDocument},
                {phone: recargaDto.phone}
            ]
        })

        if(!userExists) throw new ConflictException('Este cliente no tiene una cuenta creada o los datos son incorrectos.')    

        userExists.saldo += recargaDto.saldo
        await userExists.save()
        return userExists

    }

}