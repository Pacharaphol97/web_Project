import { Component, OnInit,Inject } from '@angular/core';
import { FunctionService } from '../../services/function/function.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-positiontransfer',
  templateUrl: './positiontransfer.component.html',
  styleUrls: ['./positiontransfer.component.scss']
})
export class PositiontransferComponent implements OnInit {

  positionPersonnel
  message
  loading = false

  position = [
    {value:"03",viewValue:"ผู้จัดการ"},
    {value:"04",viewValue:"หัวหน้างาน"},
    {value:"05",viewValue:"พนักงาน"},
  ]

  constructor(
    public firebaseAPI : FunctionService,
    public dialogRef: MatDialogRef<PositiontransferComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data
  ) { }

  ngOnInit(): void {
    this.positionPersonnel = this.data.positionid
  }

  async positiontransfer(){
    this.message = ""
    this.loading = true
    var body = {
      uid:this.data.uid,
      positionid:this.positionPersonnel
    }
    try {
      const res:any = await this.firebaseAPI.positiontransfer(body)
      this.dialogRef.close();
    } catch (error) {
      this.message = "ไม่สามารถบันทึกข้อมูลได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง"
      this.loading = false
    }
  }
}
