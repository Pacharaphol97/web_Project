import { Component, OnInit,Inject } from '@angular/core';
import { FunctionService } from '../../services/function/function.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addpublicrelations',
  templateUrl: './addpublicrelations.component.html',
  styleUrls: ['./addpublicrelations.component.scss']
})
export class AddpublicrelationsComponent implements OnInit {

  datenow:string = new Date().toISOString();
  message
  topic
  detail
  loading = false

  constructor(
    public firebaseAPI : FunctionService,
    public dialogRef: MatDialogRef<AddpublicrelationsComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data
  ) { }

  ngOnInit(): void {
  }

  async createPublicrelations(){
    this.loading = true
    //let test = new DOMParser().parseFromString(this.detail, "text/html").documentElement.textContent;
    let body = {
      id:this.data+1,
      uid:window.localStorage.getItem('@uid'),
      timepost:this.datenow,
      topic:this.topic,
      detail:this.detail
    }
    try {
      const res:any = await this.firebaseAPI.createPublicrelations(body)
      this.dialogRef.close();
    } catch (error) {
      this.loading = false
      this.message = "กรอกข้อมูลไม่ถูกต้อง กรุณากรอกใหม่อีกครั้ง"
    }
    
  }

}
