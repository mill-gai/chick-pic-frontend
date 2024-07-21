import { Component, inject, OnInit } from '@angular/core';
import { GoogleMap, MapAdvancedMarker } from '@angular/google-maps';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ImageByLocation, ImageInfo } from '../../model/image';
import { ImageService } from '../../services/image/image.service';
import { MapMarkerComponent } from '../map-marker/map-marker.component';

@Component({
    selector: 'app-map',
    standalone: true,
    imports: [
        GoogleMap,
        MapAdvancedMarker,
        FontAwesomeModule,
        MapMarkerComponent,
    ],
    templateUrl: './map.component.html',
    styleUrl: './map.component.css',
})
export class MapComponent implements OnInit {
    private readonly imageService = inject(ImageService);
    options: google.maps.MapOptions = {
        center: { lat: 40, lng: 10 },
        zoom: 2,
        mapId: '',
        maxZoom: 6,
    };
    position = { lat: 45.5, lng: -73.6 };
    showContent = false;
    faCircleXmark = faCircleXmark;
    images: ImageByLocation[] = [];

    ngOnInit(): void {
        this.imageService
            .getAllImages()
            .pipe()
            .subscribe((response) => {
                console.log(response);
                this.images = this.groupImageByLocation(response);
                console.log(this.images);
            });
    }

    groupImageByLocation(imageResponse: Array<ImageInfo>): ImageByLocation[] {
        const res: ImageByLocation[] = imageResponse.reduce((acc, cur) => {
            let country = acc.find((c: any) => c.country == cur.country);
            if (!country) {
                // country not in the list
                country = {
                    country: cur.country,
                    cities: [],
                };
                acc.push(country);
            }
            let city = country.cities.find((c: any) => c.city == cur.city);
            if (!city) {
                city = {
                    city: cur.city,
                    images: [],
                    lat: cur.lat,
                    lng: cur.lng,
                };
                country.cities.push(city);
            }
            city.images.push({
                title: cur.title,
                description: cur.description,
                fileName: cur.fileName,
            });
            return acc;
        }, []);
        return res;
    }

    onClickHandler() {
        this.showContent = !this.showContent;
    }
}
