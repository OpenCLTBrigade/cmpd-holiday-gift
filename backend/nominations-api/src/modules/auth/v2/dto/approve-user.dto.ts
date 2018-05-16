import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ApproveUserDto {
  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly uid: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly role: string;

  @ApiModelProperty({ type: Number })
  @IsNotEmpty()
  readonly nominationLimit: number;
}
