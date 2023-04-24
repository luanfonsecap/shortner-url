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

  @Prop({
    default: 0,
  })
  hints: number;
}

export const ShortenSchema = SchemaFactory.createForClass(Shorten);

ShortenSchema.post('findOne', function (doc) {
  if (doc && doc?.updateOne) {
    doc.updateOne({ $inc: { hints: 1 } }).exec();
  }
});
