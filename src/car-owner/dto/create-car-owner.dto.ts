import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber } from 'class-validator';


export class CreateCarOwnerDto {

    @IsString()
    @IsNotEmpty()
    fullName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsPhoneNumber()
    @IsNotEmpty()
    phoneNumber: string;
}

