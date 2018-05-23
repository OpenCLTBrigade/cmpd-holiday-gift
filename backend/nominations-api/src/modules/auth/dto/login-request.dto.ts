import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  email: string;

  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  password: string;
}
