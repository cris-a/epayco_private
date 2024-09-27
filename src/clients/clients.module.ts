import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, UserSchema } from 'src/models/Client.Schema';
import { ClientController } from './clients.controller';
import { ClientService } from './clients.service';

@Module({
    imports: [
        MongooseModule.forFeature([{
            name: Client.name,
            schema: UserSchema
        }])
    ], 
    controllers: [ClientController],
    providers: [ClientService]
})
export class ClientsModule {}
