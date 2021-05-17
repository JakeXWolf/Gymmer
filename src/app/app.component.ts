import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FilterService } from 'primeng/api';

import { Area } from './core/models/Area';
import { Exercise } from './core/models/Exercise';
import { ExerciseOption } from './core/models/ExerciseOption';
import { Workout } from './core/models/Workout';
import { WorkoutCreation } from './core/models/WorkoutCreation';

import { ExerciseService } from './core/services/Exercise.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'gymmer';
  workoutDashboards: any;
  currentWorkout: Workout = new Workout();
  
  isCreateWorkoutCard: boolean = false;
  isShowWorkoutCard: boolean = false;

  constructor(private filterService: FilterService, private exerciseService: ExerciseService) {}

  ngOnInit() {
    this.getFakeData();
  }
  
  //#region Overview
  
  onEditWorkout() {
    this.isCreateWorkoutCard = false;
    this.isShowWorkoutCard = true;
  }
  
  onCreateNewWorkout() {
    this.isShowWorkoutCard = false;
    this.isCreateWorkoutCard = true;
    this.isAreaSelection = true;
    this.isExerciseSelection = false;
    this.getAreas();
  }
  
  onOverviewCardSelection(workoutDashboard: any) {
    console.log('onOverviewCardSelection', workoutDashboard);
  }
  
  //#endregion Overview

  //#region Create Workout
  isAreaSelection: boolean = false;
  isExerciseSelection: boolean = false;

  areas: Area[] = [];
  selectedAreas: Area[] = [];
  workoutCreations: WorkoutCreation[];

  getAreas() {
    this.areas = this.exerciseService.getAreas();
  }

  onNextCreateWorkout() {
    this.workoutCreations = this.exerciseService.getWorkoutCreations(this.selectedAreas);
    this.isAreaSelection = false;
    this.isExerciseSelection = true;
  }

  //#endregion

  //#region Workout

  exerciseOptions: ExerciseOption[] = [];
  selectedExerciseOptions: ExerciseOption[] = [];
  
  chestExercises: ExerciseOption[] = [];
  tricepExercises: ExerciseOption[] = [];

  isWorkoutEditable: boolean = false;

  onAddExercise() {
    console.log('onAddExercise');
    this.currentWorkout.exercises.push(new Exercise());
  }

  //#endregion Workout

  getFakeData() {
    this.currentWorkout = new Workout();
    let tmpExercise1: Exercise = new Exercise();
    let tmpExercise2: Exercise = new Exercise();
    let tmpExercise3: Exercise = new Exercise();

    this.currentWorkout.workoutId = 1;
    this.currentWorkout.date = new Date();
    this.currentWorkout.muscleGroupHeader = 'Chest & Triceps';
    this.currentWorkout.muscleGroups = ['Chest','Triceps'];

    tmpExercise1.name = 'Bench Press';
    tmpExercise1.equipment = 'Barbell';
    tmpExercise1.sets = [
      {
        reps: 8,
        weight: 125
      },
      {
        reps: 8,
        weight: 135
      },
      {
        reps: 8,
        weight: 145
      },
    ];
    tmpExercise1.numberOfSets = 3;
    tmpExercise1.numberOfReps = 8;
    tmpExercise1.isPyramid = false;

    tmpExercise1.exerciseOption.name = tmpExercise1.name;

    this.currentWorkout.exercises.push(tmpExercise1);

    tmpExercise2.name = 'Incline Bench Press';
    tmpExercise2.equipment = 'Barbell';
    tmpExercise2.sets = [
      {
        reps: 8,
        weight: 95
      },
      {
        reps: 8,
        weight: 105
      },
      {
        reps: 8,
        weight: 115
      },
    ];
    tmpExercise2.numberOfSets = 3;
    tmpExercise2.numberOfReps = 8;
    tmpExercise2.isPyramid = false;
    
    tmpExercise2.exerciseOption.name = tmpExercise2.name;

    this.currentWorkout.exercises.push(tmpExercise2);

    tmpExercise3.name = 'Fly'
    tmpExercise3.equipment = 'Resistance Band'
    tmpExercise3.numberOfSets = 3
    tmpExercise3.numberOfReps = 15
    tmpExercise3.isPyramid = false
    tmpExercise3.sets = [
      {
        reps: 15,
        weight: 10
      },
      {
        reps: 15,
        weight: 10
      },
      {
        reps: 15,
        weight: 10
      },
    ];

    
    tmpExercise3.exerciseOption.name = tmpExercise3.name;

    this.currentWorkout.exercises.push(tmpExercise3);

    let tmpChest = [
      {
        name: 'Bench Press',
        equipment: ['Barbell', 'Dumbbell']
      },
      {
        name: 'Incline Bench Press',
        equipment: ['Barbell', 'Dumbbell']
      },
      {
        name: 'Decline Bench Press',
        equipment: ['Barbell', 'Dumbbell']
      },
      {
        name: 'Upper Fly',
        equipment: ['Resistance band', 'Dumbbell']
      },
      {
        name: 'Fly',
        equipment: ['Resistance band', 'Dumbbell']
      },
      {
        name: 'Lower Fly',
        equipment: ['Resistance band', 'Dumbbell']
      },
      {
        name: 'Standing Press',
        equipment: ['Plate']
      }
    ]

    let tmpTri = [
      {
        name: 'Tricep Pushdown',
        equipment: ['Resistance Band', 'Cable']
      },
      {
        name: 'Isolated Tricep Pushdown',
        equipment: ['Resistance Band', 'Cable']
      },
      {
        name: 'Overhead Rope Extension',
        equipment: ['Resistance Band', 'Cable']
      },
      {
        name: 'Overhead Extension',
        equipment: ['Resistance Band', 'Dumbbell', 'Cable']
      },
      {
        name: 'Kickbacks',
        equipment: ['Resistance Band', 'Dumbbell', 'Cable']
      },
      {
        name: 'Skull Crusher',
        equipment: ['EZ Bar', 'Barbell']
      },
    ]

    let count = 1;
    tmpChest.forEach(x => {
      let tmp: ExerciseOption = new ExerciseOption();
      tmp.exerciseId = count;
      tmp.areaId = 1;
      tmp.name = x.name;
      tmp.equipment = x.equipment;

      this.chestExercises.push(tmp);
      count++;
    });

    tmpTri.forEach(x => {
      let tmp: ExerciseOption = new ExerciseOption();
      tmp.exerciseId = count;
      tmp.areaId = 2;
      tmp.name = x.name;
      tmp.equipment = x.equipment;

      this.tricepExercises.push(tmp);
      count++;
    });

    this.exerciseOptions = this.chestExercises.concat(this.tricepExercises);

    this.workoutDashboards = [
      {area: 'Chest', date: 'Mon 4/20'},
      {area: 'Back', date: 'Tue 4/21'},
      {area: 'Arms', date: 'Wed 4/22'},
      {area: 'Legs', date: 'Thur 4/23'},
      {area: 'Off Day', date: 'Fri 4/24'},
      {area: 'Chest & Tri', date: 'Sat 4/25'},
      {area: 'Back & Bi', date: 'Sun 4/26'},
      {area: 'Off Day', date: 'Mon 4/27'},
    ]
  }

}
