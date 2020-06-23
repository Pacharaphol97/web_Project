import { Component, OnInit,ViewChild } from '@angular/core';
import { FunctionService } from '../../services/function/function.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetailpublicrelationsComponent } from '../detailpublicrelations/detailpublicrelations.component'
import { AddpublicrelationsComponent } from '../addpublicrelations/addpublicrelations.component'
import { EditpublicrelationsComponent } from '../editpublicrelations/editpublicrelations.component'

@Component({
  selector: 'app-publicrelations',
  templateUrl: './publicrelations.component.html',
  styleUrls: ['./publicrelations.component.scss']
})
export class PublicrelationsComponent implements OnInit {

  i
  dataPublicrelations
  displayedColumns: string[] = ['id','topic','personnel','date','action'];
  dataloading = false

  constructor(
    public firebaseAPI : FunctionService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getPublicrelations()
  }

  async getPublicrelations(){
    const res:any = await this.firebaseAPI.getPublicrelations()
    const personnel:any = await this.firebaseAPI.getPersonnel()

    this.i = 0
    let personnelPost
    let Publicrelations = []

    res.data.forEach(doc => {
      personnel.data.forEach(element => {
        if(element.id == doc.PublicRelations.personnel_uid){
          personnelPost = element.personnel.personnel_fullname.personnel_prefix+element.personnel.personnel_fullname.personnel_firstname+" "+element.personnel.personnel_fullname.personnel_lastname
        }
      });

      const date = new Date(doc.PublicRelations.publicrelations_date._seconds * 1000);
      const day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date)
      const month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date)
      const year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date)
      const hour = new Intl.DateTimeFormat('en', { hour: 'numeric',hour12: false }).format(date)
      const minute = new Intl.DateTimeFormat('en', { minute: 'numeric',hour12: false }).format(date)
      Publicrelations[this.i] = {
        uid:doc.id,
        id:doc.PublicRelations.publicrelations_id,
        topic:doc.PublicRelations.publicrelations_topic,
        detail:doc.PublicRelations.publicrelations_detail,
        date:day+"/"+month+"/"+year+" , "+hour+":"+minute,
        personnel:personnelPost
      }
      this.i++
    })
    this.dataPublicrelations = new MatTableDataSource(Publicrelations);
    this.dataloading = true
  }

  add(){
    const dialogRef = this.dialog.open(AddpublicrelationsComponent, {
      width: '1000px',
      data: this.i
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPublicrelations()
    });
  }

  detail(element){
    const dialogRef = this.dialog.open(DetailpublicrelationsComponent, {
      width: '500px',
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  edit(element){
    const dialogRef = this.dialog.open(EditpublicrelationsComponent, {
      width: '1000px',
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPublicrelations()
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
    this.dataPublicrelations.paginator = this.paginator;
    this.dataPublicrelations.sort = this.sort;

    if (this.paginator && this.sort) {
      this.applyFilter('');
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataPublicrelations.filter = filterValue;
  }

}
