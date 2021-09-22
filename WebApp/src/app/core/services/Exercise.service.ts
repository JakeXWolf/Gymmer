import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { ServiceBase } from '../../shared/baseClasses/service-base'
import { Observable } from 'rxjs';
import { ExerciseOption } from '../models/ExerciseOption';
import { Area } from '../models/Area';
import { WorkoutCreation } from '../models/WorkoutCreation';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService extends ServiceBase {

  constructor(private _httpClient: HttpClient) {
    super(_httpClient);
  }

  getAreas(): Observable<Area[]> {
    var faketest = this.FakeGetAreas();
    var test = this.get('GetAreas');
    return test;
  }

  getWorkoutCreations(areas: Area[]): WorkoutCreation[] {
    return this.FakeGetWorkoutCreations(areas);
  }

  //#region FakeData

  FakeGetAreas(): Area[] {
    let tmp: string[] = [
      'Chest',
      'Triceps',
      'Back',
      'Biceps',
      'Legs',
      'Cardio',
      'Abs'
    ]
    let value: any = [];
    let count: number = 1;

    tmp.forEach(x => {
      let area: Area = new Area();
      area.id = count;
      area.name = x;
      value.push(area);
      count++;
    })

    return value;
  }

  FakeGetWorkoutCreations(areas: Area[]): WorkoutCreation[] {
    let exercises: any;
    let workoutCreations: WorkoutCreation[] = [];
    let value: ExerciseOption[] = [];
    let count: number = 0;

    areas.forEach(area => {
      value = [];

      switch(area.name) {
        case ('Chest'): {
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
            },
          ];

          exercises = tmpChest;
          break;
        }
        case ('Triceps'): {
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
          ];

          exercises = tmpTri;
          break;
        }
        case ('Back'): {
          let tmp = [
            {
              name: 'Row',
              equipment: ['Cable']
            },
            {
              name: 'Bent Over Row',
              equipment: ['Barbell', 'Resistance Band', 'Dumbbell', 'Cable']
            },
            {
              name: 'Lat Pulldown',
              equipment: ['Resistance Band', 'Cable']
            },
            {
              name: 'Reverse Fly',
              equipment: ['Resistance Band', 'Dumbbell', 'Cable']
            },
          ];
          
          exercises = tmp;
          break;
        }
        case ('Biceps'): {
          let tmp = [
            {
              name: 'Curl',
              equipment: ['Barbell', 'Resistance Band', 'Dumbbell', 'Cable', 'Machine']
            },
            {
              name: 'Hammer Curl',
              equipment: ['Resistance Band', 'Dumbbell', 'Cable']
            }
          ];
          
          exercises = tmp;
          break;
        }
        case ('Legs'): {
          let tmp = [
            {
              name: 'Squat',
              equipment: ['Barbell']
            },
            {
              name: 'Leg Press',
              equipment: ['Machine']
            },
            {
              name: 'Leg Extention',
              equipment: ['Machine']
            },
            {
              name: 'Hamstring Curl',
              equipment: ['Machine', 'Exercise Ball', 'Dumbbell']
            },
          ];
          
          exercises = tmp;
          break;
        }
        case ('Cardio'): {
          let tmp = [
            {
              name: 'Run',
              equipment: ['Outside', 'Treadmill']
            },
            {
              name: 'Bike',
              equipment: []
            },
          ];
          
          exercises = exercises.concat(tmp);
          break;
        }
        case ('Abs'): {
          let tmp = [
            {
              name: 'Crunch',
              equipment: ['Exercise Ball']
            },
            {
              name: 'Russian Twist',
              equipment: ['Medicine Ball', 'Plate']
            },
            {
              name: 'V-Ups',
              equipment: ['Plate', 'Dumbbell', 'Medicine Ball']
            },
          ];
          
          exercises = tmp;
          break;
        }
      }
      
      exercises.forEach(x => {
        let tmp: ExerciseOption = new ExerciseOption();
        tmp.exerciseId = count;
        tmp.areaId = area.id;
        tmp.name = x.name;
        tmp.equipment = x.equipment;
  
        value.push(tmp);
        count++;
      })

      let tmpWorkout: WorkoutCreation = new WorkoutCreation;
      tmpWorkout.selectedArea = area;
      tmpWorkout.exerciseOptions = value;

      workoutCreations.push(tmpWorkout);
    });

    return workoutCreations;
  }

  //#endregion
}