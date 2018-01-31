import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsBoolean, ArrayNotEmpty, ValidateNested } from 'class-validator';

export class CreateUserDto {
    
    @IsNotEmpty()
    readonly firstName: string
    
    @IsNotEmpty()
    readonly lastName: string
    
    @IsNotEmpty()
    readonly role: string
    
    @IsNotEmpty()
    readonly rank: string
    
    @IsNotEmpty()
    @IsEmail()
    readonly email: string
    
    @IsNotEmpty()
    readonly phone: string
    
    @IsBoolean()
    readonly active: boolean

    @IsNotEmpty()
    @IsNumber()
    readonly nominationLimit: number

    @IsNotEmpty()
    @IsNumber()
    readonly affiliationId: number

    @IsOptional()
    readonly emailVerified: boolean

    @IsNotEmpty()
    readonly password: string

    readonly approved = true
    readonly confirmationEmail = false
}