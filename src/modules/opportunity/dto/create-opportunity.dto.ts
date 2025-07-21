import { IsString, IsNumber, IsEnum } from 'class-validator';

export enum Status {
  in_progress = 'in_progress',
  won = 'won',
  lost = 'lost',
}

export class CreateOpportunityDto {
  @IsString()
  title: string;

  @IsNumber()
  amount: number;

  @IsEnum(Status)
  status: Status;

  @IsString()
  clientId: string;
}
