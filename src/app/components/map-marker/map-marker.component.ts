import { Component, Input, OnInit, inject, signal } from '@angular/core';
import { MapAdvancedMarker } from '@angular/google-maps';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Image, ImageInfo } from '../../model/image';
import { Position } from '../../model/position';
import { ImageService } from '../../services/image/image.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-map-marker',
    standalone: true,
    imports: [MapAdvancedMarker, FontAwesomeModule, CommonModule],
    templateUrl: './map-marker.component.html',
    styleUrl: './map-marker.component.css',
})
export class MapMarkerComponent implements OnInit {
    private readonly imageService = inject(ImageService);
    @Input() country: string;
    @Input() city: string;
    @Input() position: Position;
    images: ImageInfo[] = [];
    imgUrls: string[] = [];
    showContent: boolean = false;
    faCircleXmark = faCircleXmark;
    page = signal(0);
    page$ = toObservable(this.page);
    pageSize = 2;
    isLastPage = false;

    ngOnInit(): void {
        // const fileNames: string[] = this.images.map((i) => i.fileName);
        this.page$.subscribe((curPage) => {
            console.log('update page');
            this.imageService
                .getImageByPage(
                    this.country,
                    this.city,
                    this.page(),
                    this.pageSize
                )
                .pipe()
                .subscribe((response) => {
                    const prevLen = this.images.length;
                    this.images = this.images.concat(response.images);
                    this.isLastPage = response.isLast;
                    const fileNames: string[] = response.images.map(
                        (i) => i.fileName
                    );
                    this.getImageUrl(fileNames, prevLen);
                    console.log(this.images);
                });
        });
        // this.page$.subscribe((curPage) => {
        //     console.log('page update');
        //     this.imageService
        //         .getImageByPage(this.city, curPage, this.pageSize)
        //         .pipe()
        //         .subscribe((response) => {
        //             this.images.concat(response.images);
        //             this.isLastPage = response.isLast;
        //             this.getImageUrl(fileNames);
        //         });
        // });
    }

    getImageUrl(fileNames: string[], start: number) {
        this.imageService
            .getImageUrls(fileNames)
            .pipe()
            .subscribe((response) => {
                response.forEach(
                    (value, index) =>
                        (this.images[start + index].fileUrl = value)
                );
                // this.images.forEach(
                //     (value, index) => (value.fileUrl = response[index])
                // );
            });
    }

    onClickHandler() {
        this.showContent = !this.showContent;
        // this.page.set(this.page() + 1);
    }

    onClickViewMoreHandler() {
        this.page.set(this.page() + 1);
    }

    onClickContainer(event: Event) {
        const popup = document.getElementById('outsidePopup');
        if (event.target == popup) {
            this.showContent = !this.showContent;
        }
    }
}
