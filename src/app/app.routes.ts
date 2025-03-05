import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./camera/camera.component').then(m => m.CameraComponent)
    },
    {
        path: 'gallery-img',
        loadComponent: () => import('./gallery-img/gallery-img.component').then(m => m.GalleryImgComponent)
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
