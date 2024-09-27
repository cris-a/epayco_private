import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Client } from "src/models/User.Schema";
import { CreateUserDo } from "./dto/Client.dto";
import generarId from "src/helpers/generarId";
import * as bcrypt from 'bcrypt';

@Injectable()
export class ClientService {
    constructor(@InjectModel(Client.name) private userModel: Model<Client>) {}
    async createUser(createUserDto: CreateUserDo): Promise<Client> {
        const {password} = createUserDto
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        const payload = {...createUserDto, password: hash, token: generarId()}
        return this.userModel.create(payload)  
    }

}