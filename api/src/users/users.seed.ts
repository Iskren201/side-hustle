import { Injectable, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users.service';

@Injectable()
export class UsersSeed implements OnModuleInit {
    constructor(private readonly users: UsersService) { }

    async onModuleInit() {
        await this.users.ensureUser({
            fullName: 'Iskren Iliev',
            email: 'iskren201@gmail.com',
            password: 'test',
            roles: ['admin'],
        });
    }
}
