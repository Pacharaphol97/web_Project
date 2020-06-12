import { Component, OnInit ,ViewChild,Inject } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { FunctionService } from '../../services/function/function.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EdittimestampComponent } from '../edittimestamp/edittimestamp.component'

export interface tableTimestamp{
  date:String,
  timestamp_in:String,
  timestamp_out:String,
}

@Component({
  selector: 'app-personneltimestamp',
  templateUrl: './personneltimestamp.component.html',
  styleUrls: ['./personneltimestamp.component.scss']
})
export class PersonneltimestampComponent implements OnInit {

  dataTimestamp:MatTableDataSource<tableTimestamp>
  displayedColumns: string[] = ['date','timestamp_in','timestamp_out','action'];
  dataloading = false

  constructor(
    public firebaseAPI : FunctionService,
    public router:Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getTimestamp()
  }

  async getTimestamp(){
    this.dataloading = false
    let dataPersonnel
    this.activatedRoute.queryParams.subscribe((params) => {
      let Personnel = params['dataPersonnel']
      dataPersonnel = JSON.parse(Personnel)
    });
    let body = {uid:dataPersonnel.uid}
    const res:any = await this.firebaseAPI.getTimestamp(body)
    let itime = 0
    let timestamp = []
    res.data.forEach(doc => {
      var formatterday = new Intl.DateTimeFormat('th', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      var formattertime = new Intl.DateTimeFormat('th', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      });
      const timestamp_in = new Date(doc.datatimestamp.timestamp_in._seconds * 1000);
      const datatimeinday = formatterday.format(timestamp_in)
      const datetimeintime = formattertime.format(timestamp_in)
      let datetimeouttime
      let timestamp_out
      try {
        timestamp_out = new Date(doc.datatimestamp.timestamp_out._seconds * 1000);
        datetimeouttime = formattertime.format(timestamp_out)
      } catch (error) {
        datetimeouttime = "ไม่มีข้อมูลเวลาออกงาน"
      }
      timestamp[itime] ={
        uid:dataPersonnel.uid,
        idtimestamp:doc.id,
        date:datatimeinday,
        timestamp_in:datetimeintime,
        timestamp_out:datetimeouttime,
        idtimestamp_in:timestamp_in,
        idtimestamp_out:timestamp_out
      }
      itime++
    });
    this.dataTimestamp = new MatTableDataSource(timestamp);
    this.dataloading = true
  }

  editTimestamp(element){
    const dialogRef = this.dialog.open(EdittimestampComponent, {
      width: '1000px',
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getTimestamp()
    });
  }

  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  setDataSourceAttributes() {
    this.dataTimestamp.paginator = this.paginator;
    this.dataTimestamp.sort = this.sort;

    if (this.paginator && this.sort) {
      this.applyFilter('');
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataTimestamp.filter = filterValue;
  }
}