import {AfterViewInit, Component, Inject, ViewChild, ViewContainerRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogData} from "../../interfaces/dialog";


/**
 * Renders a component inside a dialog.
 * Constructor needs a "data" object of type DialogData
 */
@Component({
  selector: 'general-dialog',
  templateUrl: './general-dialog.component.html',
  styleUrls: ['./general-dialog.component.scss']
})
export class GeneralDialogComponent implements AfterViewInit {


  @ViewChild('childContainer', { read: ViewContainerRef }) childContainer!: ViewContainerRef;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<GeneralDialogComponent>,
  ) {
  }

  ngAfterViewInit(): void {
    // Creates passed component
    let component = this.childContainer.createComponent(this.data.component);
    this.data.componentData['dialogRef'] = this.dialogRef

    // Valorizes all needed properties
    for (let key in this.data.componentData) {
      (component.instance as any)[key] = this.data.componentData[key]
    }

  }

}


