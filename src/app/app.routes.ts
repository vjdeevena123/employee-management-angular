import { Routes } from '@angular/router';
import { Employee } from './components/employee/employee';
import { Client } from './components/client/client';
import { Master } from './components/master/master';
import { ClientProject } from './components/client-project/client-project';
import { Login } from './components/login/login';
import { Layout } from './components/layout/layout';
import { authGuard } from './guard/auth-guard';
import { Dashboard } from './components/dashboard/dashboard';
import { SignUp } from './components/sign-up/sign-up';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: '',
        component: Layout,
        canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                component: Dashboard
            },
            {
                path: 'clients',
                component: Client
            },
            {
                path: 'client-project',
                component: ClientProject
            }]
    },
];
