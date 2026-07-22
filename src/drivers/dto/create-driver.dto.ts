import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber, IsUrl } from 'class-validator';

export class CreateDriverDto {
    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    companyName: string;

    @IsUrl()
    @IsNotEmpty()
    idCardUrl: string;
}
