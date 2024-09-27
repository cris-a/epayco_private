import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type User = HydratedDocument<Client>;

@Schema()
export class Client {

    @Prop({required: true, unique: true})
    userId: string

    @Prop({required: true})
    name: string
    
    @Prop({required: true, unique: true})
    email: string

    @Prop({required: true, unique: true})
    phone: string

    @Prop({required: true})
    password: string

    @Prop()
    token: string

    @Prop({default: false})
    confirmed: boolean

    @Prop({default: 0})
    saldo: number
}

export const UserSchema = SchemaFactory.createForClass(Client)