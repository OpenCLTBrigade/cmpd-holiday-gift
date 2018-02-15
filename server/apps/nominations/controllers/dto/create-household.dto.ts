import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  ArrayNotEmpty,
  ValidateNested
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

class AddressDto {
  readonly id;

  readonly householdId;

  readonly cmpdDivision;

  readonly cmpdResponseArea;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly type: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly street: string;

  readonly street2;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly city: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly state: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly zip: string;
}

//TODO: Validate nomination limit
export class CreateHouseholdDto {
  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly firstName: string;

  @ApiModelProperty({ type: String, required: false })
  @IsOptional()
  readonly middleName: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly lastName: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly dob: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly race: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly gender: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly last4ssn: string;

  @ApiModelProperty({ type: String })
  @IsEmail()
  readonly email: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly preferredContactMethod: string;

  @ValidateNested() readonly address: AddressDto;

  //TODO: Validate children
  @ArrayNotEmpty() readonly children: any[];

  //TODO: Validate phone numbers
  @ArrayNotEmpty() readonly phoneNumbers: any[];
}
