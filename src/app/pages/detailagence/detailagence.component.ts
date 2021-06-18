import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxFileSaverService } from '@clemox/ngx-file-saver';
import { DataService } from 'src/app/service/data.service';
import { OthersService } from 'src/app/services/others.service';
import { ModalService } from 'src/app/_modal/modal.service';

@Component({
  selector: 'app-detailagence',
  templateUrl: './detailagence.component.html',
  styleUrls: ['./detailagence.component.scss']
})
export class DetailagenceComponent implements OnInit {

  item: any;
  url1;
  url3: any;
  user;
  showupdate;
  showadduser;
  showdelete;
  id: any;
  image: any;
  dataAgence;
  agenceForm: FormGroup;
  nomUpdate; 

  viewer = 'google';
  DemoDoc="http://www.africau.edu/images/default/sample.pdf";
  DemoDoc1="https://file-examples.com/wp-content/uploads/2017/02/file-sample_100kB.doc";
  DemoDoc2="https://www.le.ac.uk/oerresources/bdra/html/resources/example.txt"; 
  
  data;
  nom;
  nomdg;
  numdg;
  email;
  mobile;
  fixe;
  siteweb;
  adresse;
  logo;
  contrat;
  cnidg;
  constructor(private activeroute: ActivatedRoute,
    private modalService: ModalService,
    private dataService: DataService,
    private fileSaver: NgxFileSaverService,
    private otherService: OthersService,
    private route: Router) { 
      this.activeroute.queryParams.subscribe(params => {
        this.item = JSON.parse(params["user"]);
        console.log(this.item);
        this.otherService.getOneAgenceById(this.item).subscribe(
          data =>{
            this.data = data;
            this.dataAgence = this.data.data;
            console.log(this.dataAgence);
            this.nom = this.dataAgence.nom;
            this.nomdg = this.dataAgence.responsable;
            this.numdg = this.dataAgence.numdg;
            this.email = this.dataAgence.email;
            this.mobile = this.dataAgence.telephone;
            this.fixe = this.dataAgence.fixe;
            this.siteweb = this.dataAgence.siteweb;
            this.adresse = this.dataAgence.adresse;
            this.logo = this.dataAgence.logo;
            //this.contrat = this.dataAgence.data.contrat;
           // this.cnidg = this.dataAgence.data.cnidg;
          },
          error =>{
            console.log(error)
          }
        );
      })
    }

  ngOnInit() {
    this.user = localStorage.getItem('user');
    if(this.user == 'agence' || this.user == 'drh') {
      this.showupdate = true;
    } else {
      this.showupdate = false;
    }
    //this.datas = this.dataService.getData();
    this.agenceForm = new FormGroup({
      nom: new FormControl(''),
      nomdg: new FormControl(''),
      numdg: new FormControl(''),
      email: new FormControl(''),
      mobile: new FormControl(''),
      fixe: new FormControl(''),
      siteweb: new FormControl(''),
      adresse: new FormControl(''),
      logo: new FormControl(''),
    //  contrat: new FormControl(''),
     // cnidg: new FormControl(''),
    });
  }

  submitted1() {
    console.log(this.dataAgence);
    console.log(this.agenceForm.value);
    const value = this.agenceForm.value;
    const info = new FormData();
    info.append("nom",value.nom);
    info.append("nomdg",value.nomdg);
    info.append("numdg",value.numdg);
    info.append("email",value.email);
    info.append("mobile",value.mobile);
    info.append("fixe",value.fixe);
    info.append("siteweb",value.siteweb);
    info.append("adresse",value.adresse);
    info.append("logo",this.logo);
    console.log(info);
    
    //info.append("contrat",value.contrat);
    //info.append("cnidg",value.cnidg);
    console.log(this.item);
    this.otherService.updateAgence(this.agenceForm.value, this.item).subscribe(
          (res) =>{
            console.log(res);
            if(res){
              this.route.navigate(['/accueil/listagence']);
            }
          },
          (error)=>{
            console.log(error);
          }
        )
    } 
    //recuperation de l'image
  getPhoto(e:any) {
    this.logo= e.files.item(0);
    let reader = new FileReader();
    reader.readAsDataURL( this.logo)
    reader.onload= ()=>{
      this.image= reader.result
    } 
  }
  public getfilemodal() {
    this.fileSaver.saveUrl(this.DemoDoc, 'contrat');
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  readUrl(event: any) {
    console.log('readUrl');
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.url1 = event.target.result;
        }
      
        reader.readAsDataURL(event.target.files[0]);
      }
  }

  readUrl1(event: any) {
    console.log('readUrl');
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
      
        reader.onload = (event: any) => {
          this.url3 = event.target.result;
        }
      
        reader.readAsDataURL(event.target.files[0]);
      }
  }

  delete() {
    this.otherService.deleteAgence(this.item).subscribe(
      (response) =>{
       console.log(response)
       if (response) {
        this.route.navigate(['/accueil/listagence']);
       }
      },
      (error)=>{
        console.log(error);
      }
    );
  }
}
