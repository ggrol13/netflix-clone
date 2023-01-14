import { IsNumber } from 'class-validator';

export class CreateHistoryDto {}

export class CreateWatchingDto {
  @IsNumber()
  timeStamp: number;
}
