import { Component, OnInit } from '@angular/core';
import { DbService } from '../db.service';
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { FormBuilder } from '@angular/forms';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { WindowService } from '../window.service';
import firebase from 'firebase/compat/app';



@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  constructor(
    private db: DbService,
     private firestore: AngularFirestore,
      private formBuilder: FormBuilder,
      private auth: AngularFireAuth,
      private win: WindowService,
      ) { }

  states = ["Delhi","Maharashtra","Haryana", "Uttar Pradesh"]
  district = ["Central Delhi","North Delhi","South Delhi","East Delhi","North East Delhi","South West Delhi","New Delhi","North West Delhi","West Delhi","Shahdara","South East Delhi"]  
  taluka = ["Central Delhi","North Delhi","South Delhi","East Delhi","North East Delhi","South West Delhi","New Delhi","North West Delhi","West Delhi","Shahdara","South East Delhi"]  

  religion = ["Hinduism", "Islam", "Christianity", "Judaism", "Buddhism", "Jainism", "Sikhism"]

  caste = ["General","SC","ST","OBC"]

  maritalStatus = ["Single","Married","Widowed","Separated","Divorced"]

  userData = this.formBuilder.group({
    uid: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    gender: "",
    dob: Date,
    age: new Number,
    state: "",
    district: "",
    taluka: "",
    religion: "",
    caste: "",
    maritalStatus: "",
    EPFO: new Boolean,
    ESIC: new Boolean,
    PAI: "",
    Aadhar: new Boolean,
    yrsOfResidence: new Number
  })

  phoneNumber:any;
  otp:any;
  errors:any;
  
  verificationCode: any;
  user: any;
  verified:any;

  phoneNumberForm:any;
  

  windowRef:any;



  next(){

    //console.log(this.userData.value)

    this.userData.patchValue({
      age: this.getAge(this.userData.get('dob')!.value)
    })

    let form = document.querySelector("#userForm");

    form?.classList.add("hide");

    document.querySelector(".epfo")?.classList.remove("hide");

    document.querySelector("#quesForm")?.classList.remove("hide");

    //let data = JSON.stringify(this.userData.value); 


    /*this.firestore
    .collection("user")
    .add(this.userData.value)
    .then(function(docRef:any) {
       console.log(docRef.id);
    })
    .catch((error:any)=>{
      console.log(error);
    })*/

  }

  toEsic(input:any){

    document.querySelector(".epfo")?.classList.add("hide");
    document.querySelector(".esic")?.classList.remove("hide");

    this.userData.patchValue({
      EPFO: input
    })

  }
  
  toPai(input:any){

    document.querySelector(".esic")?.classList.add("hide");
    document.querySelector(".pai")?.classList.remove("hide");

    this.userData.patchValue({
      ESIC: input
    })

  }


  toAadhar(input:any){
    document.querySelector(".pai")?.classList.add("hide");
    document.querySelector(".aadhar")?.classList.remove("hide");

    this.userData.patchValue({
      PAI: input
    })
  }

  toYrsOfresidence(input:any){
    document.querySelector(".aadhar")?.classList.add("hide");
    document.querySelector(".yrsOfResidence")?.classList.remove("hide");

    this.userData.patchValue({
      Aadhar: input
    })
  }
  
  submitYrsOfResidence(){
    document.querySelector(".yrsOfResidence")?.classList.add("hide");
    //document.querySelector(".yrsOfresidence")?.classList.remove("hide");

    this.firestore
    .collection("user")
    .add(this.userData.value)
    .then(function(docRef:any) {
       console.log(docRef.id);
    })
    .catch((error:any)=>{
      console.log(error);
    })

  }

  getAge(dateString:any) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  } 




  ngOnInit(): void {

    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container',{
      size: "invisible"
  });

    this.windowRef.recaptchaVerifier.render();

    this.phoneNumberForm = document.querySelector("#phoneNumberForm");
    
  }

  sendLoginCode(){
    const appVerifier = this.windowRef.recaptchaVerifier;
    let num:any;
    if(this.phoneNumber.includes("+91")){
      num = this.phoneNumber;
    }
    else{
      num = "+91" + this.phoneNumber;
    }
    console.log(num);

    firebase.auth().signInWithPhoneNumber(num!,appVerifier)
            .then(result =>{
                this.windowRef.confirmationResult = result;
            })
            .catch(error =>{
              console.log(error);
              this.errors = error.message;
            })


  }


  verifyLoginCode(){
    this.verificationCode = this.otp;
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( (result:any) =>{
                    this.user = result.user;
                    console.log(this.user);

                    this.userData.patchValue({
                      phoneNumber: result.user.phoneNumber,
                      uid: result.user.uid
                    })

                    console.log(this.userData.value);
                    this.verified = true;
                    this.phoneNumberForm.classList.add("hide");
                  })
                  .catch((error:any) => {
                    console.log(error);
                    this.verified = false;
                    
                    if(error.message.includes("Firebase: The SMS verification code used to create the phone auth credential is invalid.")){
                      this.errors = "Invalid verification Code, please check the code and re-enter";
                    }
                    else{
                      this.errors = error.message;
                    }
                  })
  }

}
