import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/schemas/user/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async listPublic() {
        return this.userModel.find({}, { fullName: 1, email: 1, roles: 1, createdAt: 1 }).lean();
    }

    async ensureUser(params: { fullName: string; email: string; password: string; roles?: string[] }) {
        const existing = await this.userModel.findOne({ email: params.email }).lean();
        if (existing) return existing;

        const passwordHash = await bcrypt.hash(params.password, 10);
        const doc = await this.userModel.create({
            fullName: params.fullName,
            email: params.email,
            passwordHash,
            roles: params.roles ?? ['user'],
        });
        return doc.toObject();
    }

    async findByEmailWithPassword(email: string) {
        return this.userModel.findOne({ email }).select('+passwordHash');
    }
}
