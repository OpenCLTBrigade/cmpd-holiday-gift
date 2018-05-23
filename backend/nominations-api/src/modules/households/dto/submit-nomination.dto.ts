import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class SubmitNominationDto {
  @ApiModelProperty({ type: String })
  @IsOptional()
  readonly reason: string = '';

  @ApiModelProperty({ type: String })
  @IsOptional()
  readonly message: string;

  @ApiModelProperty({ type: Boolean })
  @IsNotEmpty()
  readonly approved: boolean;
}
