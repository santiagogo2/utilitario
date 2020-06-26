export class Patient {
	constructor(
		public id: number,
		public documento: number,
		public tipoDocumento: number,
		public primerNombre: string,
		public segundoNombre: string,
		public primerApellido: string,
		public segundoApellido: string,
		public edad: number,
		public unidadMedida: number,
		public sexo: number,
		public pertenenciaEtnica: number,
		public grupoPoblacional: number,
		public direccion: string,
		public barrio: string,
		public UPZ_id: number,
		public nacionalidad: string,
		public telefono: number,
		public insurers_id: number,
		public ocupacion: number,
	){}
}