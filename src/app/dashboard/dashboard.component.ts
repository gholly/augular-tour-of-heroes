import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import {RxjsDemoService} from '../rxjs-demo.service';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService,
              private rxjsDemoService: RxjsDemoService) {
  }

  ngOnInit(): void {
    this.getHeroes();

    const data = this.rxjsDemoService.getData();
    console.log(data);

    this.rxjsDemoService.getCallbackData((value) => {
      console.log(value);
    });

    const promiseData = this.rxjsDemoService.getPromiseData();
    promiseData.then(value => console.log(value));

    const rxjsData = this.rxjsDemoService.getRxjsData();
    rxjsData.subscribe(value => console.log(value));

    const d = rxjsData.subscribe(value => console.log(value));

    setTimeout(() => {
      d.unsubscribe();
    }, 1000);


    const promiseInternalData = this.rxjsDemoService.getPromiseInternalData();
    promiseInternalData.then(value => console.log(value));

    // const rxjsInternalData = this.rxjsDemoService.getRxjsInternalData();
    // rxjsInternalData.subscribe(value => console.log(value));

    const stream = this.rxjsDemoService.getRxjsInternalData();
    stream.pipe(
      filter((value => {
        if (value % 2 === 0) {
          return true;
        }
      })),
      map((value) => {
        return value * value;
      })
    ).subscribe(value => console.log(value));
  }

  private getHeroes() {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes.slice(1, 5));

  }
}
