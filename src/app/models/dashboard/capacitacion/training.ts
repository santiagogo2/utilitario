export class Training{
    constructor(
		public id: number,
		public fecha: string,
		public nombre: string,
		public documento: number,
		public profiles_id: number,
		public units_id: number,
		public services_id: number,
    ){}
}