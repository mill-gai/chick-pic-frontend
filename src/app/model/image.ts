export interface ImageInfo {
    title: string;
    description: string;
    country: string;
    city: string;
    lat: number;
    lng: number;
    fileName?: string;
    fileUrl?: string;
    submissionDate?: Date;
}

export interface ImageByPage {
    images: ImageInfo[];
    isLast: boolean;
}

export interface ImageLocation {
    country: string;
    city: string;
    lat: number;
    lng: number;
}

export type Image = {
    title: string;
    description: string;
    fileName: string;
    fileUrl: string;
};

// export type ImageByLocation = {
//     country: string;
//     cities: {
//         city: string;
//         images: Image[];
//         lat: number;
//         lng: number;
//     }[];
// };
