import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersSeed } from './users.seed';
import { User, UserSchema } from 'src/schemas/user/user.schema';
import { UsersService } from './users.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UsersController],
    providers: [UsersService, UsersSeed],
    exports: [UsersService],
})
export class UsersModule { }
