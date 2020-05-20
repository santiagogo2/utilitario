export class Contract{
	constructor(
		public id: number,
		public numero: number,
		public objetoContractual: string,
		public ordenadorGasto: number,
		public nombreSupervisor: string,
		public cargoSupervisor: string,
		public modalidad: number,
		public valorHora: number,
		public promedioHoras: number,
		public honorarios: number,
		public fechaInicio: string,
		public fechaTerminacion: string,
		public valorInicial: number,
		public CDP: number,
		public fechaCDP: string,
		public contractors_id: number,
	){}
}