import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'localeFormat'
})
export class LocaleFormatPipe implements PipeTransform {
  transform(value: number | string | null, locale: string = 'es-CL'): string {
    if (value === null || value === undefined || isNaN(Number(value))) {
      return '-';
    }
    return `$ ${Number(value).toLocaleString(locale)}`;
  }
}
