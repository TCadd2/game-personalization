import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent, routes } from './app/app.component';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)]
});