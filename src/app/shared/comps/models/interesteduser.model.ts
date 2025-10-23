export class Interesteduser {
    constructor(
        public name: string,
        public email: string,
        public mobile: string,
        public latitude?: number,
        public longitude?: number,
        public deliveryAreaId?: string,
        public userid?: string
    ) {}
        
}
