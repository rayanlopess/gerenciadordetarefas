import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { firebaseConfig } from '../src/environments/environment';
import { provideDatabase } from '@angular/fire/database';
import { getDatabase } from 'firebase/database';

import { provideHttpClient } from '@angular/common/http';                   

bootstrapApplication(AppComponent, {
  providers: [
    
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideDatabase(() => getDatabase()),
    provideHttpClient()
  ],
});
