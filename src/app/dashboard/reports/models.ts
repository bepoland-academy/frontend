export interface AssignedConsultant {
  consultantId: string;
  onSiteRate: number;
  projectId: string;
  rate: number;
  roleId: string;
  isOnSite?: boolean;
}

export interface Week {
  week: number;
  hours: number;
}

export interface ConsultantWithTimesheet {
  firstName: string;
  lastName: string;
  projectName: string;
  weeks: Week[];
  allHours: number;
  revenue: number;
  roleName: string;
  consultantId: string;
  onSiteRate: number;
  projectId: string;
  rate: number;
  roleId: string;
  isOnSite ?: boolean;
}
