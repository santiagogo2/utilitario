export class Contract{
	constructor(
		public id: number,
		public numero: number,
		public objetoContractual: string,
		public spendingcoordinators_id: number,
		public supervisors_id: number,
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