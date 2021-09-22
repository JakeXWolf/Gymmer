export class ExerciseOption {
    exerciseId: number;
    name: string;
    areaId: number;
    equipment: string[];

    constructor() {
        this.exerciseId = this.exerciseId ? this.exerciseId : 0;
        this.name = this.name ? this.name : '';
        this.areaId = this.areaId ? this.areaId : 0;
        this.equipment = this.equipment ? this.equipment : [];
    }
}