import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CameraComponent } from './camera/camera.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'camera-app';
}
