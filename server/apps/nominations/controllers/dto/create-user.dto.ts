import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsBoolean, ArrayNotEmpty, ValidateNested } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUserDto {
    
    @ApiModelProperty({type: String})
    @IsNotEmpty()
    readonly firstName: string
    
    @ApiModelProperty({type: String})
    @IsNotEmpty()
    readonly lastName: string
    
    @ApiModelProperty({type: String})
    @IsNotEmpty()
    readonly role: string
    
    @ApiModelProperty({type: String})
    @IsNotEmpty()
    readonly rank: string
    
    @ApiModelProperty({type: String})
    @IsNotEmpty()
    @IsEmail()
    readonly email: string
    
    @ApiModelProperty({type: String})
    @IsNotEmpty()
    readonly phone: string
    
    @ApiModelProperty({type: Boolean})
    @IsBoolean()
    readonly active: boolean

    @ApiModelProperty({type: Number})
    @IsNotEmpty()
    @IsNumber()
    readonly nominationLimit: number

    @ApiModelProperty({type: Number})
    @IsNotEmpty()
    @IsNumber()
    readonly affiliationId: number

    @ApiModelProperty({type: Boolean})
    @IsOptional()
    readonly emailVerified: boolean

    @ApiModelProperty({type: String})
    @IsNotEmpty()
    readonly password: string

    readonly approved = true
    readonly confirmationEmail = false
}