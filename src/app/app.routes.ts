import { Routes } from '@angular/router';
import { RoadmapShellComponent } from './features/roadmap-shell/roadmap-shell.component';
import { HomeComponent } from './features/home/home.component';
import { ConceptPageComponent } from './features/concept-page/concept-page.component';

export const routes: Routes = [
  {
    path: '',
    component: RoadmapShellComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'learn/:slug', component: ConceptPageComponent },
    ],
  },
  { path: '**', redirectTo: '' },
];
