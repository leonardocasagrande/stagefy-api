import IAddHoursDTO from '../dtos/IAddHoursDTO';
import IDifferenceInDaysDTO from '../dtos/IDifferenceInDaysDTO';
import { IDifferenceInHoursDTO } from '../dtos/IDifferenceInHoursDTO';
import IIsAfterDTO from '../dtos/IIsAfterDTO';

export default interface IDateProvider {
  addDays(days: number): Date;
  addHours(data: IAddHoursDTO): Date;
  isAfter(data: IIsAfterDTO): boolean;
  differenceInDays({ laterDate, earlierDate }: IDifferenceInDaysDTO): number;
  differenceInHours({ laterDate, earlierDate }: IDifferenceInHoursDTO): number;
  isEqual(dateLeft: Date, dateRight: Date): boolean;
}
