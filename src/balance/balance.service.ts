import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Client } from "src/models/Client.Schema";
import { RecargaDto } from "../balance/dto/Recarga.dto";
import { BalanceDto } from "./dto/Balance.dto";

@Injectable()
export class BalanceService {
    constructor(@InjectModel(Client.name) private userModel: Model<Client>) {}
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

    async getBalance(balanceDto: BalanceDto) : Promise<any> {
        
        const userExists = await this.userModel.findOne({
            $and: [
                {clientDocument: balanceDto.clientDocument},
                {phone: balanceDto.phone}
            ]
        })

        if(!userExists) throw new ConflictException('Este cliente no tiene una cuenta creada o los datos son incorrectos.')    

        return userExists.saldo
    }
}
