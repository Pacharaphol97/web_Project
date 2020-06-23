import { Component, OnInit,Inject } from '@angular/core';
import { FunctionService } from '../../services/function/function.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editpublicrelations',
  templateUrl: './editpublicrelations.component.html',
  styleUrls: ['./editpublicrelations.component.scss']
})
export class EditpublicrelationsComponent implements OnInit {

  message
  topic
  detail
  loading = false

  constructor(
    public firebaseAPI : FunctionService,
    public dialogRef: MatDialogRef<EditpublicrelationsComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data
  ) { }

  ngOnInit(): void {
    console.log(this.data)
    this.topic = this.data.topic
    this.detail = this.data.detail
  }

  async editPublicrelations(){
    this.loading = true
    let body = {
      uid:this.data.uid,
      topic:this.topic,
      detail:this.detail
    }
    try {
      const res:any = await this.firebaseAPI.editPublicrelations(body)
      this.dialogRef.close();
    } catch (error) {
      this.loading = false
      this.message = "กรอกข้อมูลไม่ถูกต้อง กรุณากรอกใหม่อีกครั้ง"
    }
  }
}
