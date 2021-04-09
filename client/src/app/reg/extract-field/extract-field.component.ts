import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Subject} from 'rxjs';
import {FieldExtractChoice, FieldExtractStrategy, FieldType, strategies} from "../../fieldproc";
import {FormControl, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-extract-field',
  templateUrl: './extract-field.component.html',
  styleUrls: ['./extract-field.component.scss']
})
export class ExtractFieldComponent implements OnInit {

  FieldType = FieldType;

  // Inputs:
  public fullText: string;
  public selectedText: string;
  public columns: string[];

  // Working data:
  choices: FieldExtractChoice[];
  form: FormGroup;

  // Outputs to parent:
  public onClose: Subject<boolean> = new Subject<boolean>();

  constructor(
    // Easiest way to pick up reference to container.
    public bsModalRef: BsModalRef
  ) {
  }

  ngOnInit(): void {
    // Compute using all strategies.
    this.form = new FormGroup({});
    const formValues = {};
    this.choices = strategies.map((strategy: FieldExtractStrategy) => {
      const computedParams = strategy.extractFunc(this.fullText, this.selectedText);

      // Assume all names are unique across strategies.
      strategy.params.forEach(param => {
        this.form.addControl(param.name, new FormControl());
        formValues[param.name] = computedParams[param.name];
      });

      const computedOutput = this.columns.map(col => {
        return strategy.applyFunc(col, computedParams);
      });
      return {strategy, computedParams, computedOutput};
    });

    this.form.patchValue(formValues);

    this.form.valueChanges.subscribe(val => {
      console.log('value changes', val);
    });
  }

  public onConfirm(): void {
    this.onClose.next(true);
    this.bsModalRef.hide();
  }

  public onCancel(): void {
    this.bsModalRef.hide();
  }
}
