import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class RecoveryEmailDto {
  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  email: string;
}
