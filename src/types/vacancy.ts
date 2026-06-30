export interface Vacancy {
  id: string;
  status: "OPEN" | "CLOSED";
  subject: string;
  class: string;
  location: string;
  salary: number;
  teacherGender: string;
  duration: string;
  description: string;
  postedDate: string;
  experience: string;
  education: string;
  urgent: boolean;
  active: boolean;
}
