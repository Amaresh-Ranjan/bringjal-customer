import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({name: 'relativedatefuture', standalone: true})
export class RelativeFutureDatePipe implements PipeTransform {
    transform(timeValue: number): string {
        var d_nat =DateTime.fromMillis(timeValue);
        var d_format =d_nat.toFormat('hh:mm a');
            // past more than 24 hrs
            let day = d_nat.toFormat('dd/LL/yyyy');
            let final = "on"+" "+day+","+ " "+"at"+" "+ d_format;
            //console.log("final:", final);
            return final;
         
    }
}