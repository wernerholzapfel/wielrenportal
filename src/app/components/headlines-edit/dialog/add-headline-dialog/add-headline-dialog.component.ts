import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../login/login.component';

@Component({
  selector: 'app-add-headline-dialog',
  templateUrl: './add-headline-dialog.component.html',
  styleUrls: ['./add-headline-dialog.component.scss']
})
export class AddHeadlineDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddHeadlineDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  headlineForm = new FormGroup({
    headlineTitleFormControl: new FormControl('', [
      Validators.required,
    ]),
    headlineTextFormControl: new FormControl('', [
      Validators.required,
    ]),
  });

  matcher = new MyErrorStateMatcher();

  ngOnInit() {
  }

}
