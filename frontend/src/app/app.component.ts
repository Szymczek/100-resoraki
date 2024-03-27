import { Component } from '@angular/core';
import { CanvasBoxComponent } from './components/canvas-box/canvas-box.component'
import { SuccessAlertComponent } from './success-alert/success-alert.component';
import { WarningAlertComponent } from './warning-alert/warning-alert.component';
import { MainPlaygroundComponent } from './main-playground/main-playground.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CanvasBoxComponent, SuccessAlertComponent, WarningAlertComponent, MainPlaygroundComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = `Let's play!`;
}
