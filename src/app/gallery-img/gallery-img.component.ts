import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { CameraService } from '../camera/services/camera.service';

@Component({
  selector: 'app-gallery-img',
  imports: [CommonModule],
  templateUrl: './gallery-img.component.html',
  styleUrl: './gallery-img.component.css'
})
export class GalleryImgComponent {
  @Input() images: string[] = [];
  private cameraService: CameraService = inject(CameraService);
  currentSlide: number = 0;

  ngOnInit() {
    this.loadImages();
    // Suscribirse a cambios en las imágenes
    this.cameraService.imageAdded$.subscribe(() => {
      this.loadImages();
    });
  }

  async loadImages() {
    this.images = await this.cameraService.getImages();
  }

  prevSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

  nextSlide() {
    if (this.currentSlide < this.images.length - 1) {
      this.currentSlide++;
    }
  }

  // Eliminar una imagen
  async deleteImage(imageUrl: string) {
    await this.cameraService.deleteImage(imageUrl);
    // Ajustar el currentSlide si es necesario
    if (this.currentSlide >= this.images.length - 1 && this.currentSlide > 0) {
      this.currentSlide--;
    }
  }
}