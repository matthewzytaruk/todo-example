import { IsString, IsNotEmpty } from 'class-validator';

export class TokenOnlyParam {

  @IsNotEmpty()
  @IsString()
  token: string;
}