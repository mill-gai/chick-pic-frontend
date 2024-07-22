import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from '../../model/location';
import { Items } from '../../model/dropdown-item';

@Injectable({
    providedIn: 'root',
})
export class LocationService {
    constructor(private httpClient: HttpClient) {}

    getAllCountries(): Observable<Items[]> {
        return this.httpClient.get<Items[]>(
            'http://localhost:8081/api/location/getAllCountries'
        );
    }

    getCitiesByCountry(country: string): Observable<Location> {
        return this.httpClient.get<Location>(
            'http://localhost:9000/api/location/getCitiesByCountry',
            { params: { country: country } }
        );
    }
}
