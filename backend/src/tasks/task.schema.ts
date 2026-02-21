import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from '../users/user.schema';

export type TaskDocument = Task & Document;

export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'completed';

@Schema({ timestamps: true })
export class Task {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: User;

    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ required: true })
    dateTime: string;

    @Prop({ required: true })
    deadline: string;

    @Prop({ required: true, enum: ['low', 'medium', 'high'] })
    priority: Priority;

    @Prop()
    category: string;

    @Prop({ required: true, enum: ['pending', 'completed'], default: 'pending' })
    status: TaskStatus;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
