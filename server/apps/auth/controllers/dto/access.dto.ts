import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AccessDto {
  @ApiModelProperty({type: String})
  @IsNotEmpty()
  app: string;
};