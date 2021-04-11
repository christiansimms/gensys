import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FieldExtractChoice, FieldExtractStrategy, strategies} from "../../fieldproc";
import {FormControl, FormGroup} from "@angular/forms";
import {Subject} from "rxjs";
import {BsModalRef} from "ngx-bootstrap/modal";
import {unixTimeFormat} from "../../utils";
import {HttpClient} from "@angular/common/http";
import {FlashService} from "../../reg/flash.service";

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
    private http: HttpClient,
    private flashService: FlashService,
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
    const fileName: string = this.form.value.fileName;
    const obj = {
      name: fileName,
      type: 'file',
      fields: this.data,
    };
    this.http.post('/api/data/entity', obj).subscribe(val => {
      this.flashService.tellSuccessImmediately('File saved');
    });

    this.onClose.next(true);
    this.bsModalRef.hide();
  }

  public onCancel(): void {
    this.bsModalRef.hide();
  }
}
