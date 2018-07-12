import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class VerifyTokenDto {
  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  idToken: string;
}
