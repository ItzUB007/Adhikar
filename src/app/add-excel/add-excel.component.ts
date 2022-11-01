import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFirestore } from "@angular/fire/compat/firestore";


import * as XLSX from 'xlsx';

@Component({
  selector: 'app-add-excel',
  templateUrl: './add-excel.component.html',
  styleUrls: ['./add-excel.component.scss']
})
export class AddExcelComponent implements OnInit {

  constructor(private storage: AngularFireStorage, private firestore: AngularFirestore) { }

  file?:any;
  arrayBuffer:any;
  filelist:any;
  schemeData:any;
  updated: any = false;


  ngOnInit(): void {

    //this.getFileList();

/*    fetch('')
  .then(res => res.blob()) // Gets the response and returns it as a blob
  .then(blob => {
    // Here's where you get access to the blob
    // And you can use it for whatever you want
    // Like calling ref().put(blob)



    // Here, I use it to make an image appear on the page
});*/

  }


  //This is where you store the file names and download url's
/*filelists:any = []

//This is the function you call (put it in ngOnInit or something of the like) to get the filenames
getFileList() {
  const ref = this.storage.ref('');
  let myurlsubscription = ref.listAll().subscribe((data) => {
    for (let i = 0; i < data.items.length; i++) {
      let name = data.items[i].name;
      let newref = this.storage.ref(data.items[i].name);
      let url = newref.getDownloadURL().subscribe((data) => {
        this.filelists.push({
          name: name,
          videolink: data
        });
        console.log(this.filelists);
      });
    }
  });
  
}*/

  addfile(event:any)     
  {    
  this.file= event.target.files[0];     
  let fileReader = new FileReader();    
  fileReader.readAsArrayBuffer(this.file);     
  fileReader.onload = (e) => {    
      this.arrayBuffer = fileReader.result;    
      var data = new Uint8Array(this.arrayBuffer);    
      var arr = new Array();    
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
      var bstr = arr.join("");    
      var workbook = XLSX.read(bstr, {type:"binary"});    
      var first_sheet_name = workbook.SheetNames[0];    
      var worksheet = workbook.Sheets[first_sheet_name];    
      console.log(XLSX.utils.sheet_to_json(worksheet,{raw:true}));    



      this.schemeData = XLSX.utils.sheet_to_json(worksheet,{raw:true});

      this.firestore.collection('schemeData').get().subscribe((querySnapshot:any) => {
        querySnapshot.docs.forEach((snapshot:any) => {
            snapshot.ref.delete();
        })




        for(let i=0; i<this.schemeData.length;i++){
          this.firestore
          .collection("schemeData")
          .add(this.schemeData[i])
          .then(function(docRef:any) {
            console.log(docRef.id);
         })
         .catch((error:any)=>{
           console.log(error);
         })

        }
        this.updated = true; 
        


    });


        var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:true});     
            this.filelist = [];    
            console.log("fileList :" ,this.filelist)    
    
  }
     
}




}
