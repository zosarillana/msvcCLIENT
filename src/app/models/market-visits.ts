export class MarketVisits {
  id?: number;
  user_id = '';
  visit_date = '';
  area_id = '';
  visit_accountName = '';
  visit_distributor = '';
  visit_salesPersonnel = '';
  visit_accountType = '';
  visit_accountType_others ='';
  isr_id = '';
  isr_reqOthers = '';
  isr_req_ImgPath = '';
  isr_needsOthers = '';
  isr_needs_ImgPath = '';
  visit_payolaSupervisor = '';
  visit_payolaMerchandiser = '';
  visit_averageOffTakePd = '';
  pod_id = '';
  pod_canned_other = '';
  pod_mpp_other = '';
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
  isrs: Array<{
    isr_id: number;
    isr_type: string;
    isr_name: string;
    isr_description: string;
    isr_dateCreated: string;
    isr_dateUpdated: string;
  }> = [];
  pods: Array<{
    pod_id: number;
    pod_type: string;
    pod_name: string;
    pod_description: string;
    pod_dateCreated: string;
    pod_dateUpdated: string;
  }> = [];
  paps: Array<{
    pap_id: number;
    pap_name: string;
    pap_description: string;
    pap_dateCreated: string;
    pap_dateUpdated: string;
  }> = [];
}
