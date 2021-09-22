import { Exercise } from "./Exercise";
import { Area } from "./Area";
import { ExerciseOption } from "./ExerciseOption";

export class Workout {
    workoutId: number;
    date: Date;
    areaHeader: string;
    areas: Area[];
    exercises: Exercise[];

    constructor() {
        this.workoutId = this.workoutId ? this.workoutId : 0;
        this.date = this.date ? this.date : new Date();
        this.areaHeader = this.areaHeader ? this.areaHeader : '';
        this.areas = this.areas ? this.areas : [];
        this.exercises = this.exercises ? this.exercises : [];
    }

    setWorkout(areas: Area[], exerciseOptions: ExerciseOption[]) {
        this.areas = areas;
        this.setareaHeader();

        exerciseOptions.forEach(x => {
            let newExercise: Exercise = new Exercise();

            newExercise.constructExerciseOptions(x);
            newExercise.numberOfSets = 3;
            newExercise.numberOfReps = 12;
            newExercise.SetChange();
            newExercise.SetChange();
            newExercise.SetChange();
            this.exercises.push(newExercise);
        })
    }

    setareaHeader() {
        if (this.areas && this.areas.length > 0) {
            this.areaHeader = '';
            this.areas.forEach(x => {
                if (this.areaHeader.length > 0) {
                    this.areaHeader = this.areaHeader.concat(' & ');
                }
                this.areaHeader = this.areaHeader.concat(x.name);
            })
        } else {
            this.areaHeader = 'Muscle Groups Not Selected'
        }
    }
}