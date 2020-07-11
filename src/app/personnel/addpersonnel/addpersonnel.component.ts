import { Component, OnInit,Inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FunctionService } from '../../services/function/function.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-addpersonnel',
  templateUrl: './addpersonnel.component.html',
  styleUrls: ['./addpersonnel.component.scss']
})
export class AddpersonnelComponent implements OnInit {

  id = new FormControl(); 
  email = new FormControl(); 
  firstname = new FormControl(); 
  lastname = new FormControl(); 
  number = new FormControl(); 

  message
  idPersonnel
  positionPersonnel
  emailPersonnel
  passwordPersonnel
  perfixPersonnel
  firstnamePersonnel
  lastnamePersonnel
  numberPersonnel
  teamuid = ""
  managerPersonnel
  leaderPersonnel
  teamname
  loading = false
  teamshow = false

  perfix = [
    {value:"นาย"},
    {value:"นาง"},
    {value:"นางสาว"}
  ]

  position = [
    {value:"03",viewValue:"ผู้จัดการ"},
    {value:"04",viewValue:"หัวหน้างาน"},
    {value:"05",viewValue:"พนักงาน"},
  ]

  constructor(
    public firebaseAPI : FunctionService,
    public router:Router ,
    private activatedRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<AddpersonnelComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data
  ) { }

  ngOnInit(): void {
    this.team()
  }

  team(){
    let managerI = 0
    let leaderI = 0
    this.managerPersonnel = []
    this.leaderPersonnel = []
    this.data.data.forEach(doc => {
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
  }

  onChange(event) {
    this.teamuid = ""
    if(event.value == "04"){
      this.teamname = this.managerPersonnel
      this.teamshow = true
    }else if(event.value == "05"){
      this.teamname = this.leaderPersonnel
      this.teamshow = true
    }else{
      this.teamshow = false
    }
  }

  async createPersonnel(){
    this.message = ''
    this.loading = true
    var bodycreatePersonnel = {
      id:this.idPersonnel,
      email:this.emailPersonnel,
      password:this.passwordPersonnel,
      prefix:this.perfixPersonnel,
      firstname:this.firstnamePersonnel,
      lastname:this.lastnamePersonnel,
      phonenumber:this.numberPersonnel,
      positionid:this.positionPersonnel,
      leaderuid:this.teamuid
    }
    try {
      const res = await this.firebaseAPI.createPersonnel(bodycreatePersonnel)
      this.dialogRef.close();
    } catch (error) {
      this.loading = false
      this.message = "กรอกข้อมูลไม่ถูกต้อง กรุณากรอกใหม่อีกครั้ง"
    }
    
  }
}
