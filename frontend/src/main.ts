import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { CanvasBoxComponent } from './app/components/canvas-box/canvas-box.component'

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

bootstrapApplication(CanvasBoxComponent)
  .catch(err => console.error(err));
