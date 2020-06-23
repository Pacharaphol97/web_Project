import { Component, OnInit,ViewChild } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { FunctionService } from '../../services/function/function.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export interface tableLeave{
  
}

@Component({
  selector: 'app-personnelleave',
  templateUrl: './personnelleave.component.html',
  styleUrls: ['./personnelleave.component.scss']
})
export class PersonnelleaveComponent implements OnInit {

  dataLeave:MatTableDataSource<tableLeave>
  displayedColumns: string[] = ['type','startdata','enddata','day','status'];
  dataloading = true

  constructor(
    public firebaseAPI : FunctionService,
    public router:Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getLeave()
  }

  async getLeave(){
    this.dataloading = false
    let dataPersonnel
    this.activatedRoute.queryParams.subscribe((params) => {
      let Personnel = params['dataPersonnel']
      dataPersonnel = JSON.parse(Personnel)
    });
    let body = {uid:dataPersonnel.uid}
    const res:any = await this.firebaseAPI.getLeave(body)

    const resType:any = await this.firebaseAPI.getTypeleave()
    let typeleavename = resType.data
    
    let ileave = 0
    let leave = []
    res.data.forEach(doc => {
      var formatterday = new Intl.DateTimeFormat('th', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      let Typename = "ไม่ทราบประเภทการลางาน"
      const Typeid = doc.dataleave.type_id
      typeleavename.forEach(typename => {
        if(typename.id == Typeid){
          Typename = typename.type.type_leave
        }
      })
      const startdataiso = new Date(doc.dataleave.leave_date._seconds * 1000);
      const startdata = formatterday.format(startdataiso)
      
      const enddataiso = startdataiso.setDate(startdataiso.getDate()+(doc.dataleave.leave_number-1));
      const enddata = formatterday.format(enddataiso)

      console.log(enddataiso)
      let messagestatus
      const status = doc.dataleave.approve_status
      switch (status) {
        case true:messagestatus = "ได้รับการอนุมัติ"; break;
        case false:messagestatus = "ไม่ได้รับการอนุมัติ"; break;
        default:messagestatus = "รอการอนุมัติ";  break;
      }
      leave[ileave] = {
        type:Typename,
        day:doc.dataleave.leave_number,
        startdata:startdata,
        enddata:enddata,
        status:messagestatus,
      }
      ileave++
    })
    this.dataLeave = new MatTableDataSource(leave);
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
    this.dataLeave.paginator = this.paginator;
    this.dataLeave.sort = this.sort;

    if (this.paginator && this.sort) {
      this.applyFilter('');
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataLeave.filter = filterValue;
  }
}
