import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RegisterUserDto {
  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly displayName: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly name: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly rank: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly email: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly phoneNumber: string;

  @ApiModelProperty({ type: Number })
  @IsNotEmpty()
  readonly affiliation: number;
}
