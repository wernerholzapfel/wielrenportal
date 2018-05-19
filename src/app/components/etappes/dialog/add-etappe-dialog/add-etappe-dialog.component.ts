import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../login/login.component';

@Component({
  selector: 'app-add-etappe-dialog',
  templateUrl: './add-etappe-dialog.component.html',
  styleUrls: ['./add-etappe-dialog.component.scss']
})
export class AddEtappeDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddEtappeDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  etappeForm = new FormGroup({
    etappeNameFormControl: new FormControl('', [
      Validators.required,
    ]),
    etappeNummerFormControl: new FormControl('', [
      Validators.required,
    ]),
    dateFormControl: new FormControl('', [
      Validators.required,
    ]),
  });

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
  }

}
