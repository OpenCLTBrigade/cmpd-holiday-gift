import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { IsSame } from '../../../common/validators/is-same.validator';

export class UpdateUserDto {
  id: number;

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
  readonly active: boolean;

  @ApiModelProperty({ type: Number })
  @IsNotEmpty()
  readonly nominationLimit: number;

  @ApiModelProperty({ type: Number })
  @IsNotEmpty()
  readonly affiliationId: number;

  @ApiModelProperty({ type: Boolean })
  @IsOptional()
  readonly emailVerified: boolean;

  @ApiModelProperty({ type: String })
  @IsOptional()
  readonly password: string;

  @ApiModelProperty({ type: String })
  @IsOptional()
  @IsSame('password')
  readonly confirmationPassword: string;

  readonly approved = true;
  readonly confirmationEmail = false;
}
