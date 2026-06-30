import { contact } from "../data/site";

interface TutorDetails {
  fullName: string;
  phone: string;
  highestQualification: string;
  subjects: string[];
  teachingExperience: number;
}

export const createTutorWhatsAppUrl = (details?: TutorDetails) => {
  const message = `Hello Nepal Home Tuition Center,

I have successfully submitted my tutor application through your website.

My Details
Name: ${details?.fullName || "(see attached)"}
Phone: ${details?.phone || "(see attached)"}
Qualification: ${details?.highestQualification || "(see attached)"}
Subjects: ${details?.subjects?.join(", ") || "(see attached)"}
Experience: ${details?.teachingExperience ? `${details.teachingExperience} years` : "(see attached)"}

My CV has already been submitted through the website.

Please review my application.

Thank you.`;

  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
};

export const createGeneralWhatsAppUrl = (message: string) =>
  `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(message)}`;
