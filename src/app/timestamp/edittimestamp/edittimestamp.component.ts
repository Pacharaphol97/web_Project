import { Component, OnInit ,Inject } from '@angular/core';
import { FunctionService } from '../../services/function/function.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edittimestamp',
  templateUrl: './edittimestamp.component.html',
  styleUrls: ['./edittimestamp.component.scss']
})
export class EdittimestampComponent implements OnInit {

  message
  dataSend
  date
  timestampin
  timestampout
  loading = false

  constructor(
    public firebaseAPI : FunctionService,
    public dialogRef: MatDialogRef<EdittimestampComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data
  ) { }

  ngOnInit(): void {
    this.getTimestamp()
  }

  getTimestamp(){
    console.log(this.data)
    this.date = this.data.date
    this.timestampin = this.data.idtimestamp_in
    this.timestampout = this.data.idtimestamp_out
  }

  async editTimestamp(){
    this.message = ''
    this.loading = true
    let body = {
      uid:this.data.uid,
      idtimestamp:this.data.idtimestamp,
      timestamp_in:this.timestampin,
      timestamp_out:this.timestampout
    }

    if(this.timestampin.getHours() <= 7 ||  this.timestampin.getHours() >= 11){
      this.message = "กำหนดเวลาไม่ถูกต้อง สามารถกำหนดช่วงเวลาเข้างานได้ระหว่าง 08:00 - 10:00"
      this.loading = false
    }else if(this.timestampout.getHours() <= 15 ||  this.timestampout.getHours() >= 18){
      this.message = "กำหนดเวลาไม่ถูกต้อง สามารถกำหนดช่วงเวลาออกงานได้ระหว่าง 16:00 - 17:00"
      this.loading = false
    }else{
      try {
        const res = await this.firebaseAPI.editTimestamp(body)
        this.dialogRef.close();
        this.loading = false
      } catch (error) {
        this.loading = false
        this.message = "ไม่สามารถบันทึกข้อมูลได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง"
      }
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
