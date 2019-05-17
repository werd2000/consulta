import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';

const APPROUTES: Routes = [
    { path: '',
      component: PagesComponent,
      // loadChildren: './pages/pages.module#PagesModule'
    },
];

export const APP_ROUTES = RouterModule.forRoot(APPROUTES, {useHash: true});