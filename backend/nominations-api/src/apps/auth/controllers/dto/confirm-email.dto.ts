import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ConfirmEmailDto {
  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  id: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  confirmationCode: string;
}
