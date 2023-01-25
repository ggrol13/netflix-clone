import { IsNumber } from 'class-validator';
export class CreateWatchingDto {
  @IsNumber()
  timeStamp: number;
}
