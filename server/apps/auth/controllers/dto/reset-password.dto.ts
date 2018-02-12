import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty} from 'class-validator';

export class ResetPasswordDto {
  @ApiModelProperty({type: String})
  @IsNotEmpty()
  id: string;

  @ApiModelProperty({type: String})
  @IsNotEmpty()
  confirmationCode: string;

  @ApiModelProperty({type: String})
  @IsNotEmpty()
  password: string;
};