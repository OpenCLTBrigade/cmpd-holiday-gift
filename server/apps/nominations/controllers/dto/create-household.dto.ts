import { IsEmail, IsNotEmpty, IsOptional, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

export class AddressDto {
  readonly id;
  readonly householdId;
  readonly cmpdDivision;
  readonly cmpdResponseArea;

  @ApiModelProperty({ type: String })
  @IsNotEmpty({ message: 'Address type is required' })
  readonly type: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty({ message: 'Address street is required' })
  readonly street: string;

  readonly street2;

  @ApiModelProperty({ type: String })
  @IsNotEmpty({ message: 'Address city is required' })
  readonly city: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty({ message: 'Address state is required' })
  readonly state: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty({ message: 'Address zip is required' })
  readonly zip: string;
}

class HouseholdDto {
  @ApiModelProperty({ type: String })
  @IsNotEmpty({ message: 'Head of household first name is required' })
  readonly firstName: string;

  @ApiModelProperty({ type: String, required: false })
  @IsOptional()
  readonly middleName: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty({ message: 'Head of household last name is required' })
  readonly lastName: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty({ message: 'Head of household date of birth is required' })
  readonly dob: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty({ message: 'Head of household race is required' })
  readonly race: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty({ message: 'Head of household gender is required' })
  readonly gender: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty({ message: 'Head of household last 4 of social is required' })
  readonly last4ssn: string;

  @ApiModelProperty({ type: String })
  @IsEmail()
  readonly email: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty({ message: 'Head of household preferred contact method is required' })
  readonly preferredContactMethod: string;
}

//TODO: Validate nomination limit
export class CreateHouseholdDto {
  @ValidateNested()
  @Type(() => HouseholdDto)
  readonly household: HouseholdDto;

  @ValidateNested()
  @Type(() => AddressDto)
  readonly address: AddressDto;

  //TODO: Validate children
  @ArrayNotEmpty({ message: 'Household must have at least one child' })
  readonly children: any[];

  //TODO: Validate phone numbers
  @ArrayNotEmpty({ message: 'Household must have at least one phone number' })
  readonly phoneNumbers: any[];
}
