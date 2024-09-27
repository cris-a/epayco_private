import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, UserSchema } from 'src/models/Client.Schema';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
  MongooseModule.forFeature([{
      name: Client.name,
      schema: UserSchema
  }]), 
  ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
  MailerModule.forRoot({
    transport: {
      host: process.env.EMAIL_HOST,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    },
  }),
  JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: {expiresIn: '300s'}
  })
], 
  controllers: [PaymentsController],
  providers: [PaymentsService]
})
export class PaymentsModule {}
