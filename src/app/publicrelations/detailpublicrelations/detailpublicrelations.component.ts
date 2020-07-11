import { Component, OnInit,Inject } from '@angular/core';
import { FunctionService } from '../../services/function/function.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detailpublicrelations',
  templateUrl: './detailpublicrelations.component.html',
  styleUrls: ['./detailpublicrelations.component.scss']
})
export class DetailpublicrelationsComponent implements OnInit {

  constructor(
    public firebaseAPI : FunctionService,
    public dialogRef: MatDialogRef<DetailpublicrelationsComponent>,
    @Inject(MAT_DIALOG_DATA) 
    public data
  ) { }

  ngOnInit(): void {
  }

}
