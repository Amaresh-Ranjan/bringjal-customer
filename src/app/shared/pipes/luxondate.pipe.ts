import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({name: 'relativedate', standalone: true})
export class RelativeDatePipe implements PipeTransform {
    transform(timeValue: number): string {
        var d_nat:any =DateTime.fromMillis(timeValue);
        var d_format =d_nat.toFormat('hh:mm a');
        var diff_days = DateTime.now().diff(d_nat, 'days').days;
        var bool = diff_days>1;
        if(bool){
            // past more than 24 hrs
            let day = d_nat.toFormat('dd/LL/yyyy');
            let final = "on"+" "+day+","+ " "+"at"+" "+ d_format;
            //console.log("final:", final);
            return final;
          }else{
            var diff_mins = DateTime.now().diff(d_nat, 'minutes').minutes;
            if((diff_mins > 0) || (diff_mins == 0)){
              //past or present less than one day
              let humanized:string = d_nat.toRelative();
              //console.log("human read past and present:", humanized);
              return humanized;
            }else{
              var diff_days_next = d_nat.diff(DateTime.now(), 'days').days;
              var bool_next = diff_days_next > 1;
              let day = d_nat.toFormat('dd/LL/yyyy');
              if(bool_next){
                //future after 1 days
                let final_future = "on"+" "+day+","+ " "+"at"+" "+ d_format; 
                //console.log("final_future:", final_future);
                return final_future;
              }else{
                //future within 1 day
                let humanized = d_nat.toRelativeCalendar();
                var final_format_hum = humanized + " " + d_format;
                //console.log("human read future:", final_format_hum);
                return final_format_hum;
              }
              

            }
          }
    }
}