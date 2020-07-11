import { Component, OnInit,Inject } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FunctionService } from '../../services/function/function.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editpersonnel',
  templateUrl: './editpersonnel.component.html',
  styleUrls: ['./editpersonnel.component.scss']
})
export class EditpersonnelComponent implements OnInit {

  firstname = new FormControl(); 
  lastname = new FormControl(); 
  number = new FormControl(); 

  dataPersonnel
  message
  idPersonnel
  positionPersonnel
  emailPersonnel
  passwordPersonnel
  perfixPersonnel
  firstnamePersonnel
  lastnamePersonnel
  numberPersonnel
  loading = false

  perfix = [
    {value:"นาย"},
    {value:"นาง"},
    {value:"นางสาว"}
  ]

  position = [
    {value:"03",viewValue:"หัวหน้างาน"},
    {value:"04",viewValue:"พนักงาน"},
  ]

  constructor(
    public firebaseAPI : FunctionService,
    public router:Router,
    private activatedRoute: ActivatedRoute,
    public dialogRef: MatDialogRef<EditpersonnelComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data
  ) { }

  ngOnInit(): void {
    this.getPersonnel()
  }

  getPersonnel(){
    this.dataPersonnel = this.data
    this.idPersonnel = this.dataPersonnel.id
    this.emailPersonnel = this.dataPersonnel.email
    this.perfixPersonnel = this.dataPersonnel.perfix
    this.firstnamePersonnel = this.dataPersonnel.firstname
    this.lastnamePersonnel = this.dataPersonnel.lastname
    this.numberPersonnel = this.dataPersonnel.number
  }

  async editPersonnel(){
    this.message = ''
    this.loading = true
    var bodyeditPersonnel = {
      id:this.dataPersonnel.uid,
      perfix:this.perfixPersonnel,
      firstname:this.firstnamePersonnel,
      lastname:this.lastnamePersonnel,
      phonenumber:this.numberPersonnel
    }
    try {
      const res = await this.firebaseAPI.editPersonnel(bodyeditPersonnel)
      this.dialogRef.close();
    } catch (error) {
      this.loading = false
      this.message = "กรอกข้อมูลไม่ถูกต้อง กรุณากรอกใหม่อีกครั้ง"
    }
  }

}
