import { Items } from './dropdown-item';

// export interface Location extends Items {
//     country: string;
//     cities: City[];
// }

// export interface City extends Items {
//     city: string;
// }

export interface City extends Items {
    lat: number;
    lng: number;
}
