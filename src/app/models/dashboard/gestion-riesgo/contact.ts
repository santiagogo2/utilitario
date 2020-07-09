export class Contact {
	constructor(
		public id: number,
		public patients_id: number,
		public casoIndice: number,
		public ultimoContacto: number,
		public tipoContacto: number,
		public vinculo: number,
		public brote: number,
		public tipoBrote: number,
	){}
}