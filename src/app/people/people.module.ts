import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PeopleListComponent} from './people-list/people-list.component';
import {PeopleEditComponent} from './people-edit/people-edit.component';
import {PeopleService} from './people.service';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [PeopleListComponent, PeopleEditComponent],
  providers: [PeopleService],
  exports: [PeopleListComponent, PeopleEditComponent]
})
export class PeopleModule { }

