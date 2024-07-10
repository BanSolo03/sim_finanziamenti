import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RequestDocument = Request & Document;

@Schema()
export class Request {
  @Prop({ required: true })
  cognomeNomeRichiedente: string;

  @Prop({ required: true })
  dataInserimentoRichiesta: Date;

  @Prop({ required: true })
  importo: number;

  @Prop({ required: true })
  numeroRate: number;
}

export const RequestSchema = SchemaFactory.createForClass(Request);