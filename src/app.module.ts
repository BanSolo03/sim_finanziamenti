import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestsModule } from './requests/requests.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    RequestsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
