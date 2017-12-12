import { AngularFireDatabase } from 'angularfire2/database';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AngularFireList } from 'angularfire2/database';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  courses$;
  courseList: AngularFireList<any>;
  course$;
  author$;
  subscription: Subscription;

  constructor(db: AngularFireDatabase) {
    this.courseList = db.list('/courses');
    this.courses$ = this.courseList.valueChanges();
    this.course$ = db.object('/courses/1').valueChanges();
    this.author$ = db.object('/authors/1').valueChanges();
  }

  add(course: HTMLInputElement) {
    this.courseList.push({
      name: course.value,
      price: 150,
      isLive: true,
      sections: [
        {title: 'Components'},
        {title: 'Directives'},
        {title: 'Templates'}
      ]
    });
    course.value = '';
    console.log(this.courses$);
  }
}
