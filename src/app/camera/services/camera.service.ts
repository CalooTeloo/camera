import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, PermissionStatus } from '@capacitor/camera';
import { Storage } from '@capacitor/storage';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CameraService {

    private readonly IMAGE_KEY = 'gallery_images';
    private imageAdded = new Subject<void>();

    imageAdded$ = this.imageAdded.asObservable();

    constructor() { }

    private async checkPermissions(): Promise<void> {
        const permissions = await Camera.checkPermissions();
        if (permissions.camera !== 'granted') {
            const request = await Camera.requestPermissions({ permissions: ['camera'] });
            if (request.camera !== 'granted') {
                throw new Error('Permisos de Cámara no Otorgados');
            }
        }
    }

    async takePicture(): Promise<string> {
        await this.checkPermissions();
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera // Cambio clave para abrir la cámara
        });

        var imageUrl = image.webPath;

        if (imageUrl != null) {
            await this.saveImage(imageUrl);
            this.imageAdded.next();
            return imageUrl;
        } else {
            throw new Error("Error Al Tomar La Foto, no se pudo tomar");
        }
    };

    private async saveImage(imageUrl: string): Promise<void> {
        const { value } = await Storage.get({ key: this.IMAGE_KEY });
        let images: string[] = value ? JSON.parse(value) : [];
        if (!images.includes(imageUrl)) {
            images.unshift(imageUrl);
            await Storage.set({ key: this.IMAGE_KEY, value: JSON.stringify(images) });
        }
    }

    async getImages(): Promise<string[]> {
        const { value } = await Storage.get({ key: this.IMAGE_KEY });
        return value ? JSON.parse(value) : [];
    }

    async clearImages(): Promise<void> {
        await Storage.remove({ key: this.IMAGE_KEY });
    }

    async deleteImage(imageUrl: string): Promise<void> {
        const { value } = await Storage.get({ key: this.IMAGE_KEY });
        let images: string[] = value ? JSON.parse(value) : [];
        images = images.filter(img => img !== imageUrl);
        await Storage.set({ key: this.IMAGE_KEY, value: JSON.stringify(images) });
        this.imageAdded.next();
    }
}