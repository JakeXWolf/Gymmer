export class Area {
    id: number;
    name: string;

    constructor() {
        this.id = this.id ? this.id : 0;
        this.name = this.name ? this.name : '';
    }
}