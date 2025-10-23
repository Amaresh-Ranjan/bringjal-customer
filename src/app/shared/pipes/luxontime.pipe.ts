import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({name: 'timePipe', standalone: true})
export class timePipe implements PipeTransform {
    transform(timeValue: any): string {
        var d_nat =DateTime.fromFormat(timeValue, "HH:mm");
        var d_format =d_nat.toFormat('hh:mm a');
           
            return d_format;
         
    }
}