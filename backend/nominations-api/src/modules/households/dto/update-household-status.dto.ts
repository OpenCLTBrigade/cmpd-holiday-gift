import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { HouseholdStatus } from 'cmpd-common-api';

export class UpdateHouseholdStatusDto {
  @ApiModelProperty({ type: String })
  @IsNotEmpty()
  readonly status: HouseholdStatus;
}
