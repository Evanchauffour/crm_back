import { IsString, IsEmail, IsOptional } from 'class-validator';

export class CreateClientDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  company: string;

  @IsOptional()
  @IsString()
  notes?: string;
}
