import {Component, Input, OnInit} from '@angular/core';
import {HeadlinesService} from '../../services/headlines.service';
import {IHeadline} from '../../models/headline.model';
import {ITour} from '../../models/tour.model';
import {MatDialog} from '@angular/material';
import {AddHeadlineDialogComponent} from './dialog/add-headline-dialog/add-headline-dialog.component';

@Component({
  selector: 'app-headlines-edit',
  templateUrl: './headlines-edit.component.html',
  styleUrls: ['./headlines-edit.component.scss']
})
export class HeadlinesEditComponent implements OnInit {

  constructor(private headlinesService: HeadlinesService, public dialog: MatDialog) {
  }

  headlines: IHeadline[];
  @Input() selectedtour: ITour;

  ngOnInit() {
    this.headlinesService.getHeadlines(this.selectedtour.id).subscribe(headlines => this.headlines = headlines);
  }

  openAddHeadlineDialog(headline) {
    const dialogRef = this.dialog.open(AddHeadlineDialogComponent, {
      data: Object.assign({}, ...headline, {tour: this.selectedtour}),
      width: '90%'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.headlinesService.saveHeadline(result).subscribe(response => {
          const update = this.headlines.filter(item => item.id === response.id).length > 0;
          this.headlines = update ? this.headlines.map(item => {
            return item.id === response.id ? response : item;
          }) : [response, ...this.headlines];
        });
      }
    });
  }

}
