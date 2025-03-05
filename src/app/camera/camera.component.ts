import { Component, inject } from '@angular/core';
import { CameraService } from './services/camera.service';
import { CommonModule } from '@angular/common';
import { GalleryImgComponent } from '../gallery-img/gallery-img.component';

@Component({
  selector: 'app-camera',
  imports: [CommonModule, GalleryImgComponent],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.css'
})
export class CameraComponent {
  cameraService: CameraService = inject(CameraService);
  imageUrl: string[] = [];
  errorMessage: string = '';
  loading: boolean = false;

  async takePicture() {
    this.errorMessage = ''; //Limpia cualquier mensjae de error anterior

    try {
      this.loading = true;
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
