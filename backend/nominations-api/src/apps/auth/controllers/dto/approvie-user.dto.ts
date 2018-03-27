import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ApproveUserDto {
  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  id: string;
}
