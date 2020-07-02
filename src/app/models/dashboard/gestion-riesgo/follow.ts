export class Follow{
	constructor(
		public id: number,
		public patient_id: number,
		public tipoSeguimiento: number,
		public observaciones: string,
		public fechaSeguimiento: string,
		public horaSeguimiento: string,
		public asintomatico: number,
		public fiebre: boolean,
		public valorFiebre: string,
		public tos: boolean,
		public cefalea: boolean,
		public dificultadRespiratoria: boolean,
		public odinofagia: boolean,
		public fatiga: boolean,
		public vivo: boolean,
		public otroSintoma: boolean,
		public valorOtroSintoma: string,
		public estadoPaciente: number,
		public estadoFinal: number,
	){}
}