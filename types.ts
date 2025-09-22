// FIX: Removed invalid text at the beginning of the file.
// types.ts

export enum Role {
  STUDENT = 'Student',
  ALUMNI = 'Alumni',
  FACULTY = 'Faculty',
}

interface BaseUser {
  id: number;
  name: string;
  email: string;
  role: Role;
  institutionId: string;
  department: string;
  profileImage: string;
  lat?: number;
  lng?: number;
  profileComplete?: boolean;
}

export interface Student extends BaseUser {
  role: Role.STUDENT;
  enrollmentYear?: number;
  expectedGraduationYear?: number;
  interests?: string[];
  careerGoals?: string;
}

export interface Alumni extends BaseUser {
  role: Role.ALUMNI;
  graduationYear?: number;
  company?: string;
  jobTitle?: string;
  skills?: string[];
  linkedIn?: string;
  willingToMentor?: boolean;
}

export interface Faculty extends BaseUser {
  role: Role.FACULTY;
  position?: string;
  researchAreas?: string[];
  willingToMentor?: boolean;
}

export type AnyUser = Student | Alumni | Faculty;

export interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
  organizer: string;
}

export interface TimeCapsule {
  id: number;
  title: string;
  creatorId: number;
  recipientId: number;
  releaseDate: string;
  status: 'Sealed' | 'Released';
  createdAt: string;
}