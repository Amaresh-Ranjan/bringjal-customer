export class User {
    constructor(
        public mobile: string,
        public password: string,
        public name?: string,
        public email?: string,
        public referral?: string
    ) {}
    }