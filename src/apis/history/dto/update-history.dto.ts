import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoryDto, CreateWatchingDto } from './create-history.dto';

export class UpdateHistoryDto extends PartialType(CreateHistoryDto) {}

export class UpdateWatchingDto extends PartialType(CreateWatchingDto) {}
