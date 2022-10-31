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
    yrsOfResidence: new Number,
    ageOfDeceased: new Number,
    natureOfJob: "",
    natureOfJobOfDeceased: "",
    occupation: "",
    occupationOfDeceased: "",
    yrsOfResidenceParent: new Number,
    FAI: "",
    voterId: "",
    disabled: "",
    percentageOfDisability: "",
    qualification: "",
    bank: "",
    recentDeath: "",
    breadWinner: "",
    relationWithDeceased: "",
    vaccine:  new Boolean,
    firstDose: new Boolean,
    secondDose: new Boolean,
    boosterDose: new Boolean,
    BOCW: "",
    BOCWDeceased: "",
    yrsOfBOCW: new Number,
    pregnant: ""
  });

  done = false;

  questions = [
    {
      name: "EPFO",
      desc: "Are a Member of EPFO",
      isHidden: false,
      options : [
        {
          desc: "YES",
          value: "true"
        },
        {
          desc: "NO",
          value: "false",
        }
      ]
    },
    {
      name: "ESIC",
      desc: "Are a Member of ESIC",
      isHidden: true,
      options: [
        {
          desc: "YES",
          value: "true"
        },
        {
          desc: "NO",
          value: "false"
        }
      ]
    },
    {
      name: "PAI",
      desc: "What is your Personal Annual Income? (in Rupees)",
      isHidden: true,
      type: "number",
    },
    {
      name: "Aadhar",
      desc: "Do you have an Aadhar Card?",
      isHidden: true,
      options: [
        {
          desc: "YES",
          value: "true"
        },
        {
          desc: "NO",
          value: "false"
        }
      ]
    },
    {
      name: "yrsOfResidence",
      desc: "For how many years have you been living in the State?",
      isHidden: true,
      type: "number"
    },
    {
      name: "ageOfDeceased",
      desc: "What was the Age of your spouse when he/she passed away?",
      isHidden: true,
      type: "number"
    },
    {
      name: "natureOfJob",
      desc: "Nature of Job",
      isHidden: true,
      options: [
        {
          desc: "Retired",
          value: "Retired"
        },
        {
          desc: "Unemployed",
          value: "Unemployed"
        },
        {
          desc: "Working",
          value: "Working"
        },
        {
          desc: "Student",
          value: "Student"
        },
        {
          desc: "Student and Working",
          value: "Student and Working"
        },
      ]
    },
    {
      name: "natureOfJobOfDeceased",
      desc: "Nature of Job (of the deceased)?",
      isHidden: true,
      options: [
        {
          desc: "Retired",
          value: "Retired"
        },
        {
          desc: "Unemployed",
          value: "Unemployed"
        },
        {
          desc: "Working",
          value: "Working"
        },
        {
          desc: "Student",
          value: "Student"
        },
        {
          desc: "Student and Working",
          value: "Student and Working"
        },
      ]
    },
    {
      name: "occupation",
      desc: "Occupation?",
      isHidden: true,
      options: [
        {
          desc: "Unemployed",
          value: "Unemployed"
        },
        {
          desc: "Student",
          value: "Student"
        },
        {
          desc: "Construction Worker",
          value: "Construction Worker"
        },
      ]
    },
    {
      name: "occupationOfDeceased",
      desc: "Occupation (Of the deceased)?",
      isHidden: true,
      options: [
        {
          desc: "Unemployed",
          value: "Unemployed"
        },
        {
          desc: "Student",
          value: "Student"
        },
        {
          desc: "Construction Worker",
          value: "Construction Worker"
        },
      ]
    },
    {
      name: "occupationOfDeceased",
      desc: "Occupation (Of the deceased)?",
      isHidden: true,
      options: [
        {
          desc: "Unemployed",
          value: "Unemployed"
        },
        {
          desc: "Student",
          value: "Student"
        },
        {
          desc: "Construction Worker",
          value: "Construction Worker"
        },
      ]
    },
    {
      name: "yrsOfResidenceParent",
      desc: "For how many years your parents have you been living in the State?",
      isHidden: true,
      type: "number"
    },
    {
      name: "FAI",
      desc: "Family Annual Income?",
      isHidden: true,
      type: "number"
    },
    {
      name: "voterId",
      desc: "Do you have a Voter ID?",
      isHidden: true,
      options: [
        {
          desc: "YES",
          value: "true"
        },
        {
          desc: "NO",
          value: "false"
        }
      ]
    },
    {
      name: "disabled",
      desc: "Are you disabled?",
      isHidden: true,
      options: [
        {
          desc: "YES",
          value: "true"
        },
        {
          desc: "NO",
          value: "false"
        }
      ]
    },
    {
      name: "percentageOfDisability",
      desc: "Percentage of Disability?",
      isHidden: true,
      options: [
        {
          desc: "YES",
          value: "true"
        },
        {
          desc: "NO",
          value: "false"
        }
      ]
    },
    {
      name: "qualification",
      desc: "Current Educational Qualifications?",
      isHidden: true,
      options: [
        {
          desc: "Upto Class I",
          value: "Class I"
        },
        {
          desc: "Upto Class VI",
          value: "Class VI"
        },
        {
          desc: "Upto Class IX",
          value: "Class IX"
        },
        {
          desc: "Upto Class X",
          value: "Class X"
        },
        {
          desc: "Upto Class XII",
          value: "Class XII"
        },
        {
          desc: "Graduate",
          value: "Graduate"
        },
      ]
    },
    {
      name: "bank",
      desc: "Do you have a Bank Account?",
      isHidden: true,
      options: [
        {
          desc: "YES",
          value: "true"
        },
        {
          desc: "NO",
          value: "false"
        }
      ]
    },
    {
      name: "recentDeath",
      desc: "Has there been a death in the past one year in your family?",
      isHidden: true,
      options: [
        {
          desc: "YES",
          value: "true"
        },
        {
          desc: "NO",
          value: "false"
        }
      ]
    },
    {
      name: "breadWinner",
      desc: "Was the deceased the sole breadwinner of the family?",
      isHidden: true,
      options: [
        {
          desc: "YES",
          value: "true"
        },
        {
          desc: "NO",
          value: "false"
        }
      ]
    },
    {
      name: "relationWithDeceased",
      desc: "Relationship with the deceased?",
      isHidden: true,
      options: [
        {
          desc: "Father",
          value: "Father"
        },
        {
          desc: "Mother",
          value: "Mother"
        },
        {
          desc: "Son",
          value: "Son"
        },
        {
          desc: "Daughter",
          value: "Daughter"
        },
        {
          desc: "Husband",
          value: "Husband"
        },
        {
          desc: "Wife",
          value: "Wife"
        },
      ]
    },
    {
      name: "vaccine",
      desc: "Have you registered for the vaccine?",
      isHidden: true,
      options: [
        {
          desc: "YES",
          value: "true"
        },
        {
          desc: "NO",
          value: "false"
        }
      ]
    },
    {
      name: "firstDose",
      desc: "Have you been given the first dose?",
      isHidden: true,
      options: [
        {
          desc: "YES",
          value: "true"
        },
        {
          desc: "NO",
          value: "false"
        }
      ]
    },
    {
      name: "secondDose",
      desc: "Have you been given the second dose?",
      isHidden: true,
      options: [
        {
          desc: "YES",
          value: "true"
        },
        {
          desc: "NO",
          value: "false"
        }
      ]
    },
    {
      name: "boosterDose",
      desc: "Have you been given the booster dose?",
      isHidden: true,
      options: [
        {
          desc: "YES",
          value: "true"
        },
        {
          desc: "NO",
          value: "false"
        }
      ]
    },
    {
      name: "BOCW",
      desc: "Are you registered with BOCW Welfare Board?",
      isHidden: true,
      options: [
        {
          desc: "YES",
          value: "true"
        },
        {
          desc: "NO",
          value: "false"
        }
      ]
    },
    {
      name: "BOCWDeceased",
      desc: "Was the deceased registered with the BOCW Welfare Board",
      isHidden: true,
      options: [
        {
          desc: "YES",
          value: "true"
        },
        {
          desc: "NO",
          value: "false"
        }
      ]
    },
    {
      name: "yrsOfBOCW",
      desc: "How long have you been registered with BOCW Welfare Board?",
      isHidden: true,
      type: "number"
    },
    {
      name: "pregnant",
      desc: "Are you pregnant?",
      isHidden: true,
      options: [
        {
          desc: "YES",
          value: "true"
        },
        {
          desc: "NO",
          value: "false"
        }
      ]
    },


    

  ];

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
    /*if(this.userData.value.firstName && this.userData.value.lastName
      && this.userData.value.gender
      && this.userData.value.dob
      && this.userData.value.age
      && this.userData.value.state
      && this.userData.value.district
      && this.userData.value.taluka
      && this.userData.value.religion
      && this.userData.value.caste
      && this.userData.value.maritalStatus
    )
    {*/
    this.userData.patchValue({
      age: this.getAge(this.userData.get('dob')!.value)
    })

    let form = document.querySelector("#userForm");

    form?.classList.add("hide");

    //document.querySelector(".epfo")?.classList.remove("hide");

    document.querySelector("#quesForm")?.classList.remove("hide");
 // }
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

  checkLast(i:any){
    console.log(i);
    if(i+1 == this.questions.length){
      this.done = true;
    }
  }

  submitInfo(){
    console.log(this.userData.value.EPFO);
    this.firestore
    .collection("user")
    .add(this.userData.value)
    .then(function(docRef:any) {
       console.log(docRef.id);
       console.log("Submitted");
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
