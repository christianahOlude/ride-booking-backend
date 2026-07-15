export class CreateDriverDto {
    fullName: string;
    phoneNumber: string;
    licenseIndex: string;
    vehicle?: {
        carType: string;
        plateNumber: string;
        color: string;
    };
}
