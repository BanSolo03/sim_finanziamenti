import { Module } from '@nestjs/common';
import { RequestsController } from './requests.controller';
import { RequestsService } from './requests.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RequestSchema } from './request.schema';

@Module({
  imports: [MongooseModule.forFeature([{name: Request.name, schema: RequestSchema}])],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {}
