import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {ClipboardService} from '../../clipboard.service';
import {TextprocService} from '../../textproc.service';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap/modal';
import {ExtractFieldComponent} from '../extract-field/extract-field.component';
import {range, smartSplit} from '../../utils';
import {fromEvent} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-reg-import',
  templateUrl: './reg-import.component.html',
  styleUrls: ['./reg-import.component.scss']
})
export class RegImportComponent implements OnInit, OnDestroy {

  bsModalRef: BsModalRef<ExtractFieldComponent>;

  procs = [];
  outputs;

  constructor(
    public clipboardService: ClipboardService,
    public textprocService: TextprocService,
    private zone: NgZone,
    private modalService: BsModalService,
  ) { }

  // Use fat-arrow function to avoid this/bind problems.
  private handleSelectionchange = (): void => {
    const selection = document.getSelection();
    const selectedText = selection.toString();
    console.log('handleSelectionchange', selectedText, selection);

    // If the new selection is empty (for example, the user just clicked somewhere
    // in the document), then there's no new selection event to emit.
    if (!selection.rangeCount || !selection.toString()) {
      return;
    }

    const rangeSel = selection.getRangeAt(0);
    const rangeContainer = this.getRangeContainer(rangeSel);
    console.log('Got container:', rangeContainer);

    const indexes = rangeContainer.getAttribute('data-row-col');
    console.log('Indexes: ', indexes);

    if (indexes) {
      const [rowIndex, colIndex] = smartSplit(indexes, '-');
      const tableHolder = this.outputs[this.outputs.length - 1];
      const table = tableHolder.table;
      const row = table[+rowIndex + 1];
      const col = row[+colIndex];

      const columns = range(1, table.length - 1).map(index => {
        const rowInner = table[index];
        return rowInner[+colIndex];
      });

      this.openModalWithComponent(col, selectedText, columns);
    }
  }

  // I get the deepest Element node in the DOM tree that contains the entire range.
  private getRangeContainer(range: Range): Element {

    let container = range.commonAncestorContainer;

    // If the selected node is a Text node, climb up to an element node - in Internet
    // Explorer, the .contains() method only works with Element nodes.
    while (container.nodeType !== Node.ELEMENT_NODE) {
      container = container.parentNode;
    }

    return container as Element;
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(
      () => {
        // document.addEventListener('selectionchange', this.handleSelectionchange, false);
        fromEvent(document, 'selectionchange').pipe(
          debounceTime(1000),
        ).subscribe(ev => {
          console.log('Event!', ev);
          this.handleSelectionchange();
        });
      }
    );
  }

  public openModalWithComponent(fullText: string, selectedText: string, columns: string[]): void {
    console.log('opening modal');
    const init: ModalOptions<ExtractFieldComponent> = {
      initialState: {
        // Set inputs.
        fullText,
        selectedText,
        columns,
      },
      class: 'modal-lg',
    };
    this.bsModalRef = this.modalService.show(ExtractFieldComponent, init);
    this.bsModalRef.content.onClose.subscribe(result => {
      console.log('Parent got result:', result);
    });
  }

  public ngOnDestroy(): void {
    document.removeEventListener('selectionchange', this.handleSelectionchange, false);
  }

  resetSteps(): void {
    this.procs = [];
    this.outputs = null;
  }

  runAllSteps(): void {
    const input = this.clipboardService.rawText;
    this.outputs = this.textprocService.runProcs(input, this.procs);
  }

  readSpreadsheet(): void {
    this.clipboardService.readSpreadsheet();
    this.resetSteps();
  }

  readSample1(): void {
    this.clipboardService.readSample1();
    this.resetSteps();
  }

  readSample2(): void {
    this.clipboardService.readSample2();
    this.resetSteps();
  }

  applyProc(procName: string): void {
    this.procs.push(procName);
    this.runAllSteps();
  }

  tryAsSpreadsheet(): void {
    this.resetSteps();
    this.procs = ['splitLines', 'splitTabs', 'displayAsTable'];
    this.runAllSteps();
  }
}
