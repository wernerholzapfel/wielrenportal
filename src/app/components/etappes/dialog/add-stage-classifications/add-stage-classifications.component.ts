import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {IRider} from '../../../../models/rider.model';
import {ClassificationsService} from '../../../../services/stageclassifications.service';
import {IStageClassification, ITourClassification} from '../../../../models/etappe.model';
import {
  ETAPPECLASSIFICATION,
  MOUNTAINCLASSIFICATION,
  TOURCLASSIFICATION,
  YOUTHCLASSIFICATION
} from '../../../../models/constants';

@Component({
  selector: 'app-add-stage-classifications',
  templateUrl: './add-stage-classifications.component.html',
  styleUrls: ['./add-stage-classifications.component.scss']
})
export class AddStageClassificationsComponent implements OnInit {

  constructor(private stageClassificationsService: ClassificationsService,
              public snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<AddStageClassificationsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  toolbartext: string;
  subtitleText: string;

  ngOnInit() {
    this.fetchData(this.data);
    this.determineText(this.data);
  }

  determineText(data) {
    switch (data.type) {
      case ETAPPECLASSIFICATION: {
        this.toolbartext = data.form.etappe.etappeName;
        this.subtitleText = 'Etappe uitslag';
        break;
      }
      case TOURCLASSIFICATION: {
        this.toolbartext = 'eindklassement';
        this.subtitleText = 'Tour uitslag';
        break;
      }
      case MOUNTAINCLASSIFICATION: {
        this.toolbartext = 'Bergklassement';
        this.subtitleText = 'Berg uitslag';
        break;
      }
      case YOUTHCLASSIFICATION: {
        this.toolbartext = 'Jongerenklassement';
        this.subtitleText = 'Jongeren uitslag';
        break;
      }
      default: {
        this.toolbartext = '';
        this.subtitleText = '';
        break;
      }
    }
  }

  fetchData(data) {
    switch (data.type) {
      case ETAPPECLASSIFICATION: {
        this.fetchEtappeClassification();
        break;
      }
      case TOURCLASSIFICATION: {
        this.fetchTourClassification();
        break;
      }
      case YOUTHCLASSIFICATION: {
        this.fetchYouthClassification();
        break;
      }
      case MOUNTAINCLASSIFICATION: {
        this.fetchMountainClassification();
        break;
      }
      default:
        console.warn('geen classification opgeslagen');
    }
  }

  private fetchEtappeClassification() {
    this.stageClassificationsService.getStageClassifications(this.data.form.etappe.id).subscribe(response => {
      this.data.form.uitslag = this.data.form.uitslag = this.transformResponseToRequest(response);
    });
  }

  private fetchTourClassification() {
    this.stageClassificationsService.getTourClassifications(this.data.form.tour.id).subscribe(response => {
      this.data.form.uitslag = this.transformResponseToRequest(response);
    });
  }

  private fetchYouthClassification() {
    this.stageClassificationsService.getYouthClassifications(this.data.form.tour.id).subscribe(response => {
      this.data.form.uitslag = this.data.form.uitslag = this.transformResponseToRequest(response);
    });
  }

  private fetchMountainClassification() {
    this.stageClassificationsService.getMountainClassifications(this.data.form.tour.id).subscribe(response => {
      this.data.form.uitslag = this.transformResponseToRequest(response);
    });
  }

  private transformResponseToRequest(response) {
    return response.map(item => {
      return {
        position: item.position,
        id: item.tourrider.id,
        firstName: item.tourrider.rider.firstName,
        surName: item.tourrider.rider.surName
      };
    });
  }

  addPosition(element: IRider) {
    if (element.position > 0) {
      if (this.data.form.uitslag.find(item => item.id === element.id)) {
        this.data.form.uitslag = [...this.data.form.uitslag.filter(item => item.id !== element.id), element];
      } else {
        this.data.form.uitslag = [...this.data.form.uitslag, element];
      }
    } else {
      this.data.form.uitslag = [...this.data.form.uitslag.filter(item => item.id !== element.id)];
    }
  }

  submit(data) {
    switch (data.type) {
      case ETAPPECLASSIFICATION: {
        this.submitEtappeClassification(data.form);
        break;
      }
      case TOURCLASSIFICATION: {
        this.submitTourClassification(data.form);
        break;
      }
      case YOUTHCLASSIFICATION: {
        this.submitYouthClassification(data.form);
        break;
      }
      case MOUNTAINCLASSIFICATION: {
        this.submitMountainClassification(data.form);
        break;
      }
      default:
        console.warn('geen classification opgeslagen');
    }
  }

  private submitTourClassification(form) {
    const body: ITourClassification[] = form.uitslag.map(item => {
      return {position: item.position, tour: form.tour, tourrider: item};
    });
    this.stageClassificationsService.saveTourclassifications(body).subscribe(response => {
        this.dialogRef.close();
        this.snackBar.open('Het opslaan is gelukt', '', {}
        );
      },
      err => {
        this.snackBar.open(err.message);
      });
  }

  private submitYouthClassification(form) {
    const body: ITourClassification[] = form.uitslag.map(item => {
      return {position: item.position, tour: form.tour, tourrider: item};
    });
    this.stageClassificationsService.saveYouthclassifications(body).subscribe(response => {
        this.dialogRef.close();
        this.snackBar.open('Het opslaan is gelukt', '', {}
        );
      },
      err => {
        this.snackBar.open(err.message);
      });
  }

  private submitMountainClassification(form) {
    const body: ITourClassification[] = form.uitslag.map(item => {
      return {position: item.position, tour: form.tour, tourrider: item};
    });
    this.stageClassificationsService.saveMountainclassifications(body).subscribe(response => {
        this.dialogRef.close();
        this.snackBar.open('Het opslaan is gelukt', '', {}
        );
      },
      err => {
        this.snackBar.open(err.message);
      });
  }

  private submitEtappeClassification(form) {
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
    this.data.form.uitslag = this.data.form.uitslag.filter(item =>
      item !== itemToDelete);
  }

  // todo update riders state as well.
}
