import { ApiModelProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  uid: string;

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
  readonly phoneNumber: string;

  @ApiModelProperty({ type: Number })
  @IsNotEmpty()
  readonly nominationLimit: number;

  @ApiModelProperty({ type: Number })
  @IsNotEmpty()
  readonly affiliationId: number;

  @ApiModelProperty({ type: Boolean })
  @IsOptional()
  readonly emailVerified: boolean;
}
