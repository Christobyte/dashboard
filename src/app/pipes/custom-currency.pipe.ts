import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(value: Number): string {
    if (value !== undefined && value !== null) {
      value = Number(value.toFixed(2));
      let newValue = "$" + value.toString();
      return newValue.replace(/,/g, '');
    } else {
      return '';
    }
  }

}
