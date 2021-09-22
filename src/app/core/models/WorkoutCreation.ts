import { Area } from "./Area";
import { ExerciseOption } from "./ExerciseOption";

export class WorkoutCreation {
    selectedArea: Area;
    exerciseOptions: ExerciseOption[];

    constructor() {
        this.selectedArea = this.selectedArea ? this.selectedArea : new Area();
        this.exerciseOptions = this.exerciseOptions ? this.exerciseOptions : [];
    }
}