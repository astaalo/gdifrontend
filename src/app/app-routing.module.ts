import { ListcommissionComponent } from './pages/settings/commission/listcommission/listcommission.component';
import { ModiffonctionComponent } from './pages/settings/fonction/modiffonction/modiffonction.component';
import { AjoutfonctionComponent } from './pages/settings/fonction/ajoutfonction/ajoutfonction.component';
import { ListfonctionComponent } from './pages/settings/fonction/listfonction/listfonction.component';
import { ModifdomaineComponent } from './pages/settings/domaine/modifdomaine/modifdomaine.component';
import { AjoutdomaineComponent } from './pages/settings/domaine/ajoutdomaine/ajoutdomaine.component';
import { ListdomaineComponent } from './pages/settings/domaine/listdomaine/listdomaine.component';
import { ListsiteComponent } from './pages/settings/site/listsite/listsite.component';
import { ModifsiteComponent } from './pages/settings/site/modifsite/modifsite.component';
import { AjoutsiteComponent } from './pages/settings/site/ajoutsite/ajoutsite.component';
import { DetailattestationComponent } from './pages/attestation/detailattestation/detailattestation.component';
import { StatcategorieComponent } from './pages/statistiques/statcategorie/statcategorie.component';
import { StatagenceComponent } from './pages/statistiques/statagence/statagence.component';
import { EffectifComponent } from './pages/statistiques/effectif/effectif.component';
import { PresenceComponent } from './pages/statistiques/presence/presence.component';
import { GenreComponent } from './pages/statistiques/genre/genre.component';
import { EvaluerComponent } from './pages/evaluation/evaluer/evaluer.component';
import { DetailevaluationComponent } from './pages/evaluation/detailevaluation/detailevaluation.component';
import { ListeevaluationComponent } from './pages/evaluation/listeevaluation/listeevaluation.component';
import { AddattestationComponent } from './pages/attestation/addattestation/addattestation.component';
import { ListehistoriquecontratComponent } from './pages/interimaire/listehistoriquecontrat/listehistoriquecontrat.component';
import { ListeblacklisterComponent } from './pages/users/listeblacklister/listeblacklister.component';
import { ObjectifsComponent } from './pages/evaluation/objectifs/objectifs.component';
import { LesdemandesComponent } from './pages/autres/lesdemandes/lesdemandes.component';
import { AdduserComponent } from './pages/users/adduser/adduser.component';
import { ModifierinterComponent } from './pages/interimaire/modifierinter/modifierinter.component';
import { ListeattestationComponent } from './pages/attestation/listeattestation/listeattestation.component';
import { NewinterComponent } from './pages/interimaire/newinter/newinter.component';
import { OffreComponent } from './pages/autres/offre/offre.component';
import { AgenceComponent } from './pages/agences/agence/agence.component';
import { DetailmanagerComponent } from './pages/managers/detailmanager/detailmanager.component';
import { DetailagenceComponent } from './pages/agences/detailagence/detailagence.component';
import { DetailinterComponent } from './pages/interimaire/detailinter/detailinter.component';
import { ParametreComponent } from './pages/autres/parametre/parametre.component';
import { StatistiquesComponent } from './pages/statistiques/statistiques.component';
import { AttestationpresenceComponent } from './pages/attestation/attestationpresence/attestationpresence.component';
import { AlertComponent } from './pages/autres/alert/alert.component';
import { ListermanagerComponent } from './pages/managers/listermanager/listermanager.component';
import { AddmanagerComponent } from './pages/managers/addmanager/addmanager.component';
import { AddagenceComponent } from './pages/agences/addagence/addagence.component';
import { ListeragenceComponent } from './pages/agences/listeragence/listeragence.component';
import { InterfincontratComponent } from './pages/interimaire/interfincontrat/interfincontrat.component';
import { IntersouscontratComponent } from './pages/interimaire/intersouscontrat/intersouscontrat.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layout/default/default.component';
import { LoginComponent } from './connexion/login/login.component';
import { CompteComponent } from './pages/interimaire/compte/compte.component';
import { DemandeComponent } from './pages/autres/demande/demande.component';
import { HomeComponent } from './pages/home/home.component';
import { ManagerComponent } from './pages/managers/manager/manager.component';
import { RestaurationComponent } from './pages/autres/restauration/restauration.component';
import { PasswordforgetMailComponent } from './connexion/passwordforget-mail/passwordforget-mail.component';
import { PasswordforgetComponent } from './connexion/passwordforget/passwordforget.component';
import { AddinterComponent } from './pages/interimaire/addinter/addinter.component';
import { AuthGuard } from './helpers/auth.guard';
import { InterarchiveComponent } from './pages/interimaire/interarchive/interarchive.component';
import { InterenattenteComponent } from './pages/interimaire/interenattente/interenattente.component';
import { PasswordResetComponent } from './connexion/password-reset/password-reset.component';
import { ListuserComponent } from './pages/users/listuser/listuser.component';
import { DetailuserComponent } from './pages/users/detailuser/detailuser.component';
import { ModifieruserComponent } from './pages/users/modifieruser/modifieruser.component';
import { MesObjectifsComponent } from './pages/evaluation/mes-objectifs/mes-objectifs.component';
import { MonAgenceComponent } from './pages/agences/mon-agence/mon-agence.component';
import { MonManagerComponent } from './pages/managers/mon-manager/mon-manager.component';
import { DetailcontratComponent } from './pages/interimaire/detailcontrat/detailcontrat.component';
import { AttestationmesInterimaireComponent } from './pages/attestation/attestationmesInterimaire/attestationmesInterimaire.component';
import { ModifEvaluerComponent } from './pages/evaluation/evaluer/modif-evaluer/modif-evaluer.component';
import { StatageComponent } from './pages/statistiques/statage/statage.component';
import { AjoutdirectionComponent } from './pages/settings/direction/ajoutdirection/ajoutdirection.component';
import { ListdirectionComponent } from './pages/settings/direction/listdirection/listdirection.component';
import { ModifdirectionComponent } from './pages/settings/direction/modifdirection/modifdirection.component';
import { ModifperiodeComponent } from './pages/settings/periode/modifperiode/modifperiode.component';
import { ListperiodeComponent } from './pages/settings/periode/listperiode/listperiode.component';
import { AjoutperiodeComponent } from './pages/settings/periode/ajoutperiode/ajoutperiode.component';
import { ModifprofilComponent } from './pages/settings/profil/modifprofil/modifprofil.component';
import { AjoutprofilComponent } from './pages/settings/profil/ajoutprofil/ajoutprofil.component';
import { ListprofilComponent } from './pages/settings/profil/listprofil/listprofil.component';
import { ModifsocieteComponent } from './pages/settings/societe/modifsociete/modifsociete.component';
import { ListsocieteComponent } from './pages/settings/societe/listsociete/listsociete.component';
import { AjoutsocieteComponent } from './pages/settings/societe/ajoutsociete/ajoutsociete.component';
import { ModifstructureComponent } from './pages/settings/structure/modifstructure/modifstructure.component';
import { ListstructureComponent } from './pages/settings/structure/liststructure/liststructure.component';
import { AjoutstructureComponent } from './pages/settings/structure/ajoutstructure/ajoutstructure.component';
import { AjoutcategorieComponent } from './pages/settings/categorie/ajoutcategorie/ajoutcategorie.component';
import { ModifcategorieComponent } from './pages/settings/categorie/modifcategorie/modifcategorie.component';
import { ListcategorieComponent } from './pages/settings/categorie/listcategorie/listcategorie.component';
import { AjoutcommissionComponent } from './pages/settings/commission/ajoutcommission/ajoutcommission.component';
import { ModifcommissionComponent } from './pages/settings/commission/modifcommission/modifcommission.component';
import { DomaineComponent } from './pages/statistiques/domaine/domaine.component';


const routes: Routes = [
  { 
    path: 'passwordforgetmail', 
    component: PasswordforgetMailComponent
  },
  { 
    path: 'passwordforget', 
    component: PasswordforgetComponent
  },
  { path: 'passwordreset', 
  loadChildren: () => import('src/app/connexion/password-reset/password-reset.module').then(m => m.PasswordResetModule) },
  // { path: 'passwordreset', 
  // loadChildren: 'app/password-reset/password-reset.module#PasswordResetModule' },
  // { 
  //   path: 'passwordreset', 
  //   component: PasswordResetComponent
  // },
  { 
    path: 'login', 
    component: LoginComponent
  },
  {
    path: 'accueil',
    component: DefaultComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home', 
        component: HomeComponent
      },
      { path: 'manager',
        component: ManagerComponent,
          canActivate: [AuthGuard]
      },
      { path: 'compte',
        component: CompteComponent,
          canActivate: [AuthGuard]
      },
      { path: 'demande',
        component: DemandeComponent,
          canActivate: [AuthGuard]
      },
      { path: 'restauration',
        component: RestaurationComponent,
          canActivate: [AuthGuard]
      },
      { path: 'attestationmesinterimaires',
        component: AttestationmesInterimaireComponent,
          canActivate: [AuthGuard]
      },
      { path: 'souscontrat',
        component: IntersouscontratComponent,
          canActivate: [AuthGuard]
      },
      { path: 'fincontrat',
        component: InterfincontratComponent,
          canActivate: [AuthGuard]
      },
      { path: 'interarchive',
        component: InterarchiveComponent,
        canActivate: [AuthGuard]
      },
      { path: 'interenattente',
        component: InterenattenteComponent,
        canActivate: [AuthGuard]
      },
      { path: 'addinter',
        component: AddinterComponent,
          canActivate: [AuthGuard]
      },
      { path: 'listagence',
        component: ListeragenceComponent,
         canActivate: [AuthGuard]
      },
      { path: 'ajouteragence',
        component: AddagenceComponent,
          canActivate: [AuthGuard]
      },
      { path: 'ajoutermanager',
        component: AddmanagerComponent,
          canActivate: [AuthGuard]
      },
      { path: 'listmanager',
        component: ListermanagerComponent,
          canActivate: [AuthGuard]
      },
      { path: 'alertes',
        component: AlertComponent,
          canActivate: [AuthGuard]
      },
      { path: 'attestation',
        component: AttestationpresenceComponent,
          canActivate: [AuthGuard]
      },
      { path: 'statistique',
        component: StatistiquesComponent,
          canActivate: [AuthGuard]
      },
      { path: 'parametre',
        component: ParametreComponent,
          canActivate: [AuthGuard]
      },
      { path: 'detailagence',
        component: DetailagenceComponent,
          canActivate: [AuthGuard]
      },
      { path: 'detailinter',
        component: DetailinterComponent,
          canActivate: [AuthGuard]
      },
      { path: 'detailmanager',
        component: DetailmanagerComponent,
          canActivate: [AuthGuard]
      },
      { path: 'agence',
        component: AgenceComponent,
          canActivate: [AuthGuard]
      },
      { path: 'offre',
        component: OffreComponent,
          canActivate: [AuthGuard]
      },
      { path: 'newinter',
        component: NewinterComponent,
          canActivate: [AuthGuard]
      },
      { path: 'listeattestation',
        component: ListeattestationComponent,
          canActivate: [AuthGuard]
      },
      { path: 'modifierinter',
        component: ModifierinterComponent,
          canActivate: [AuthGuard]
      },
      { path: 'adduser',
        component: AdduserComponent,
          canActivate: [AuthGuard]
      },
      { path: 'lesdemande',
        component: LesdemandesComponent,
          canActivate: [AuthGuard]
      },
      { path: 'objectif',
        component: ObjectifsComponent,
          canActivate: [AuthGuard]
      },
      { path: 'detailuser',
        component: DetailuserComponent,
          canActivate: [AuthGuard]
      },
      { path: 'listeuser',
        component: ListuserComponent,
          canActivate: [AuthGuard]
      },
      { path: 'modifieruser',
        component: ModifieruserComponent,
          canActivate: [AuthGuard]
      },
      { path: 'mesobjectif',
        component: MesObjectifsComponent,
          canActivate: [AuthGuard]
      },{ path: 'monagence',
        component: MonAgenceComponent,
        canActivate: [AuthGuard]
      },{ path: 'monmanager',
        component: MonManagerComponent,
        canActivate: [AuthGuard]
      },
      { path: 'blacklist',
        component: ListeblacklisterComponent,
          canActivate: [AuthGuard]
      },{ path: 'historiquecontrat',
        component: ListehistoriquecontratComponent,
        canActivate: [AuthGuard]
      },{ path: 'detailcontrat',
        component: DetailcontratComponent,
        canActivate: [AuthGuard]
      },{ path: 'addattestation',
       component: AddattestationComponent,
       canActivate: [AuthGuard]
      },
      { path: 'listeevaluation',
        component: ListeevaluationComponent,
          canActivate: [AuthGuard]
      },
      { path: 'detailevaluation',
        component: DetailevaluationComponent,
          canActivate: [AuthGuard]
      },
      { path: 'evaluer',
        component: EvaluerComponent,
          canActivate: [AuthGuard]
      },
      { path: 'stateffectif',
       component: EffectifComponent,
       canActivate: [AuthGuard]
      },
      { path: 'statagence',
        component: StatagenceComponent,
          canActivate: [AuthGuard]
      },
      { path: 'statgenre',
        component: GenreComponent,
          canActivate: [AuthGuard]
      },
      { path: 'statpresence',
        component: PresenceComponent,
          canActivate: [AuthGuard]
      },
      { path: 'statdomaine',
        component: DomaineComponent,
          canActivate: [AuthGuard]
      },
      { path: 'statcategorie',
        component: StatcategorieComponent,
          canActivate: [AuthGuard]
      },{ path: 'statage',
          component: StatageComponent,
          canActivate: [AuthGuard]
      },{ 
        path: 'modifevaluer',
        component: ModifEvaluerComponent,
        canActivate: [AuthGuard]
      },{ path: 'statage',
      component: StatageComponent,
        canActivate: [AuthGuard]
      },{ path: 'statcategorie',
      component: StatcategorieComponent,
        canActivate: [AuthGuard]
      },
      { path: 'deatilattestation',
        component: DetailattestationComponent,
        canActivate: [AuthGuard]
      },
      { path: 'ajoutsite',
        component: AjoutsiteComponent,
        canActivate: [AuthGuard]
      },
      { path: 'listesite',
        component: ListsiteComponent,
        canActivate: [AuthGuard]
      },
      { path: 'modifsite',
        component:ModifsiteComponent,
        canActivate: [AuthGuard]
      },
      { path: 'ajoutdomaine',
        component:AjoutdomaineComponent,
        canActivate: [AuthGuard]
      },
      { path: 'modifdomaine',
        component:ModifdomaineComponent,
        canActivate: [AuthGuard]
      },
      { path: 'listedomaine',
        component:ListdomaineComponent,
        canActivate: [AuthGuard]
      },
      { path: 'listefonction',
        component:ListfonctionComponent,
        canActivate: [AuthGuard]
      },
      { path: 'ajoutfonction',
        component:AjoutfonctionComponent,
        canActivate: [AuthGuard]
      },
      { path: 'modiffonction',
        component:ModiffonctionComponent,
        canActivate: [AuthGuard]
      },
      { path: 'ajoutcategorie',
        component:AjoutcategorieComponent,
        canActivate: [AuthGuard]
      },
      { path: 'modifcategorie',
        component:ModifcategorieComponent,
        canActivate: [AuthGuard]
      },
      { path: 'listcategorie',
        component:ListcategorieComponent,
        canActivate: [AuthGuard]
      },
      { path: 'ajoutcommission',
        component:AjoutcommissionComponent,
        canActivate: [AuthGuard]
      },
      { path: 'modifcommission',
        component:ModifcommissionComponent,
        canActivate: [AuthGuard]
      },
      { path: 'listcommission',
        component:ListcommissionComponent,
        canActivate: [AuthGuard]
      },
      { path: 'ajoutdirection',
        component:AjoutdirectionComponent,
        canActivate: [AuthGuard]
      },
      { path: 'listdirection',
        component:ListdirectionComponent,
        canActivate: [AuthGuard]
      },
      { path: 'modifdirection',
        component:ModifdirectionComponent,
        canActivate: [AuthGuard]
      },
      { path: 'ajoutstructure',
        component:AjoutstructureComponent,
        canActivate: [AuthGuard]
      },
      { path: 'liststructure',
        component:ListstructureComponent,
        canActivate: [AuthGuard]
      },
      { path: 'modifstructure',
        component:ModifstructureComponent,
        canActivate: [AuthGuard]
      },
      { path: 'ajoutsociete',
      component:AjoutsocieteComponent,
      canActivate: [AuthGuard]
    },
    { path: 'listsociete',
      component:ListsocieteComponent,
      canActivate: [AuthGuard]
    },
    { path: 'modifsociete',
      component:ModifsocieteComponent,
      canActivate: [AuthGuard]
    },
    { path: 'ajoutprofil',
    component:AjoutprofilComponent,
    canActivate: [AuthGuard]
  },
  { path: 'listprofil',
    component:ListprofilComponent,
    canActivate: [AuthGuard]
  },
  { path: 'modifprofil',
    component:ModifprofilComponent,
    canActivate: [AuthGuard]
  },
  { path: 'ajoutperiode',
  component:AjoutperiodeComponent,
  canActivate: [AuthGuard]
},
{ path: 'listperiode',
  component:ListperiodeComponent,
  canActivate: [AuthGuard]
},
{ path: 'modifperiode',
  component:ModifperiodeComponent,
  canActivate: [AuthGuard]
},
      {
        path: '',
        redirectTo: 'accueil/home',
        pathMatch: 'full'
      },
      { path: '**', redirectTo: 'accueil/home' },
    ]
  },
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
//  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
