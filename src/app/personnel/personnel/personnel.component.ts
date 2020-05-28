import { Component, OnInit, ViewChild } from '@angular/core';
import { FunctionService } from '../../services/function/function.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface tablePersonnel{
  id:String,
  fullname:String
}

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {

  dataPersonnel:MatTableDataSource<tablePersonnel>
  displayedColumns: string[] = ['id','fullname'];
  dataloading = false

  constructor(
    public firebaseAPI : FunctionService
  ) { }

  ngOnInit(): void {
    this.getPersonnel()
  }

  async getPersonnel(){
    const res:any = await this.firebaseAPI.getPersonnel()
    
    let i = 0
    let Personnel = []
    res.data.forEach(doc => {
      Personnel[i] = {
        id:doc.type.personnel_id,
        perfix:doc.type.personnel_fullname.personnel_prefix,
        firstname:doc.type.personnel_fullname.personnel_firstname,
        lastname:doc.type.personnel_fullname.personnel_lastname
      }
      i++
    })
    this.dataPersonnel = new MatTableDataSource(Personnel);

    this.dataloading = true
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
