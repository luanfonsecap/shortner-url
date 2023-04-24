import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ShortenDocument = HydratedDocument<Shorten>;

@Schema({
  timestamps: true,
})
export class Shorten {
  @Prop({
    required: true,
    unique: true,
    index: true,
  })
  alias: string;

  @Prop({
    required: true,
  })
  url: string;
}

export const ShortenSchema = SchemaFactory.createForClass(Shorten);
