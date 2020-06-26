import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx';

@Injectable()
export class ExportService{
	constructor(){}

	exportToExcelPlans(json: any, excelFileName: string): void{
		let objectNames = json[0];
		let objectKeys = Object.keys(json[0]);
		json.splice(0,1);

		const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json, {header: objectKeys});
		let headers = [];
		for (var key in worksheet){
			let flag = key.split('1');
			if(flag.length === 2 ) headers.push(key);
		}
		let i = 0;
		for(var key in objectNames){
			worksheet[headers[i]].v = objectNames[key];
			i++;
		}
		
		const workbook: XLSX.WorkBook = { 
			Sheets: {'data': worksheet},
			SheetNames: ['data']
		}
		const excelBuffer: any = XLSX.write(workbook, {bookType: 'xlsx', type: 'array'});

		// Llamar al metodo que guarda el fichero
		this.saveExcel(excelBuffer, excelFileName);
	}

	private saveExcel(buffer: any, fileName: string): void{
		const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
		FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXT);
	}
}