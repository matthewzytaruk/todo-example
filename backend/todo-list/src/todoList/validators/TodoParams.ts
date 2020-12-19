import { IsNumberString, IsString, IsNotEmpty } from 'class-validator';

export class TodoParams {
  @IsNotEmpty()
  @IsNumberString()
  id: number;

  @IsNotEmpty()
  @IsString()
  token: string;
}