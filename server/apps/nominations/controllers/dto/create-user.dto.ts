import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsBooleanString,
  ArrayNotEmpty,
  ValidateNested
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsSame } from '../../../../common/validators/is-same.validator';

export class CreateUserDto {
  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly firstName: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly lastName: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly role: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly rank: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly phone: string;

  @ApiModelProperty({ type: Boolean })
  @IsBooleanString()
  readonly active: boolean;

  @ApiModelProperty({ type: Number })
  @IsNotEmpty()
  @IsNumberString()
  readonly nominationLimit: number;

  @ApiModelProperty({ type: Number })
  @IsNotEmpty()
  @IsNumberString()
  readonly affiliationId: number;

  @ApiModelProperty({ type: Boolean })
  @IsOptional()
  readonly emailVerified: boolean;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly password: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  @IsSame('password')
  readonly confirmationPassword: string;

  readonly approved = true;
  readonly confirmationEmail = false;
}
