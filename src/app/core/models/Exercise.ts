import { Set } from "./Set";
import { ExerciseOption } from "./ExerciseOption";

export class Exercise extends ExerciseOption {
    selectedEquipment: string;
    sets: Set[];
    numberOfSets: number;
    numberOfReps: number;
    isPyramid: boolean;

    constructor() {
        super();

        this.selectedEquipment = this.selectedEquipment ? this.selectedEquipment : '';
        this.sets = this.sets ? this.sets : [];
        this.numberOfSets = this.numberOfSets ? this.numberOfSets : 0;
        this.numberOfReps = this.numberOfReps ? this.numberOfReps : 0;
        this.isPyramid = this.isPyramid ? this.isPyramid : false;
    }

    constructExerciseOptions(exerciseOption: ExerciseOption) {
        this.exerciseId = exerciseOption.exerciseId ? exerciseOption.exerciseId : 0;
        this.name = exerciseOption.name ? exerciseOption.name : '';
        this.areaId = exerciseOption.areaId ? exerciseOption.areaId : 0;
        this.equipment = exerciseOption.equipment ? exerciseOption.equipment : [];
    }

    RepChange() {
        if (this.sets && this.sets.length > 0) {
            this.sets.forEach(s => {s.reps = this.numberOfReps});
        }
    }

    SetChange() {
        if (this.sets.length > this.numberOfSets) {
            this.sets.pop();
        }
        else if (this.sets.length < this.numberOfSets) {
            let tmp: Set = new Set();
            tmp.reps = this.numberOfReps;
            this.sets.push(tmp);
        }
    }
}