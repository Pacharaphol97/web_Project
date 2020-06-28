import { Component, OnInit,Inject } from '@angular/core';
import { FunctionService } from '../../services/function/function.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-deletepersonnel',
  templateUrl: './deletepersonnel.component.html',
  styleUrls: ['./deletepersonnel.component.scss']
})
export class DeletepersonnelComponent implements OnInit {

  message
  loading = false

  constructor(
    public firebaseAPI : FunctionService,
    public dialogRef: MatDialogRef<DeletepersonnelComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data
  ) { }

  ngOnInit(): void {
  }

  async accept(){
    this.message = ""
    this.loading = true
    let body = {
      uid:this.data.uid,
    }
    try {
      const res:any = await this.firebaseAPI.deletePersonnel(body)
      this.dialogRef.close();
    } catch (error) {
      this.message = "ไม่สามารถลบข้อมูลได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง"
      this.loading = false
    }
  }

}
