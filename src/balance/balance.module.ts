import { Module } from '@nestjs/common';
import { BalanceController } from './balance.controller';
import { BalanceService } from './balance.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, UserSchema } from 'src/models/Client.Schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
        name: Client.name,
        schema: UserSchema
    }])
], 
  controllers: [BalanceController],
  providers: [BalanceService]
})
export class BalanceModule {}
