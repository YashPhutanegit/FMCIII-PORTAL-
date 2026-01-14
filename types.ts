
export enum UserRole {
  ADMIN = 'ADMIN',
  INCUBATEE = 'INCUBATEE',
  MENTOR = 'MENTOR',
  INVESTOR = 'INVESTOR'
}

export enum ApplicationStatus {
  APPLIED = 'APPLIED',
  INTERVIEW = 'INTERVIEW',
  SELECTED = 'SELECTED',
  REJECTED = 'REJECTED'
}

export interface Score {
  problemFit: number;
  marketOpportunity: number;
  teamStrength: number;
  traction: number;
  scalability: number;
}

export interface Startup {
  id: string;
  name: string;
  description: string;
  founderId: string;
  status: ApplicationStatus;
  scores?: Score[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
