import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'homepage' },
    {
        path: 'homepage',
        component: HomepageComponent,
    },
    {
        path: 'bookings',
        loadComponent: () => 
        import('./pages/list/list.component').then((m) => m.ListComponent),
    },
    {
        path: 'detailpage/:id',
        loadComponent: () =>
            import('./pages/detailpage/detailpage.component').then((m) => m.DetailpageComponent)
    },
    {
        path: "**",
        loadComponent: () => import('./pages/notfound/notfound.component').then((m) => m.NotfoundComponent)
    }
];
