import { Role, type Alumni, type Student, type Faculty, type Event } from './types';

export const alumniData: Alumni[] = [
  { id: 1, name: 'Jane Doe', email: 'jane.doe@alumni.edu', role: Role.ALUMNI, institutionId: 'A001', graduationYear: 2018, department: 'Computer Science', company: 'Google', jobTitle: 'Software Engineer', skills: ['React', 'TypeScript', 'Cloud Computing'], linkedIn: 'https://linkedin.com/in/janedoe', willingToMentor: true, profileImage: 'https://i.pravatar.cc/150?u=jane', lat: 37.422, lng: -122.084, profileComplete: true },
  { id: 2, name: 'John Smith', email: 'john.smith@alumni.edu', role: Role.ALUMNI, institutionId: 'A002', graduationYear: 2015, department: 'Mechanical Engineering', company: 'Tesla', jobTitle: 'Lead Mechanical Engineer', skills: ['CAD', 'Product Design', 'Robotics'], willingToMentor: true, profileImage: 'https://i.pravatar.cc/150?u=john', lat: 30.2672, lng: -97.7431, profileComplete: true },
  { id: 3, name: 'Emily White', email: 'emily.white@alumni.edu', role: Role.ALUMNI, institutionId: 'A003', graduationYear: 2020, department: 'Data Science', company: 'Meta', jobTitle: 'Data Scientist', skills: ['Python', 'Machine Learning', 'AI'], willingToMentor: false, profileImage: 'https://i.pravatar.cc/150?u=emily', lat: 40.7128, lng: -74.0060, profileComplete: true },
];

export const studentData: Student[] = [
  { id: 4, name: 'Michael Brown', email: 'michael.brown@student.edu', role: Role.STUDENT, institutionId: 'S001', enrollmentYear: 2022, department: 'Computer Science', expectedGraduationYear: 2026, interests: ['AI', 'Web Development', 'React'], careerGoals: 'Become a full-stack developer at a top tech company.', profileImage: 'https://i.pravatar.cc/150?u=michael', profileComplete: true },
  { id: 5, name: 'Sarah Green', email: 'sarah.green@student.edu', role: Role.STUDENT, institutionId: 'S002', enrollmentYear: 2021, department: 'Data Science', expectedGraduationYear: 2025, interests: ['Machine Learning', 'Data Visualization', 'Python'], careerGoals: 'Work on impactful AI research projects.', profileImage: 'https://i.pravatar.cc/150?u=sarah', profileComplete: true },
];

export const facultyData: Faculty[] = [
  { id: 6, name: 'Dr. Alan Turing', email: 'alan.turing@faculty.edu', role: Role.FACULTY, institutionId: 'F001', department: 'Computer Science', position: 'Professor', researchAreas: ['Artificial Intelligence', 'Cryptography', 'AI'], willingToMentor: true, profileImage: 'https://i.pravatar.cc/150?u=alan', lat: 52.2053, lng: 0.1218, profileComplete: true },
  { id: 7, name: 'Dr. Marie Curie', email: 'marie.curie@faculty.edu', role: Role.FACULTY, institutionId: 'F002', department: 'Physics', position: 'Head of Department', researchAreas: ['Radioactivity', 'Nuclear Physics'], willingToMentor: true, profileImage: 'https://i.pravatar.cc/150?u=marie', lat: 48.8566, lng: 2.3522, profileComplete: true },
];

export const demoStudent: Student = { 
  id: 99, name: 'Demo User', email: 'demo@student.edu', role: Role.STUDENT, institutionId: 'S999', enrollmentYear: 2022, department: 'Demo Department', expectedGraduationYear: 2026, interests: ['AI', 'Web Development', 'Cloud Computing'], careerGoals: 'Explore the Alumni Connect platform.', profileImage: 'https://i.pravatar.cc/150?u=demo', profileComplete: true
};

export const initialUsers = [...alumniData, ...studentData, ...facultyData, demoStudent];

export const eventsData: Event[] = [
  { id: 1, title: 'Annual Alumni Homecoming', date: '2024-10-26', description: 'Join us for a day of fun, networking, and reminiscing with fellow alumni.', organizer: 'Alumni Association' },
  { id: 2, title: 'Tech Talk: The Future of AI', date: '2024-11-15', description: 'A webinar featuring industry experts from Google and Meta.', organizer: 'Dr. Alan Turing' },
  { id: 3, title: 'Career Fair for Engineering Students', date: '2024-12-05', description: 'Connect with top recruiters from leading engineering firms.', organizer: 'Career Services' },
];