import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Validators } from '@angular/forms';

import { FieldConfig } from './dynamic-form/models/field-config.interface';
import { DynamicFormComponent } from './dynamic-form/containers/dynamic-form/dynamic-form.component';
import { InputTypes } from './dynamic-form/models/input.type.enum';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  styleUrls: ['app.component.scss'],  
  template: `<div class="app">
      <dynamic-form
        [config]="config"
        #form="dynamicForm"
        (submit)="submit($event)">
      </dynamic-form>
      {{ form.valid }}
      {{ form.value | json }}
    </div>
  `,
})
export class AppComponent implements AfterViewInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;

  config: FieldConfig[] = [
    {
      type: 'input',
      label: 'Full name',
      name: 'name',
      placeholder: 'Enter your name',
      validation: [Validators.required, Validators.minLength(4)]
    },
    {
      type: 'select',
      label: 'Favourite Food',
      name: 'food',
      options: ['Pizza', 'Hot Dogs', 'Knakworstje', 'Coffee'],
      placeholder: 'Select an option',
      validation: [Validators.required]
    },
    {
      label: 'Submit',
      name: 'submit',
      type: 'button'
    },
    {
      type: 'password',
      name: 'pass',
      value: 'Enter your password',
      validation: [Validators.required, Validators.minLength(5)]
    }
  ];

  ngAfterViewInit() {
    let previousValid = this.form.valid;
    this.form.changes.subscribe(() => {
      if (this.form.valid !== previousValid) {
        previousValid = this.form.valid;
        this.form.setDisabled('submit', !previousValid);
      }
    });

    this.form.setDisabled('submit', true);
    this.form.setValue('name', 'Todd Motto');
  }

  submit(value: {[name: string]: any}) {
    console.log(value);
  }
}
