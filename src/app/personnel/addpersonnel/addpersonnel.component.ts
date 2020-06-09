import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FunctionService } from '../../services/function/function.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getPersonnel()
  }

  async getPersonnel(){
    const res:any = await this.firebaseAPI.getPersonnel()
    console.log(res)
    let i = 0
    let Personnel = []
    res.data.forEach(doc => {
      Personnel[i] = {
        uid:doc.id,
        id:doc.personnel.personnel_id,
        perfix:doc.personnel.personnel_fullname.personnel_prefix,
        firstname:doc.personnel.personnel_fullname.personnel_firstname,
        lastname:doc.personnel.personnel_fullname.personnel_lastname,
        email:doc.personnel.personnel_email
      }
      i++
    })
    
  }

  async createPersonnel(){
    this.message = ''
    var bodycreatePersonnel = {
      id:this.idPersonnel,
      email:this.emailPersonnel,
      password:this.passwordPersonnel,
      prefix:this.perfixPersonnel,
      firstname:this.firstnamePersonnel,
      lastname:this.lastnamePersonnel,
      phonenumber:this.numberPersonnel,
      positionid:this.positionPersonnel
    }
    try {
      const res = await this.firebaseAPI.createPersonnel(bodycreatePersonnel)
      this.router.navigateByUrl('/personnel')
    } catch (error) {
      this.message = "กรอกข้อมูลไม่ถูกต้อง กรุณากรอกใหม่อีกครั้ง"
    }
    
  }
}
