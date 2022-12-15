import { PartialType } from '@nestjs/mapped-types';
import {
  CreatePickedContentsDto,
  CreatePreferenceDto,
} from './create-preference.dto';

export class UpdatePreferenceDto extends PartialType(CreatePreferenceDto) {}

export class UpdatePickedContentsDto extends PartialType(
  CreatePickedContentsDto,
) {}
