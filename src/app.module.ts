import { Module } from '@nestjs/common';
import { ClientsModule } from './clients/clients.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BalanceModule } from './balance/balance.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      uri: configService.get<string>('MONGODB_URI')
    })
  }), ClientsModule, BalanceModule, PaymentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
