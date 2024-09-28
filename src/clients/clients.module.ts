import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, UserSchema } from 'src/models/Client.Schema';
import { ClientController } from './clients.controller';
import { ClientService } from './clients.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: {expiresIn: '300s'}
          }),
        MongooseModule.forFeature([{
            name: Client.name,
            schema: UserSchema
        }])
    ], 
    controllers: [ClientController],
    providers: [ClientService]
})
export class ClientsModule {}
