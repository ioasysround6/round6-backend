import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageHelper } from 'src/helpers/message.helper';
import { createQueryBuilder, FindConditions, Repository } from 'typeorm';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { ToursEntity } from './tours.entity';

@Injectable()
export class ToursService {
  constructor(
    @InjectRepository(ToursEntity)
    private readonly tourRepository: Repository<ToursEntity>,
  ) {}

  async seeAllTours() {
    return await createQueryBuilder(ToursEntity, 'tours')
      .select([
        'tours.id',
        'tours.tourName',
        'tours.communityName',
        'tours.description',
        'tours.accommodation',
        'tours.activities',
        'tours.travelDate',
        'tours.hint',
        'tours.price',
        'tours.vacancies',
        'tours.photo1',
        'tours.photo2',
        'tours.photo3',
        'tours.createdAt',
        'tours.updatedAt',
      ])
      .getMany();
  }

  async seeOneTour(conditions: FindConditions<ToursEntity>) {
    try {
      await this.tourRepository.findOneOrFail(conditions);
      return await createQueryBuilder(ToursEntity, 'tours')
        .select([
          'tours.id',
          'tours.tourName',
          'tours.communityName',
          'tours.description',
          'tours.accommodation',
          'tours.activities',
          'tours.travelDate',
          'tours.hint',
          'tours.price',
          'tours.vacancies',
          'tours.photo1',
          'tours.photo2',
          'tours.photo3',
          'tours.createdAt',
          'tours.updatedAt',
        ])
        .where(conditions)
        .getOne();
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async checkTourExists(conditions: FindConditions<ToursEntity>) {
    try {
      return await this.tourRepository.findOneOrFail(conditions);
    } catch (error) {
      throw new BadRequestException(MessageHelper.UNIDENTIFIED_TOUR);
    }
  }

  async createTour(data: CreateTourDto) {
    const tour = this.tourRepository.create(data);
    return await this.tourRepository.save(tour);
  }

  async updateTour(id: string, data: UpdateTourDto) {
    try {
      const tour = await this.tourRepository.findOneOrFail({ id });
      this.tourRepository.merge(tour, data);
      await this.tourRepository.save(tour);
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }

  async deleteTour(id: string) {
    try {
      await this.tourRepository.findOneOrFail({ id });
      this.tourRepository.softDelete({ id });
    } catch (error) {
      throw new NotFoundException(MessageHelper.NOT_FOUND);
    }
  }
}
