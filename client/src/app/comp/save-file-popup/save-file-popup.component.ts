import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FieldExtractChoice, FieldExtractStrategy, strategies} from "../../fieldproc";
import {FormControl, FormGroup} from "@angular/forms";
import {Subject} from "rxjs";
import {BsModalRef} from "ngx-bootstrap/modal";
import {unixTimeFormat} from "../../utils";

@Component({
  selector: 'app-save-file-popup',
  templateUrl: './save-file-popup.component.html',
  styleUrls: ['./save-file-popup.component.scss']
})
export class SaveFilePopupComponent implements OnInit {

  // Inputs:
  public data: any;

  // Working data:
  form: FormGroup;

  // Outputs to parent:
  public onClose: Subject<boolean> = new Subject<boolean>();

  constructor(
    // Easiest way to pick up reference to container.
    public bsModalRef: BsModalRef,
    private cd: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
    // Compute using all strategies.
    this.form = new FormGroup({
      fileName: new FormControl(),
    });

    this.form.patchValue({fileName: unixTimeFormat()});
  }

  public onConfirm(): void {
    // Actually save the file.
    alert(this.form.value.fileName);

    this.onClose.next(true);
    this.bsModalRef.hide();
  }

  public onCancel(): void {
    this.bsModalRef.hide();
  }
}
