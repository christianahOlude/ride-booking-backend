import { IsNotEmpty, IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateVehicleDto {
    @IsString()
    @IsNotEmpty()
    carType: string;

    @IsString()
    @IsNotEmpty()
    plateNumber: string;

    @IsString()
    @IsNotEmpty()
    color: string;

    @IsNumber()
    @IsNotEmpty()
    basePrice: number;

    @IsBoolean()
    @IsOptional()
    isAvailable?: boolean;
} {

}
