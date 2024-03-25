import { Component } from '@angular/core';
import { CanvasBoxComponent } from './components/canvas-box/canvas-box.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CanvasBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'frontend';
}
