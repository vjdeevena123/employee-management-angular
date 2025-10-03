import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { customInterceptor } from './app/services/interceptors/custom-interceptor';

bootstrapApplication(App, {
  providers: [
    appConfig.providers,
    provideHttpClient(withInterceptors([customInterceptor]))
  ]
}).catch((err) => console.error(err));
