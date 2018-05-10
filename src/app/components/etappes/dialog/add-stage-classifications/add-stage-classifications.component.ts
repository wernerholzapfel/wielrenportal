import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {IRider} from '../../../../models/rider.model';
import {StageclassificationsService} from '../../../../services/stageclassifications.service';
import {IStageClassification} from '../../../../models/etappe.model';

@Component({
  selector: 'app-add-stage-classifications',
  templateUrl: './add-stage-classifications.component.html',
  styleUrls: ['./add-stage-classifications.component.scss']
})
export class AddStageClassificationsComponent implements OnInit {

  constructor(private stageClassificationsService: StageclassificationsService,
              public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<AddStageClassificationsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    // todo fetch uitslag and add to data.uitslag
    this.stageClassificationsService.getStageClassifications(this.data.etappe.id).subscribe(response => {
      this.data.uitslag = response.map(item => {
        return {
          position: item.position,
          id: item.tourrider.id,
          firstName: item.tourrider.rider.firstName,
          surName: item.tourrider.rider.surName
        };
      });
    });
  }

  addPosition(element: IRider) {
    if (element.position > 0) {
      if (this.data.uitslag.find(item => item.id === element.id)) {
        this.data.uitslag = [...this.data.uitslag.filter(item => item.id !== element.id), element];
      } else {
        this.data.uitslag = [...this.data.uitslag, element];
      }
    } else {
      this.data.uitslag = [...this.data.uitslag.filter(item => item.id !== element.id)];
    }
  }

  submit(form) {
    const body: IStageClassification[] = form.uitslag.map(item => {
      return {position: item.position, tour: form.tour, etappe: form.etappe, tourrider: item};
    });
    this.stageClassificationsService.saveStageclassifications(body).subscribe(response => {
        this.dialogRef.close();
        this.snackBar.open('Het opslaan is gelukt', '', {}
        );
      },
      err => {
        this.snackBar.open(err.message);
      });
  }

  deleteRiderFromSC(itemToDelete: IRider) {
    this.data.uitslag = this.data.uitslag.filter(item =>
      item !== itemToDelete);
  }

  // todo update riders state as well.
}
