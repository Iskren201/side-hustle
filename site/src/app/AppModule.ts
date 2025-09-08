import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BaseUrlInterceptor } from './core/http/base-url.interceptor';
import { routes } from './app.routes';
import { HomeComponent } from './pages/home/home.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';

@NgModule({
    declarations: [AppComponent, HomeComponent, SignInComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
    ],
    providers: [{ provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true }],
    bootstrap: [AppComponent],
})
export class AppModule { }
