import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type Role = 'admin' | 'user';

@Schema({ timestamps: true, versionKey: false })
export class User extends Document {
    @Prop({ required: true, trim: true, minlength: 2, maxlength: 80 })
    fullName!: string;

    @Prop({ required: true, unique: true, lowercase: true, trim: true })
    email!: string;

    @Prop({ required: true, select: false })
    passwordHash!: string;

    @Prop({ type: [String], default: ['user'], index: true })
    roles!: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ email: 1 }, { unique: true });
