import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ImageByPage, ImageInfo, ImageLocation } from '../../model/image';

@Injectable({
    providedIn: 'root',
})
export class ImageService {
    constructor(private httpClient: HttpClient) {}

    uploadImage(image: ImageInfo, file: File): Observable<string> {
        const httpOptions = {
            headers: new HttpHeaders({
                Enctype: 'multipart/form-data',
            }),
            responseType: 'text' as 'json',
        };
        const formData: FormData = new FormData();
        formData.append(
            'imageRequest',
            new Blob([JSON.stringify(image)], { type: 'application/json' })
        );
        formData.append('file', file);
        // const body = { file: file, imageRequest: image};
        return this.httpClient.post<string>(
            'http://localhost:8080/api/image',
            formData,
            httpOptions
        );
    }

    getAllImages(): Observable<ImageInfo[]> {
        return this.httpClient.get<Array<ImageInfo>>(
            'http://localhost:8080/api/image/getAllImages'
        );
    }

    getImageUrls(fileNames: string[]): Observable<string[]> {
        return this.httpClient.get<Array<string>>(
            'http://localhost:8080/api/image/getImageUrls',
            { params: { fileNames: fileNames } }
        );
    }

    getImageByPage(city: string, page: number, size: number) {
        return this.httpClient.get<ImageByPage>(
            'http://localhost:8080/api/image/getImageByPage',
            { params: { city: city, page: page, size: size } }
        );
    }

    getImageDistinctLocation() {
        return this.httpClient.get<Array<ImageLocation>>(
            'http://localhost:8080/api/image/getDistinctLocation'
        );
    }
}
