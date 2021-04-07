import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Subject} from 'rxjs';
import {FieldExtractChoice, FieldExtractStrategy, FieldType, strategies} from "../../fieldproc";


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

  // Outputs to parent:
  public onClose: Subject<boolean> = new Subject<boolean>();

  constructor(
    // Easiest way to pick up reference to container.
    public bsModalRef: BsModalRef
  ) {
  }

  ngOnInit(): void {
    // Compute using all strategies.
    this.choices = strategies.map((strategy: FieldExtractStrategy) => {
      const computedParams = strategy.extractFunc(this.fullText, this.selectedText);
      const computedOutput = this.columns.map(col => {
        return strategy.applyFunc(col, computedParams);
      });
      return {strategy, computedParams, computedOutput};
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
