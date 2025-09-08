import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private users: UsersService, private jwt: JwtService) { }

    async validate(email: string, password: string) {
        const user = await this.users.findByEmailWithPassword(email);
        if (!user) throw new UnauthorizedException('Invalid credentials');
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) throw new UnauthorizedException('Invalid credentials');
        return user;
    }

    async signUser(user: any) {
        return this.jwt.signAsync({
            sub: user._id.toString(),
            email: user.email,
            roles: user.roles,
        });
    }
}
