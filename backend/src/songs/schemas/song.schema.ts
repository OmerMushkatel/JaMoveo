import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SongDocument = Song & Document;

@Schema()
export class Song {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  singer: string;

  @Prop({ required: true })
  words: Array<Array<object>>;

  @Prop({ required: false })
  imageUrl: string;
}

export const SongSchema = SchemaFactory.createForClass(Song);
