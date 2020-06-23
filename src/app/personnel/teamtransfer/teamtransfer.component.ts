import { Component, OnInit,Inject } from '@angular/core';
import { FunctionService } from '../../services/function/function.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-teamtransfer',
  templateUrl: './teamtransfer.component.html',
  styleUrls: ['./teamtransfer.component.scss']
})
export class TeamtransferComponent implements OnInit {

  message
  loading = false
  teamname
  teamuid
  managerPersonnel
  leaderPersonnel

  constructor(
    public firebaseAPI : FunctionService,
    public dialogRef: MatDialogRef<TeamtransferComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data
  ) { }

  ngOnInit(): void {
    this.team()
    this.teamuid = this.data.personnel.teamuid
  }

  team(){
    let managerI = 0
    let leaderI = 0
    this.managerPersonnel = []
    this.leaderPersonnel = []
    this.data.dataAllPersonnel.data.forEach(doc => {
      if(doc.personnel.position_id == "03"){
        this.managerPersonnel[managerI] = {
          uid:doc.id,
          name:doc.personnel.personnel_fullname.personnel_prefix+doc.personnel.personnel_fullname.personnel_firstname+" "+doc.personnel.personnel_fullname.personnel_lastname
        }
        managerI++
      }else if(doc.personnel.position_id == "04"){
        this.leaderPersonnel[leaderI] = {
          uid:doc.id,
          name:doc.personnel.personnel_fullname.personnel_prefix+doc.personnel.personnel_fullname.personnel_firstname+" "+doc.personnel.personnel_fullname.personnel_lastname
        }
        leaderI++
      }
    })

    if(this.data.personnel.positionid == "04"){
      this.teamname = this.managerPersonnel
    }else if(this.data.personnel.positionid == "05"){
      this.teamname = this.leaderPersonnel
    }
  }

  async teamtransfer(){
    this.message = ""
    this.loading = true
    let body = {
      uid:this.data.personnel.uid,
      leaderuid:this.teamuid
    }
    try {
      const res:any = await this.firebaseAPI.teamTransfer(body)
      this.dialogRef.close();
    } catch (error) {
      this.message = "ไม่สามารถบันทึกข้อมูลได้ในขณะนี้ กรุณาลองใหม่อีกครั้ง"
      this.loading = false
    }
  }
}
