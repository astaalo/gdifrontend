import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OthersService {
  public reqUrl = environment.base_url;
  constructor(private http: HttpClient) { }

// recupere la liste des interimaire sous contrat
  getInterSousContrat(): Observable<any> {
    return this.http.get<any>(this.reqUrl + '/interimSousContrat');
  }
  // recupere la liste des users 
  getUsersAll(): Observable<any> {
    return this.http.get<any>(this.reqUrl + '/users/all');
  }
  // recupere la liste des interimaire fin de contrat
  getInter(): Observable<any> {
    return this.http.get<any>(this.reqUrl + '/interimFinContrat');
  }
  getInterEnAttente(): Observable<any> {
    return this.http.get<any>(this.reqUrl + '/interimEnAttente');
  }
  // recupere la liste des noueveaux recrus
  getNouveauRecrus(): Observable<any> {
    return this.http.get<any>(this.reqUrl + '/interimaires/dernierrecrues?page=1');
  }

  // recupere la liste des manager
  getListManager(): Observable<any> {
    return this.http.get<any>(this.reqUrl + '/managers/list');
  } 
  // details manager
  getDetailsManagerById(id: number) {
    return this.http.get(this.reqUrl + `/manager/${id}`);
  }
  //liste des demandes
  getListDemandes(): Observable<any> {
    return this.http.get<any>(this.reqUrl + '/listeDemandes');
  }
  // recupere la liste des agences
  getListAgence(): Observable<any> {
    return this.http.get<any>(this.reqUrl + '/listeAgence');
  }
   // recupere les details d'une agence
  getOneAgenceById(id: number) {
    return this.http.get(this.reqUrl + `/detailAgence/${id}`);
  }
   // recupere les details d'une agence
   getOneManagerById(id: number) {
    return this.http.get(this.reqUrl + `/lasnotifAgence/${id}`);
  }
  // recupere les lasnotifs d'un interimaire
  getOneInterById(id: number) {
    return this.http.get(this.reqUrl + `/interimaire/${id}`);
  }
 // recupere le liste des attestation
 getListAttest(): Observable<any> {
  return this.http.get<any>(this.reqUrl + '/listeAttestationByMonth');
}
//updateUser(user, id: number): Observable<any> {
  //return this.http.put<any>(`${this.reqUrl}/users/update/${id}`, user);
//}
getAllUser() {
  return this.http.get(`${this.reqUrl}/users/all`);
}
deleteUser(id: number): Observable<any> {
  return this.http.delete<any>(`${this.reqUrl}/users/update/${id}`);
}
addAgence(data) {
    return this.http.post<any>(`${this.reqUrl}/ajoutAgence`, data);
  }
  updateAgence(data:any, id: number): Observable<any> {
    return this.http.post<any>(`${this.reqUrl}/updateAgence/${id}`, data);
  }
  updateInter(data:any, id: number): Observable<any> {
    return this.http.post<any>(`${this.reqUrl}/updateInterimaire/${id}`, data);
  }
  getAgenceById(id: number): Observable<any> {
    return this.http.get<any>(`${this.reqUrl}/lasnotifAgence/${id}`);
  }
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.reqUrl}/users/${id}`);
  }
  delete(id: string) {
    return this.http.delete(`${this.reqUrl}/users/${id}`)
  }
  addInter(data) {
    return this.http.post<any>(`${this.reqUrl}/interimaire/create`, data);
  }
  renouvellerContrat(data) {
    return this.http.post<any>(`${this.reqUrl}/ajoutContrat`, data);
  }
  reconduireContrat(data) {
    return this.http.post<any>(`${this.reqUrl}/reconduireContrat`, data);
  }
  getListInterFinContrat(id: number): Observable<any> {
    return this.http.get<any>(`${this.reqUrl}/interimFinContrat`);
  }
  getAllSociete(){
    return this.http.get(this.reqUrl + '/societe/all');
  }

  getAllRegion(){
    return this.http.get(this.reqUrl + '/listeRegions');
  }
  getAllCategorie(){
    return this.http.get(this.reqUrl + '/categories')
  }
  getAllPoles(id: number){
    return this.http.get(`${this.reqUrl}/poles/${id}`);
  }
  getAllDirection(id: number){
    return this.http.get(`${this.reqUrl}/direction/${id}`);
  }
  getAllService(id: number){
    return this.http.get(`${this.reqUrl}/services/${id}`);
  }
  getAllDepartement(id: number){
    return this.http.get(`${this.reqUrl}/departement/${id}`);
  }
  //delete une agence en l'archivant
  deleteAgence(id: string) {
    return this.http.delete(`${this.reqUrl}/deleteAgence/${id}`);
  }

  getListeNotification(): Observable<any> {
    return this.http.get<any>(this.reqUrl + '/notification/all/');
  }
 
  getListeObjectif(id: number){
    return this.http.get(`${this.reqUrl}/listeObjectifs/${id}`);
  }
  addUser(data) {
    return this.http.post<any>(`${this.reqUrl}/users/create`, data);
  }
  renouvelerContrat(data) {
    return this.http.post<any>(`${this.reqUrl}/ajoutContrat`, data);
  }
  getAllStructure() {
    return this.http.get(`${this.reqUrl}/structure/all`);
  }
  resetPassword(token, data){
    return this.http.post<any>(`${this.reqUrl}/reset/${token}`, data);
  }
  verifierPassword(data){
    return this.http.post<any>(`${this.reqUrl}/verifiePassword`, data);
  }
  getDomaine() {
    return this.http.get(`${this.reqUrl}/domaines`);
  }
  postDemande(data) {
    return this.http.post<any>(`${this.reqUrl}/ajoutDemande`, data);
  }

  pieceFilter(data) {
    return this.http.post<any>(`${this.reqUrl}/interimaireByPiece`, data);
  }

  matriculeFilter(matricule) {
    const data = {matricule: matricule};
    return this.http.post<any>(`${this.reqUrl}/interimaireByMatricule `, data);
  }

  getListMatricule(): Observable<any> {
    return this.http.get<any>(this.reqUrl + '/managers/list');
  }
  getTotalAgenceActifInactif(id: number) {
    return this.http.get(`${this.reqUrl}/statInterimaireAgence/${id}`);
  }
  statInterByYear(an, so){
    const data = {annee: an, societe: so};
    return this.http.get(`${this.reqUrl}/statInterimaireByYear`, {params: data});
  } 
  statTotalInter(annee, societe){
    const data = {annee: annee, societe: societe};
    return this.http.get(`${this.reqUrl}/statInterimaire`, {params: data});
  }

  statInterByMonth(annee) {
    const data = {annee: annee};
    return this.http.get(`${this.reqUrl}/statInterimaireByMonth`, {params: data});
  }
  
  statInterByAgence(){
    return this.http.get(`${this.reqUrl}/statInterimaireByAgence`);
  }
  
  statInterAgence(id: number){
    return this.http.get(`${this.reqUrl}/statInterimaireAgence/${id}`);
  }
  arreterContrat(id: number, data: string){
    return this.http.post(`${this.reqUrl}/arreterContrat/${id}`, data);
  }
  getprofil(): Observable<any> {
    return this.http.get<any>(this.reqUrl + '/profils');
  }
  // recupere les details d'une agence
  getContratById(id: number) {
    return this.http.get(this.reqUrl + `/contrat/${id}`);
  }
  addObjectifs(data){
    return this.http.post(`${this.reqUrl}/ajoutObjectif`, data);
  }
  notezObjectif(data:any, id: number): Observable<any> {
    return this.http.post<any>(`${this.reqUrl}/noterObjectif/${id}`, data);
  }
  modifierObjectif(data:any, id: number): Observable<any> {
    return this.http.post<any>(`${this.reqUrl}/updateObjectif/${id}`, data);
  }
  addDemande(data){
    return this.http.post(`${this.reqUrl}/ajoutDemande`, data);
  }
  sendResetPassword(data) {
    return this.http.post(`${this.reqUrl}/reinitialisationMotDePass`, data);
  }
  changePassword(data) {
    return this.http.post(`${this.reqUrl}/passwordChange`, data);
  }
  validerInter(id: number, data): Observable<any> {
    return this.http.post<any>(`${this.reqUrl}/validerInterimaire/${id}`, data);
  }
  getTypeDemande(): Observable<any> {
    return this.http.get<any>(this.reqUrl + '/typeDemande');
  }
  addAttestation(data) {
    return this.http.post(`${this.reqUrl}/ajoutAttestation`, data);
  }
  rechercheAvance(data) {
    return this.http.post(`${this.reqUrl}/recherche`, data);
  }
  detailUser(id: number) {
    return this.http.get(`${this.reqUrl}/users/${id}`);
  }
  getFonctions(): Observable<any> {
    return this.http.get<any>(this.reqUrl + '/fonctions');
  }
  validerInterimaire(data:any, id: number): Observable<any> {
    return this.http.post<any>(`${this.reqUrl}/validerInterimaire/${id}`, data);
  }
  bolquerInter(id: number, data:any): Observable<any> {
    return this.http.post<any>(`${this.reqUrl}/block/${id}`, data);
  }
  updateUser(data, id: number){
    return this.http.post<any>(`${this.reqUrl}/users/update/${id}`, data);
  }
  listArchive(){
    return this.http.get<any>(this.reqUrl + '/listArchived');
  }
  bloquerUser(id: number, data:any): Observable<any> {
    return this.http.post<any>(`${this.reqUrl}/users/activeDesactive/${id}`, data);
  }
  blacklist(){
    return this.http.get<any>(this.reqUrl + '/blacklist');
  }
  deleteInterblacklister(id: string){
    return this.http.delete<any>(`${this.reqUrl} + '/interimBlacklist/${id}`);
  }
  addAttestationEnMasse(data:any): Observable<any> {
    return this.http.post<any>(`${this.reqUrl}/ajoutAttestationEnMasse`, data);
  }
  extraireAttestation(data:any): Observable<any> {
    return this.http.post<any>(`${this.reqUrl}/extractionAttestation`, data);
  }
  extraireInterimaire(data:any): Observable<any> {
    return this.http.post<any>(`${this.reqUrl}/extractionInterimaire`, data);
  }
  historiqueInter(id: number){
    return this.http.get<any>(`${this.reqUrl}/histoContratInterimaire/${id}`);
  }
  getListAttestation() {
    return this.http.get<any>(`${this.reqUrl}/listeAttestation`);
  }


  attestionMesInter(){
    return this.http.get<any>(this.reqUrl + '/attestationMesInterimaires');
  }
  getOneEvaluation(id: number){
    return this.http.get<any>(`${this.reqUrl}/evaluation/${id}`);
  }
  evaluer(data:any): Observable<any> {
    return this.http.post<any>(`${this.reqUrl}/notation`, data);
  }
  updateEvaluation(data, id: number){
    return this.http.post<any>(`${this.reqUrl}/updateEvaluation/${id}`, data);
  }
  objectifEvaluation(id_inter: number, id_evaluation){
    return this.http.get<any>(`${this.reqUrl}/objectif/${id_inter}/${id_evaluation}`);
  }
  getStatPresence(): Observable<any> {
    return this.http.get<any>(this.reqUrl + '/statDemande');
  }
  getStatPresenceTab(annee, societe): Observable<any> {
    const data = {annee: annee, societe: societe};
    return this.http.get<any>(`${this.reqUrl}/statDemandeAnnee`, {params: data});
  }

  getLastNotification(): Observable<any> {
    return this.http.get<any>(this.reqUrl + '/latestNotification');
  }
  statInterPourcent(id_societe: number){
    return this.http.get<any>(`${this.reqUrl}/statInterimairePourcent/${id_societe}`);
  }
  statDemandeDirection(id: number){
    return this.http.get<any>(`${this.reqUrl}/statDemandeDirection/${id}`);
  }

  statInterAge(annee, societe){
    const data = {annee: annee, societe: societe};
    return this.http.get<any>(`${this.reqUrl}/statsInterAge`, {params: data});
  }

  statInterCategorie(annee, societe){
    const data = {annee: annee, societe: societe};
    return this.http.get<any>(`${this.reqUrl}/statsInterCategorie`, {params: data});
  }

  statInterCategorieParDirection(annee, societe){
    const data = {annee: annee, societe: societe};
    return this.http.get<any>(`${this.reqUrl}/statsInterCategorieByDirection`, {params: data});
  }

  getInterimaireSousContrat(page, limit, matricule, poste, agence, societe, direction) {
    const data = {page: page, limit: limit, matricule: matricule, poste: poste, agence: agence, societe: societe, direction: direction};
    return this.http.get<any>(this.reqUrl + '/interimSousContrat', {params: data});
  }

  listAttestationFilter(page,limit, mois, annee, reference) {
    const data = {page: page, limit: limit, mois: mois,  annee: annee ,reference: reference};
    return this.http.get<any>(this.reqUrl + '/listeAttestation', {params: data});
  }

  listMesAttestationFilter(page,limit, mois, annee, reference) {
    const data = {page: page, limit: limit, mois: mois,  annee: annee ,reference: reference};
    return this.http.get<any>(this.reqUrl + '/attestationMesInterimaires', {params: data});
  }


  listArchivedFilter(page, limit, admissible) {
    const data = {page: page, limit: limit ,admissible:admissible};
    return this.http.get<any>(this.reqUrl + '/listArchived', {params: data});
  }

  getInterimaireFinContrat(page, limit, matricule, poste, agence, societe, direction) {
    const data = {page: page, limit: limit, matricule: matricule, poste: poste, agence: agence, societe: societe, direction: direction};
    return this.http.get<any>(this.reqUrl + '/interimFinContrat', {params: data});
  }

  getInterimaireEnattente(page, limit, cni, poste, agence, societe, direction) {
    const data = {page: page, limit: limit, cni: cni, poste: poste, agence: agence, societe: societe, direction: direction};
    return this.http.get<any>(this.reqUrl + '/interimEnAttente', {params: data});
  }

  getListedesDemande(page, limit, type) {
    const data = {page: page, limit: limit, type: type};
    return this.http.get<any>(this.reqUrl + '/listeDemandes', {params: data});
  }

  getListeNoire(page, limit, telephone, typePiece, numeroPiece) {
    const data = {page: page, limit: limit, telephone: telephone, typepiece: typePiece, numpiece: numeroPiece};
    return this.http.get<any>(this.reqUrl + '/blacklist', {params: data});
  }

  exportStatInterimByYear(annee) {
    const data = {annee: annee};
    return this.http.get<any>(this.reqUrl + '/ExportStatInterimByYear', {params: data});
  }

  extractionStatistiqueInterim(societe) {
    const data = {societe: societe};
    return this.http.get<any>(this.reqUrl + '/extractionStatistiqueInterim', {params: data});
  }

  extractionStatistiqueGenreInterim(id) {
    return this.http.get<any>(`${this.reqUrl}/ExtractionStatInterimairePourcent/${id}`);
  }

  extractionInterAge(annee, societe){
    const data = {annee: annee, societe: societe};
    return this.http.get<any>(`${this.reqUrl}/extractionsInterAge`, {params: data});
  }

  extractionInterCategorie(annee, societe){
    const data = {annee: annee, societe: societe};
    return this.http.get<any>(`${this.reqUrl}/extractionsInterCategorie`, {params: data});
  }

  extractionInterCategorieParDirection(annee, societe){
    const data = {annee: annee, societe: societe};
    return this.http.get<any>(`${this.reqUrl}/extractionStatInterimaireByCategorie`, {params: data});
  }

  getOneAttestation(id) {
    return this.http.get<any>(`${this.reqUrl}/detailAttestation/${id}`);
  }

  listeSite(page, limit, region) {
    const data = {page: page, limit: limit ,region: region};
    return this.http.get<any>(this.reqUrl + '/listeSite', {params: data});
  }
  listeProfil(page, limit, code, description) {
    const data = {page: page, limit: limit ,code: code, description: description};
    return this.http.get<any>(this.reqUrl + '/profils', {params: data});
  }
  listeRegions() {
     return this.http.get<any>(this.reqUrl + '/listeRegions');
  }
  listeDirections(id: number) {
    return this.http.get<any>(`${this.reqUrl}/direction/${id}`);
 }
  interimRestau(){
    return this.http.get<any>(this.reqUrl + '/interimRestau')
  }
  extractionListeResto(annee, societe){
    const data = {annee: annee, societe: societe};
    return this.http.get<any>(`${this.reqUrl}/extractionListeResto`, {params: data});
  }
  addProfil(data){
    return this.http.post<any>(`${this.reqUrl}/profils`, data);
  }
  addDirection(data){
    return this.http.post<any>(`${this.reqUrl}/direction`, data);
  }
  addSociete(data){
    return this.http.post<any>(`${this.reqUrl}/societe`, data);
  }
  addSite(data){
    return this.http.post<any>(`${this.reqUrl}/addSite`, data);
  }
  addPeriode(data){
    return this.http.post<any>(`${this.reqUrl}/addPeriode`, data);
  }
  addStructure(data){
    return this.http.post<any>(`${this.reqUrl}/structure/create`, data);
  }
  getProfil(){
    return this.http.get<any>(`${this.reqUrl}/profils`);
  }
}
