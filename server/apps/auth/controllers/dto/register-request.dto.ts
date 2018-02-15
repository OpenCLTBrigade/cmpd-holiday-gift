import { ApiModelProperty } from '@nestjs/swagger';

export class RegisterRequestDto {
  @ApiModelProperty({ type: String })
  firstname: string;

  @ApiModelProperty({ type: String })
  lastname: string;

  @ApiModelProperty({ type: String })
  rank: string;

  @ApiModelProperty({ type: String })
  phone: string;

  @ApiModelProperty({ type: Number })
  affiliation: number;

  @ApiModelProperty({ type: String })
  email: string;

  @ApiModelProperty({ type: String })
  password: string;
}
