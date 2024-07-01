import { Component, OnInit, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { ImageUploaderComponent } from '../../components/image-uploader/image-uploader.component';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { DropdownMenuComponent } from '../../components/dropdown-menu/dropdown-menu.component';
import { locations } from '../../constants/locations';
import { HeaderComponent } from '../../components/header/header.component';
import { S3Service } from '../../services/s3/s3.service';
import { NgIf } from '@angular/common';
import { NotificationComponent } from '../../components/notification/notification.component';
import { MapComponent } from '../../components/map/map.component';
import { GoogleMap } from '@angular/google-maps';
import { ImageService } from '../../services/image/image.service';
import { ImageInfo } from '../../model/image';
import { Items, LocationItems } from '../../model/dropdown-item';

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [
        FontAwesomeModule,
        ImageUploaderComponent,
        ReactiveFormsModule,
        DropdownMenuComponent,
        HeaderComponent,
        NgIf,
        NotificationComponent,
        MapComponent,
        GoogleMap,
    ],
    templateUrl: './home-page.component.html',
    styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
    openForm: boolean = false;
    isSubmitForm: boolean = false;
    message: string;
    addImageForm: FormGroup;
    faCircleXmark = faCircleXmark;
    faImage = faImage;
    fileObj: File;
    imageUrl: string | ArrayBuffer | null = null;
    locations = locations;
    imageUrl1: string | null = null;
    @ViewChild(NotificationComponent)
    notiComponent: NotificationComponent;

    images: Array<string> = [];

    options: google.maps.MapOptions = {
        center: { lat: 40, lng: 10 },
        zoom: 2,
        mapId: '',
    };
    ngOnInit(): void {}

    constructor(
        private fb: FormBuilder,
        private s3Service: S3Service,
        private imageService: ImageService
    ) {
        this.addImageForm = this.fb.group({
            name: ['', [Validators.required]],
            description: [''],
            country: ['', [Validators.required]],
            city: ['', [Validators.required]],
            image: [undefined, [Validators.required]],
        });
    }

    handleImageError(): void {
        this.s3Service.getSignedUrl('grass.png').then((data) => {
            this.imageUrl1 = data;
            console.log('image url: ' + this.imageUrl1);
        });
    }

    addImageHandler() {
        // this.imageService.getAllImages().subscribe(data => {this.images = data});
        this.imageService
            .getImageUrls([
                '1719689366511image6.jpeg',
                '1719692142769image9.jpeg',
                '1719638423385chicken2.jpeg',
            ])
            .subscribe((data) => {
                this.images = data;
            });
        console.log(this.images);
        this.openForm = !this.openForm;
        this.isSubmitForm = false;
        this.addImageForm.reset();
    }

    // private getFileUrl(file: File):

    onUploadImage(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            console.log(input.files);
            var fileReader = new FileReader();
            this.fileObj = input.files[0];
            console.log(this.fileObj);
            fileReader.readAsDataURL(this.fileObj);
            fileReader.onload = () => {
                this.imageUrl = fileReader.result;
            };
        }
    }

    onSubmit(): void {
        this.isSubmitForm = true;
        const image: ImageInfo = {
            title: this.addImageForm.get('name')?.value,
            description: this.addImageForm.get('description')?.value,
            country: this.addImageForm.get('country')?.value,
            city: this.addImageForm.get('city')?.value,
        };

        if (this.addImageForm.valid) {
            // console.log("form is valid");
            this.imageService
                .uploadImage(image, this.fileObj)
                .subscribe((respond) => {
                    console.log(respond);
                    this.notiComponent.playAnimation('success');
                });
            this.notiComponent.playAnimation('valid input');
        } else {
            // console.log("form is not valid");
            this.message = 'invalid input';
            this.notiComponent.playAnimation('invalid input');
        }
        // const fileForm = new FormData();
        // fileForm.append('file', this.fileObj);
        // this.s3Service.uploadImage(this.fileObj);

        // fileReader.readAsDataURL()
    }

    onSelectLocation(selectedLocation: Items): void {
        const location = selectedLocation as LocationItems;
        this.addImageForm.patchValue({ country: location.country });
        this.addImageForm.patchValue({ city: location.city });
    }

    get name() {
        return this.addImageForm.get('name');
    }
    get description() {
        return this.addImageForm.get('description');
    }
    get country() {
        return this.addImageForm.get('country');
    }
    get city() {
        return this.addImageForm.get('city');
    }
}
