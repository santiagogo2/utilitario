export class Caso {
    constructor(
        public id: number,
        public patients_id: number,
        public clasificacionCaso: number,
        public fechaRadicado: string,
        public numeroRadicado: number,
        public fechaNotificacion: string,
        public UPGD_id: number,
        public fuenteNotificacion: number,
        public fechaConsultaPersona: string,
        public evento: number,
        public fechaHospitalizacion: string,
        public asignacionProfesional: number,
        public fechaProfesional: string,
        public asignacionAuxiliar: number,
        public fechaAuxiliar: string,
        public IEC: number,
        public fechaIEC: string,
        public condicionIEC: number,
        public observacionIEC: string,
        public antecedenteViaje: number,
        public lugarViaje: string,
        public fuenteContagio: string,
        public estadoPersona: number,
        public estadoFinal: number,
    ){}
}