import * as dateFns from 'date-fns';
import IDateProvider from '../models/IDateProvider';

import IAddHoursDTO from '../dtos/IAddHoursDTO';
import IIsAfterDTO from '../dtos/IIsAfterDTO';
import IDifferenceInDaysDTO from '../dtos/IDifferenceInDaysDTO';

class DateFnsDateProvider implements IDateProvider {
  public isEqual(dateLeft: Date, dateRight: Date): boolean {
    return dateFns.isEqual(dateLeft, dateRight);
  }

  public addDays(days: number): Date {
    return dateFns.addDays(Date.now(), days);
  }

  public addHours({ date, hours }: IAddHoursDTO): Date {
    const selectedDate = date || Date.now();

    return dateFns.addHours(selectedDate, hours);
  }

  public isAfter({ date, compare_date }: IIsAfterDTO): boolean {
    return dateFns.isAfter(date, compare_date);
  }

  public differenceInDays({
    laterDate,
    earlierDate,
  }: IDifferenceInDaysDTO): number {
    return dateFns.differenceInDays(laterDate, earlierDate);
  }

  public differenceInHours({
    laterDate,
    earlierDate,
  }: IDifferenceInDaysDTO): number {
    return dateFns.differenceInHours(laterDate, earlierDate);
  }
}

export default DateFnsDateProvider;
