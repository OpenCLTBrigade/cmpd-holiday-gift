import { ApiModelProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @ApiModelProperty({type: String})
  email: string;

  @ApiModelProperty({type: String})
  password: string;
};