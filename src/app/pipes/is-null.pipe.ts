import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isnull'
})
export class IsNullPipe implements PipeTransform {
	transform(text: string): any{
		if(text != undefined && text != null){
			return text;
		} else {
			return '';
		}
	}

}
