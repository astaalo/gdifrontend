import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  public role: any;
  public menus: any;
  public eventSources = [
    {
      id: 1, title: 'Tableau de bord',
      path: '/', icon: "home",
    },{
      id: 2, title: 'Tableau de bord drh',
      path: 'homedrh',
      icon: "home",
    },{
      id: 2, title: 'Ma Restauration',
      path: 'restauration',icon: "person",
    },{
      id: 2,  title: 'Interimaires',
      icon: "person",  icon2: "expand_more", icon3: "expand_less",
      click: 0,  activeChoice: -1,
      liste: [{
          id: 1,  title: 'Liste sous contrat',  path: '/',
        }, {
          id: 2, title: 'Liste en fin de contrat',  path: '/privacy-policy',
        },{
          id: 3,  title: 'restauration',  path: '/',
        },{
          id: 4,  title: 'Ajouter',  path: '/privacy-policy',
        },
      ]
    }, {
      id: 3,  title: 'Agence d\'interim',
      icon: "local_mall",  icon2: "expand_more",  icon3: "expand_less",
      click: false,  activeChoice: -1,
      liste: [
        {
          title: 'Liste Agence',  path: '/',
        },{
          title: 'Ajouter Agence',  path: '/privacy-policy',
        },
      ]
    },{
      id: 7,  title: 'Alertes',
      path: '/',  icon: "query_builder",
    },{
      id: 8,  title: 'Attestat',
      path: 'attestationmesinterimaires',  icon: "folder_shared",
    },{
      id: 9,  title: 'Statistiques',
      path: '/',  icon: "leaderboard",
    },{
      id: 10,  title: 'Statistiques',
      path: '/',  icon: "settings",
    },
  ];

  public internav = [
    {
      id: 1, title: 'Tableau de bord',
      path: 'home', icon: "home",
    },{
      id: 7,  title: 'Objectifs',
      path: 'mesobjectif',  icon: "done_all",
    }, {
      id: 5,  title: 'Mes Demandes',
      path: 'demande',  icon: "local_mall",
    },{
      id: 4,  title: 'Mon Manager',
      path: 'monmanager',  icon: "grade",
    },
    {
      id: 3,  title: 'Mon Agence',
      icon: "local_mall",  path: 'monagence',
      click: false,  activeChoice: -1,
    }, {
      id: 4,  title: 'Liste Attestations',
      path: 'attestation',  icon: "grade",
    },{
      id: 7,  title: 'Alertes',
      path: 'alertes',  icon: "query_builder",
    },{
      id: 8,  title: 'Mon Compte',
      path: 'compte',  icon: "folder_shared",
    },{
      id: 10,  title: 'Paramètres',
      path: 'parametre',  icon: "settings",
    },
  ];

  public drhnav = [
    {
      id: 1, title: 'Tableau de bord',
      path: 'home',
      icon: "home",
    },{
      id: 3,  title: 'Interimaires',
      icon: "person",  icon2: "expand_more", icon3: "expand_less",
      liste: [{
          id: 1,  title: 'Liste sous contrat',  path: 'souscontrat',
        }, {
          id: 2, title: 'Liste en fin de contrat',  path: 'fincontrat',
        }, {
          id: 2, title: 'Liste en attente',  path: 'interenattente',
        }, {
          id: 2, title: 'Liste archivé',  path: 'interarchive',
        }
      ]
    }, {
      id: 4,  title: 'Agence d\'interim',
      icon: "local_mall",  icon2: "expand_more",  icon3: "expand_less",
      liste: [
        {
          title: 'Liste Agence',  path: 'listagence',
        },{
          title: 'Ajouter Agence',  path: 'ajouteragence',
        }
      ]
    },{
      id: 5,  title: 'Manager',  icon: "grade",
      icon2: "expand_more",  icon3: "expand_less",
    //  click: false,  activeChoice: -1,
      liste: [  {
          title: 'Liste',  path: 'listmanager',
        }, {
          title: 'Ajouter',  path: 'ajoutermanager',
        },
      ]
    },{
      id: 5,  title: 'Liste Attestations',  icon: "grade",
      icon2: "expand_more",  icon3: "expand_less",
    //  click: false,  activeChoice: -1,
      liste: [  {
          title: 'Pour tous',  path: 'listeattestation',
        }, {
          title: 'Pour mes Interimaires',  path: 'attestationmesinterimaires',
        },
      ]
    },{
      id: 5,  title: 'Liste Restauration',
      path: 'restauration',  icon: "restaurant",
    }
    ,{
      id: 5,  title: 'Demandes',
      path: 'lesdemande',  icon: "local_mall",
    },{
      id: 11,  title: 'Liste Utilisateur',
      path: 'listeuser',  icon: "person",
    },{
      id: 6,  title: 'Alertes',
      path: 'alertes',  icon: "query_builder",
    }
    // ,{
    //   id: 9,  title: 'Statistiques',
    //   path: 'statistique',  icon: "leaderboard",
    // }
    ,{
      id: 8,  title: 'Statistiques',  icon: "grade",
      icon2: "expand_more",  icon3: "expand_less",
    //  click: false,  activeChoice: -1,
      liste: [  
        {
          title: 'Par Effectif',  path: 'stateffectif',
        }, {
          title: 'Par Genre',  path: 'statgenre',
        },{
          title: 'Par Agence',  path: 'statagence',
        }, {
          title: 'Par Présence',  path: 'statpresence',
        },{
          title: 'Par Domaine',  path: 'statdomaine',
        },{
          title: 'Par Catégorie',  path: 'statcategorie',
        },{
          title: 'Par Tranche d\'age',  path: 'statage',
        },
      ]
    },{
      id: 11,  title: 'Liste Noire',
      path: 'blacklist',  icon: "person_off",
    },{
      id: 10,  title: 'Paramètres',
      path: 'parametre',  icon: "settings",
    },

    {
      id: 11,  title: 'Settings',  icon: "settings",
      icon2: "expand_more",  icon3: "expand_less",
    //  click: false,  activeChoice: -1,
      liste: [  
        {
          title: 'Domaine',  path: 'ajoutdomaine',
        }, {
          title: 'Fonction',  path: 'ajoutfonction',
        },{
          title: 'Site',  path: 'listesite',
        }, {
          title: 'Catégorie',  path: 'ajoutcategorie',
        },{
          title: 'Comission',  path: 'ajoutcommission',
        },{
          title: 'Direction',  path: 'listdirection',
        },{
          title: 'Profil',  path: 'listprofil',
        }
        ,{
          title: 'Periode',  path: 'listperiode',
        }
        ,{
          title: 'Societe',  path: 'listsociete',
        }
        ,{
          title: 'Structure',  path: 'liststructure',
        },
      ]
    }
  ];

  public agencenav = [
    {
      id: 1, title: 'Tableau de bord',
      path: 'home',
      icon: "home",
    },{
      id: 3,  title: 'Interimaires',
      icon: "person",  icon2: "expand_more", icon3: "expand_less",
      click: 0,  activeChoice: -1,
      liste: [{
        id: 1,  title: 'Liste sous contrat',  path: 'souscontrat',
      }, {
        id: 2, title: 'Liste en fin de contrat',  path: 'fincontrat',
      }, {
        id: 2, title: 'Liste en attente',  path: 'interenattente',
      },{
        id: 4,  title: 'Ajouter',  path: 'addinter',
      },
      ]
    }, {
      id: 4,  title: 'Liste Attestations',
      path: 'attestation',  icon: "done_all",
    },{
      id: 5,  title: 'Demandes',
      path: 'lesdemande',  icon: "local_mall",
    },{
      id: 11,  title: 'Liste Utilisateur',
      path: 'listeuser',  icon: "person",
    },{
      id: 6,  title: 'Alertes',
      path: 'alertes',  icon: "query_builder",
    },{
      id: 8,  title: 'Mon Compte',
      path: 'agence',  icon: "folder_shared",
    },{
      id: 11,  title: 'Liste Noire',
      path: 'blacklist',  icon: "person_off",
    },{
      id: 10,  title: 'Paramètres',
      path: 'parametre',  icon: "settings",
    },
  ];
  
  public managernav = [
    {
      id: 1, title: 'Tableau de bord',
      path: 'home', icon: "home",
    }, {
      id: 3,  title: 'Interimaires',
      icon: "person",  icon2: "expand_more", icon3: "expand_less",
      liste: [{
          id: 1,  title: 'Liste sous contrat',  path: 'souscontrat',
        }, {
          id: 2, title: 'Liste en fin de contrat',  path: 'fincontrat',
        },
      ]
    }, {
      id: 3,  title: 'Attestation',
      icon: "done_all",  icon2: "expand_more", icon3: "expand_less",
      liste: [{
          id: 1,  title: 'Ajouter Attestation',  path: 'addattestation',
        }, {
          id: 2, title: 'Liste Attestations',  path: 'listeattestation',
        },
      ]
    }
    ,{
      id: 3,  title: 'Agence d\'interim',
      icon: "local_mall",  path: 'listagence',
    },{
      id: 5,  title: 'Demandes',
      path: 'lesdemande',  icon: "local_mall",
    },{
      id: 6,  title: 'Alertes',
      path: 'alertes',  icon: "query_builder",
    }
    ,{
      id: 8,  title: 'Mon Compte',
      path: 'manager',  icon: "folder_shared",
    },{
      id: 10,  title: 'Paramètres',
      path: 'parametre',  icon: "settings",
    },
  ];
  private videos = [
    {
      id: 1,
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
      subtitle: "By Google",
      thumb: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerEscapes.jpg",
      title: "For Bigger Escape",
      img: "idole2.jpg"
    },
    {
      id: 2,
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
      subtitle: "By Google",
      thumb: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerFun.jpg",
      title: "For Bigger Fun",
      img: "karma1.jpg"
    },
    {
      id: 3,
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      subtitle: "By Google",
      thumb: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ForBiggerBlazes.jpg",
      title: "For Bigger Blazes",
      img: "karma1.jpg"
    }
  ];

  public getVidoes() {
    return this.videos;
  }
  constructor() { }

  getMenu() {
    this.role = localStorage.getItem('user')
    if(this.role == "INT") {
      this.menus = this.internav;
    } else if(this.role == "DRH") {
      this.menus = this.drhnav;
    } else if(this.role == "AGN") {
      this.menus = this.agencenav;
    } else if(this.role == "MNG") {
      this.menus = this.managernav;
    }else if(this.role == "ASTDG") {
      this.menus = this.agencenav;
    } else if(this.role == "DRHAG") {
      this.menus = this.agencenav;
    } else {
      this.menus = this.eventSources
    }
    return this.menus;
  }
  
}
