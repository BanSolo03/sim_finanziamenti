import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestsModule } from './requests/requests.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://nikibano:Qu%40r%40nt%40cinque45!@dbcrypto.eoqbyfz.mongodb.net/Finanziamenti'),
    RequestsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
