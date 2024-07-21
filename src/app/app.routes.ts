import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ApprovalPageComponent } from './pages/approval-page/approval-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'app-approval-page', component: ApprovalPageComponent },
];
