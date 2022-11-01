import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { CONSTANTS } from '@firebase/util';



@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private firestore: AngularFirestore) { }

  schemes: any;
  eligibleSchemes:any = [];
  userData: any;

  ngOnInit(): void {

    this.activatedRoute.queryParams.subscribe((params) => {
      console.log(params["id"]);

        this.getUserData(params["id"]).subscribe((data)=>{
          this.userData = data;

          this.getSchemes().subscribe((data)=>{
            console.log(data);
            this.schemes = data;

            for(let scheme of this.schemes ){

              if(this.checkScheme(scheme)){
                console.log("scheme",scheme);
                this.eligibleSchemes.push(scheme);
              }
              /*for(let x in scheme){
                console.log(x, " -> ", scheme[x]);
              }*/
            }



          })



        })

        

      
    });




  }


  checkScheme(scheme:any){
    for(let x in scheme){

      if(x == "Name"){
        continue;
      }

      if(x == "age" || x == "ageOfDeceased" || x == "yrsOfResidence" || x == "FAI" || x == "percentageOfDisability" || x == "yrsOfBOCW"){
        if(scheme[x].includes(">")){
          let num = scheme[x].slice(1);
          if(this.userData[x] !> scheme[x] ){
            return false;
          }
        }
        else if(scheme[x].includes("<")){
          let num = scheme[x].slice(1);
          if(this.userData[x] !< scheme[x] ){
            return false;
          }
        }
        else if(scheme[x].includes("-")){
          let twoNum = scheme[x].split("-");
          if(  !(twoNum[0] < this.userData[x] && this.userData[x] <= twoNum[1]) ){
            return false;
          }
        }

      }
      else{
        console.log(x, scheme.Name);
        console.log(this.userData[x]);
        if(!this.userData[x].includes(scheme[x])){
          return false;
        }
      }
    }
    console.log(scheme.Name, " Came True")
    return true;
  }

  getSchemes(){
    return this.firestore
    .collection("schemeData")
    .valueChanges();
  }

  getUserData(id:any){
    return this.firestore
    .collection("user")
    .doc(id)
    .valueChanges();
  }


}
