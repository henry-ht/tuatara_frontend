import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';
import * as relativeTime from 'dayjs/plugin/relativeTime';



@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  constructor() {
    dayjs.extend(relativeTime);
  }

  transform(value: string, ...args: any[]): string {
    let final = "";
    switch (args[0]) {
      case 'fromNow':
        final = this.fromNow(value);
        break;

      case 'format':
          final = this.format(value, args[1]);
          break;

      default:
        final = value;
        break;
    }
    return final;
  }

  fromNow(date:string):string {
    return dayjs(date).fromNow();
  }

  format(date:string, format:string):string{
    return dayjs(date).format(format);
  }

  getDayjs(){
    return dayjs;
  }

}
