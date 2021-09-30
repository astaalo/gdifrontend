import { Component, HostListener, OnInit} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { PaginationService } from 'src/app/service/pagination.service';
import { AuthService } from 'src/app/services/auth.service';
import { SidenavService } from 'src/app/modal/sidenav/sidenav.service';
import { ModalService } from 'src/app/modal/_modal/modal.service';
import {OthersService} from '../../services/others.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  selected = 0;
  messageError;
  user: any;
  showButton = true;
  successRequest;
  selected1 = 0;
  public click: any;
  direction;
  societeId;
  filterterm: string;
  dataInterFin;
  scrHeight:any;
  scrWidth:any;
  side = false;
  lastnotif;
  currentUser;
  photo;
  dataSociete: any;
  dataCategorie: any;
  dataSite: any;
  listeFonction: any;
  dataDomaine: any;
  page = 1;
  itemParPage = 900;
  region = null;
  dataDirection: any;
  dataDepartement: any;
  donneeService: any;
  dataAgence: any;
  lastTenYear: { annee: any; }[];
  currentDate = new Date().getFullYear();
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.scrHeight = window.innerHeight;
        this.scrWidth = window.innerWidth;
        //console.log(this.scrHeight, this.scrWidth);
  }
  donneesSearch;
  moisSelect
  demandeForm: FormGroup;
  name;
  public menus: any;
  prenom;
  role;
  public reqUrl = environment.base_url;
  constructor(private http: HttpClient,
    private modalService: ModalService, 
    private sidenavService: SidenavService,
    private authService: AuthService,
    private paginationService: PaginationService,
    private otherService: OthersService,
    private route: Router) {
    this.getScreenSize(); 
    this.menus = this.paginationService.getMenu();
  }

  navigate(item, id) {
    //console.log(item.path);
    if(item.path) {
      this.sidenavService.close(id);
      this.side = false;
    }
  }

  openModal(id: string) {
    this.modalService.open(id);
    
  }

  closeModal(id: string) {
    this.modalService.close(id);
    
  }
  openSidenav(id: string) {
    this.sidenavService.open(id);
    this.side = true;
    console.log(this.menus);
    
  }

  closeSidenav(id: string) {
    this.sidenavService.close(id);
    this.side = false;
  }

  ngOnInit() {
    this.prenom = localStorage.getItem('prenom')
    this.user = localStorage.getItem('user');
    this.societeId = localStorage.getItem('societeId');
    console.log(this.user);

      if(this.user == 'INT') {
        this.showButton = false;
      } else {
        this.showButton = true;
      }
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.photo = this.currentUser.data.photo;
    this.role = localStorage.getItem('user');
    this.demandeForm = new FormGroup({
      prenom: new FormControl (''),
      nom: new FormControl(''),
      matricule: new FormControl (''),
      email: new FormControl(''),
      direction: new FormControl (''),
      departement: new FormControl(''),
      service: new FormControl (''),
      societe: new FormControl (''),
      agence: new FormControl(''),
      annee: new FormControl (''),
      poste: new FormControl(''),
    });

    this.otherService.getAllSociete().subscribe(
      data => {
        this.dataSociete = data["data"];
      }
    );
     this.otherService.getAllCategorie().subscribe(
      data => {
        this.dataCategorie = data["data"];
      }
    );
    this.otherService.listeSite(this.page, this.itemParPage, this.region).subscribe(
      data => {
        this.dataSite = data.data;
      }
    )
    this.http.get(this.reqUrl + `/listeAgence?page=${this.page}&limit=${this.itemParPage}`).subscribe((data: any) => {
      this.dataAgence =  data.data;
    })
    this.otherService.getDomaine().subscribe(data => this.dataDomaine = data["data"]);
    this.otherService.getFonctions().subscribe(data => this.listeFonction = data.data);

    this.lastTenYear = [
      {
        annee: this.currentDate
      },{
        annee: this.currentDate - 1
      },{
        annee: this.currentDate - 2
      },{
        annee: this.currentDate - 3
      },{
        annee: this.currentDate - 4
      },{
        annee: this.currentDate - 5
      },{
        annee: this.currentDate - 6
      },{
        annee: this.currentDate - 7
      },{
        annee: this.currentDate - 8
      },{
        annee: this.currentDate - 9
      },
    ];
  }

  directionsListe(value) {
    this.otherService.getAllDirection(value).subscribe(
      data => {
        this.dataDirection = data['data'];
       }
    ); 
  }

  departementListe(value) {
    this.otherService.getAllDepartement(value).subscribe(
      data => {
        this.dataDepartement = data['data'];
       }
    ); 
  }

  serviceListe(value) {
    this.otherService.getAllService(value).subscribe(
      data => {
        this.donneeService = data['data'];
       }
    ); 
  }
  

  onSubmit() {
    this.otherService.rechercheAvance(this.demandeForm.value).subscribe(
      data => {
        console.log(data);  
        this.donneesSearch = data;
        this.successRequest = this.donneesSearch.status
        if(this.successRequest == true) {
          this.closeModal('custom-modal-50')
          this.route.navigate(['/accueil/detailinter'], {
            queryParams: {
              user: JSON.stringify(this.donneesSearch['data'][0].id)
            }
          });
        } else {
          this.messageError = this.donneesSearch.message;
        }
      }
    )


    this.otherService.getLastNotification().subscribe(
      data => {
        console.log(this.lastnotif);
        if(data.data[0]){
          this.lastnotif =data.data[0].description;
        }else{
          this.lastnotif ="Aucune notification "
        }
      }
    );      
    

  }




 


  logout() {
    localStorage.removeItem("currentUse");
    localStorage.removeItem('user');
    localStorage.removeItem('prenom');
    localStorage.removeItem('token');
    this.authService.logout();
  }


redirection() {
   if(this.role == 'MNG') {
    this.direction = '/accueil/manager';
    this.click = null;
  } else if (this.role == 'AGN') {
    this.direction = '/accueil/agence';
    this.click = null;
  }else if (this.role == 'INT') {
    this.direction = '/accueil/compte';
    this.click = null;
  } 
  this.route.navigate([ this.direction])
}

  

  updown() {
    if (!this.click) {
      this.click = 1;
      return this.click;
    } else if (this.click = 1) {
      this.click = null;
      return this.click;
    }
  }
  getMargin(event) {
    let margin = 10;
    if (event.id == 1) {
      margin = 10;
    } else if (event.id == 8) {
      margin = 30;
    } else  {
      margin = 1;
    } 
    return margin;
  }

  getColor(event) {
    let color = "#ff7900";
    if (event.liste) {
      color = "white";
    }  else  {
      color = "#ff7900";
    } 
    return color;
  }



  getcolornotif(p) {
    let color = "#ff7900"
  
    if(p.lastnotif==false) {
      color = "#ff0000"
    } else {
      color = "#ff7900"
    }  
    return color; 
  } 

}
