import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export interface AuthUser { _id: string; email: string; fullName: string; roles: string[]; }

@Injectable({ providedIn: 'root' })
export class AuthService {
    currentUser: AuthUser | null = null;
    constructor(private http: HttpClient) { }
    login(email: string, password: string) {
        return this.http.post<AuthUser>('/auth/login', { email, password })
            .pipe(tap(u => this.currentUser = u));
    }
    me() { return this.http.get<AuthUser>('/auth/me'); }
    logout() { return this.http.post('/auth/logout', {}).pipe(tap(() => this.currentUser = null)); }
}
