import { IsEmail, IsNotEmpty, IsOptional, ArrayNotEmpty, ValidateNested } from 'class-validator';

class AddressDto {
    readonly id

    readonly householdId

    readonly cmpdDivision

    readonly cmpdResponseArea

    @IsNotEmpty()
    readonly type: string

    @IsNotEmpty()
    readonly street: string

    readonly street2
    
    @IsNotEmpty()
    readonly city: string
    
    @IsNotEmpty()
    readonly state: string
    
    @IsNotEmpty()
    readonly zip: string
}

//TODO: Validate nomination limit
export class CreateHouseholdDto {
    @IsNotEmpty()
    readonly firstName: string

    @IsOptional()
    readonly middleName: string

    @IsNotEmpty()
    readonly lastName: string

    @IsNotEmpty()
    readonly dob: string

    @IsNotEmpty()
    readonly race: string

    @IsNotEmpty()
    readonly gender: string

    @IsNotEmpty()
    readonly last4ssn: string

    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    readonly preferredContactMethod: string

    @ValidateNested()
    readonly address: AddressDto

    //TODO: Validate children
    @ArrayNotEmpty()
    readonly children: any[]

    //TODO: Validate phone numbers
    @ArrayNotEmpty()
    readonly phoneNumbers: any[]

}