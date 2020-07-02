import { Pipe, PipeTransform } from '@angular/core';
import { global } from '../services/shared/global.service';

@Pipe({
	name: 'global'
})
export class GlobalPipe implements PipeTransform {
	transform(id: number, param: any): any{
		let result = '-';
		global[param].forEach(element => {
			if(element.id == id && element.name) {
				if(element.name) result =  element.name;
				if(element.value) result =  element.value;
			}
		})
		return result;
	}

}