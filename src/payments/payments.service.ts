import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Client } from "src/models/Client.Schema";
import { PaymentDto } from "./dto/Payment.dto";
import { ConfirmDto } from "./dto/confirm.dto";
import { MailerService } from '@nestjs-modules/mailer';
import { randomInt } from "crypto";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PaymentsService { 
    constructor(@InjectModel(Client.name) private userModel: Model<Client>, 
    private readonly mailService: MailerService,
    private readonly jwtService: JwtService) {}

    
    
    async genTokenEmail(paymentDto:PaymentDto): Promise<string> {
        const {email, password, amount} = paymentDto

        const client = await this.userModel.findOne({email: email})

        if(!client) throw new ConflictException('Cliente no encontrado')

        const isPasswordValid = await bcrypt.compare(password, client.password)

        if(!isPasswordValid) throw new ConflictException('Password no válido')

        const token = randomInt(100000, 999999).toString()
        const payload = {id: client.id, token: token, amount: amount}
        const idSession = await this.jwtService.signAsync(payload)
        const name = client.name
        
        client.idSession = idSession
        client.token = token
        client.save()

        await this.sendEmail(token, email, name)
        return idSession
    }

    private async sendEmail( token: string, email: string, name: string):Promise<void> {
        
        const message = `Hola ${name}, este es tu código para confirmar tu pago: ${token}`;
        this.mailService.sendMail({
          from: 'no-reply <administracion@epayco.com>',
          to: email,
          subject: `Código para confirmar tu pago`,
          text: message,
        });
    }
    

    async confirmPayment(confirmDto: ConfirmDto, amount: number, id: string, token: string):Promise<any> {
        const client = await this.userModel.findOne({id: id})           

        if(client.token !== confirmDto.token) {

            throw new ConflictException('Código inválido o expirado')

        }

        if(client.token === confirmDto.token && client.saldo < amount) {
            client.token = ''
            client.idSession = ''
            await client.save()
            throw new ConflictException('No tiene saldo sificiente');

        }

            
            client.saldo -= Number(amount)
            client.token = ''
            client.idSession = ''
            await client.save()
            return {
                message: 'Se confirmó el pago exitosamente.', 
            }       

    }   
    
}
