import { Component, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Field } from '../../models/field.interface';
import { FieldConfig } from '../../models/field-config.interface';

@Component({
  moduleId: module.id,
  selector: 'form-input',
  styleUrls: ['form-input.component.css'],
  template: `
    <div 
      class="dynamic-field form-input" 
      [formGroup]="group">
      <label>{{ config.label }}</label>
      <div *ngIf="config.type == 'password' then passfield; else textfield"></div>
        <ng-template #passfield>
            <input
            type="password"
            [attr.value]="config.value"
            [attr.maxlength]="config.maxlength"
            [formControlName]="config.name">
        </ng-template>
        <ng-template #textfield>
            <input
            type="text"
            [attr.placeholder]="config.placeholder"
            [formControlName]="config.name">
        </ng-template>
    </div>
  `
})
export class FormInputComponent implements Field {
  config: FieldConfig;
  group: FormGroup;
}