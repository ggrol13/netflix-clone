import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PreferenceService } from './preference.service';
import {
  CreatePickedContentsDto,
  CreatePreferenceDto,
} from './dto/create-preference.dto';
import {
  UpdatePickedContentsDto,
  UpdatePreferenceDto,
} from './dto/update-preference.dto';
import { PickedContentsService } from './picked-contents.service';

@Controller('preference')
export class PreferenceController {
  constructor(
    private readonly preferenceService: PreferenceService,
    private readonly pickedContentsService: PickedContentsService,
  ) {}

  @Post()
  create(@Body() createPreferenceDto: CreatePreferenceDto) {
    return this.preferenceService.create(createPreferenceDto);
  }

  @Get()
  findAll() {
    return this.preferenceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preferenceService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePreferenceDto: UpdatePreferenceDto,
  ) {
    return this.preferenceService.update(+id, updatePreferenceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.preferenceService.remove(+id);
  }

  //picked-contents
  @Post()
  createPicked(@Body() createPickedContentsDto: CreatePickedContentsDto) {
    return this.pickedContentsService.createPicked(createPickedContentsDto);
  }

  @Get()
  findAllPicked() {
    return this.pickedContentsService.findAllPicked();
  }

  @Get(':id')
  findOnePicked(@Param('id') id: string) {
    return this.pickedContentsService.findOnePicked(+id);
  }

  @Patch(':id')
  updatePicked(
    @Param('id') id: string,
    @Body() updatePickedContentsDto: UpdatePickedContentsDto,
  ) {
    return this.pickedContentsService.updatePicked(
      +id,
      updatePickedContentsDto,
    );
  }

  @Delete(':id')
  removePicked(@Param('id') id: string) {
    return this.pickedContentsService.removePicked(+id);
  }
}
