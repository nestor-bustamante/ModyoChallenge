import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', 
    pathMatch: 'full', 
    redirectTo: 'main' },
  {
    path: 'main',
    loadComponent: () => import('./views/challenge/challenge.component').then(c => c.ChallengeComponent), 
    title: "Modyo Challenge"
  },
  { path: '**', 
    loadComponent: () => import('./views/not-found/not-found.component').then(c => c.NotFoundComponent),
    title: "Not found"
  }
];

