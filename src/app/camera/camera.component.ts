import { Component, inject } from '@angular/core';
import { CameraService } from './services/camera.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-camera',
  imports: [CommonModule, NgIf],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.css'
})
export class CameraComponent {
  cameraService: CameraService = inject(CameraService);
  imageUrl: string[] = [];
  errorMessage: string = '';
  loading: boolean = false;

  constructor() {
    this.loadImages();
  }

  async loadImages() {
    this.imageUrl = await this.cameraService.getImages();
  }

  async takePicture() {
    this.errorMessage = '';
    try {
      this.loading = true;
      await new Promise(resolve => setTimeout(resolve, 100));
      const newimageUrl = await this.cameraService.takePicture();
      if (!newimageUrl) {
        throw new Error('La imagen, no fue una imagen valida');
      }
      this.imageUrl.push(newimageUrl);
      this.loading = false;
    }
    catch (error) {
      console.error('Hubo un Error al momento de Capturar la Imagen: ', error);
      this.errorMessage = String(error);
      this.loading = false;
    }
  }
}