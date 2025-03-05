import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-gallery-img',
  imports: [CommonModule],
  templateUrl: './gallery-img.component.html',
  styleUrl: './gallery-img.component.css'
})
export class GalleryImgComponent {
  @Input() images: string[] = [];
}
