import { Component, OnInit, ViewChild } from '@angular/core';
import { FunctionService } from '../../services/function/function.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddpersonnelComponent } from '../addpersonnel/addpersonnel.component'
import { EditpersonnelComponent } from '../editpersonnel/editpersonnel.component'
import { PositiontransferComponent } from '../positiontransfer/positiontransfer.component'
import { TeamtransferComponent } from '../teamtransfer/teamtransfer.component'

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {

  dataPersonnel
  displayedColumns: string[] = ['id','fullname','email','number','position','teamname','status','action'];
  dataloading = false
  dataAllPersonnel
  position = [
    {value:"03",viewValue:"ผู้จัดการ"},
    {value:"04",viewValue:"หัวหน้างาน"},
    {value:"05",viewValue:"พนักงาน"},
  ]

  constructor(
    public firebaseAPI : FunctionService,
    public router:Router ,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getPersonnel()
  }

  async getPersonnel(){
    this.dataloading = false
    const res:any = await this.firebaseAPI.getPersonnel()
    this.dataAllPersonnel = res
    let i = 0
    let Personnel = []
    res.data.forEach(doc => {
      let position
      this.position.forEach(res => {
        if(doc.personnel.position_id == res.value){
          position = res.viewValue
        }
      })

      let teamname = "ไม่มีสังกัด"
      this.dataAllPersonnel.data.forEach(element => {
        if(doc.personnel.leader_uid == element.id){
          teamname = element.personnel.personnel_fullname.personnel_prefix+element.personnel.personnel_fullname.personnel_firstname+" "+element.personnel.personnel_fullname.personnel_lastname
        }
      })

      let teamcheck = true
      if(doc.personnel.position_id == "03"){
        teamcheck = false
      }

      Personnel[i] = {
        uid:doc.id,
        id:doc.personnel.personnel_id,
        perfix:doc.personnel.personnel_fullname.personnel_prefix,
        firstname:doc.personnel.personnel_fullname.personnel_firstname,
        lastname:doc.personnel.personnel_fullname.personnel_lastname,
        email:doc.personnel.personnel_email,
        number:doc.personnel.personnel_tel,
        positionid:doc.personnel.position_id,
        position:position,
        teamuid:doc.personnel.leader_uid,
        teamname:teamname,
        teamcheck:teamcheck,
        status:"ปกติ"
      }
      i++
    })
    this.dataPersonnel = new MatTableDataSource(Personnel);

    this.dataloading = true
  }

  addPersonnel(){
    const dialogRef = this.dialog.open(AddpersonnelComponent, {
      width: '800px',
      data: this.dataAllPersonnel
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPersonnel()
    });
  }

  editPersonnel(element){
    const dialogRef = this.dialog.open(EditpersonnelComponent, {
      width: '800px',
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPersonnel()
    });
  }

  positiontransfer(element){
    const dialogRef = this.dialog.open(PositiontransferComponent, {
      width: '500px',
      data: element
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPersonnel()
    });
  }

  teamtransfer(element){
    const dialogRef = this.dialog.open(TeamtransferComponent, {
      width: '500px',
      data: {dataAllPersonnel:this.dataAllPersonnel,personnel:element},
    });
    dialogRef.afterClosed().subscribe(result => {
      this.getPersonnel()
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
    this.dataPersonnel.paginator = this.paginator;
    this.dataPersonnel.sort = this.sort;

    if (this.paginator && this.sort) {
      this.applyFilter('');
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataPersonnel.filter = filterValue;
  }
}
