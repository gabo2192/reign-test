import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop({ required: true })
  postId: string;
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  author: string;
  @Prop()
  url: string;
  @Prop({ required: true })
  createdAt: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
