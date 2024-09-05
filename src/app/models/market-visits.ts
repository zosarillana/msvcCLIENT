export class MarketVisits {
  id?: number;
  user_id = '';
  visit_date = '';
  area_id = '';
  visit_accountName = '';
  visit_distributor = '';
  visit_salesPersonnel = '';
  visit_accountType = '';
  isr_id = '';
  isr_reqOthers = '';
  isr_req_ImgPath = '';    
  isr_needsOthers = '';
  isr_needs_ImgPath = ''; 
  visit_payolaSupervisor = '';
  visit_payolaMerchandiser = '';
  visit_averageOffTakePd = '';
  pod_id = '';
  pod_others = '';
  visit_competitorsCheck = '';
  pap_id = '';
  pap_others = '';
  areas: Array<{
    area_id: number;
    area_name: string;
    area_description: string;
    area_dateCreated: string;
    area_dateUpdated: string;
  }> = [];
}
