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
import { HeaderComponent } from '../../components/header/header.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { S3Service } from '../../services/s3/s3.service';
import { NgIf } from '@angular/common';
import { NotificationComponent } from '../../components/notification/notification.component';
import { MapComponent } from '../../components/map/map.component';
import { GoogleMap } from '@angular/google-maps';
import { ImageService } from '../../services/image/image.service';
import { ImageInfo } from '../../model/image';
import { Items } from '../../model/dropdown-item';
import { LocationService } from '../../services/location/location.service';
import { City } from '../../model/location';
import { AutocompleteComponent } from '../../components/autocomplete/autocomplete.component';
import { signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-home-page',
    standalone: true,
    imports: [
        FontAwesomeModule,
        ImageUploaderComponent,
        ReactiveFormsModule,
        DropdownMenuComponent,
        HeaderComponent,
        NavbarComponent,
        NgIf,
        NotificationComponent,
        MapComponent,
        GoogleMap,
        AutocompleteComponent,
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
    keyword = 'value';
    countires: Items[];
    selectedCountry = signal('');
    selectedCountry$ = toObservable(this.selectedCountry);
    cities: City[];
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
        private imageService: ImageService,
        private locationService: LocationService
    ) {
        this.addImageForm = this.fb.group({
            name: ['', [Validators.required]],
            description: [''],
            country: ['', [Validators.required]],
            city: ['', [Validators.required]],
            lat: [0, [Validators.required]],
            lng: [0, [Validators.required]],
            image: [undefined, [Validators.required]],
        });
        this.locationService
            .getAllCountries()
            .pipe()
            .subscribe((response) => {
                this.countires = response;
            });
        this.selectedCountry$.subscribe((value) => {
            this.locationService
                .getCitiesByCountry(value)
                .pipe()
                .subscribe((response) => {
                    this.cities = response;
                });
        });
        // this.locationService
        //     .getCitiesByCountry(this.selectedCountry())
        //     .pipe()
        //     .subscribe((response) => {
        //         this.cities = response;
        //     });
    }

    addImageHandler() {
        this.openForm = !this.openForm;
        this.isSubmitForm = false;
        this.addImageForm.reset();
        this.imageUrl = null;
    }

    onUploadImage(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            var fileReader = new FileReader();
            this.fileObj = input.files[0];
            fileReader.readAsDataURL(this.fileObj);
            fileReader.onload = () => {
                this.imageUrl = fileReader.result;
            };
        }
    }

    onSubmit(): void {
        console.log(this.countires);
        console.log(this.cities);

        this.isSubmitForm = true;
        const image: ImageInfo = {
            title: this.addImageForm.get('name')?.value,
            description: this.addImageForm.get('description')?.value,
            country: this.addImageForm.get('country')?.value,
            city: this.addImageForm.get('city')?.value,
            lat: this.addImageForm.get('lat')?.value,
            lng: this.addImageForm.get('lng')?.value,
        };

        if (this.addImageForm.valid) {
            this.imageService
                .uploadImage(image, this.fileObj)
                .subscribe((respond) => {
                    console.log(respond);
                    this.notiComponent.playAnimation('success');
                    this.addImageHandler();
                });
        } else {
            this.message = 'invalid input';
            this.notiComponent.playAnimation('invalid input');
        }
    }

    onSelectCountry(input: Items): void {
        this.selectedCountry.set(input.value);
        // const location = selectedLocation as Location;
        // this.addImageForm.patchValue({ country: location.country });
        // this.addImageForm.patchValue({ city: location.city });
        // this.addImageForm.patchValue({ lat: location.lat });
        // this.addImageForm.patchValue({ lng: location.lng });
    }

    onSelectCity(input: Items): void {}

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
