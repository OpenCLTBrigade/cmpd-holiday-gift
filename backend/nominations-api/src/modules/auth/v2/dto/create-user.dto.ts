import { ApiModelProperty } from '@nestjs/swagger';
import { IsBooleanString, IsEmail, IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

export class CreateUserDto {
  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly phoneNumber: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly displayName: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly name: string;

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
}
