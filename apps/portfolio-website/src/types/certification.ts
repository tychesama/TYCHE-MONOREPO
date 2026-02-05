export type CertificationType = "Certificate" | "Organization" | "Participation" | "Volunteer";
export type ActiveStatus = "yes" | "no";

export interface Certification {
  name: string;
  type: CertificationType;
  active: ActiveStatus;

  logo?: string | null;
  image?: string | null;
  issuer?: string | null;
  date?: string | null;

  desc?: string | null;
  details?: string | null;

  certificate_link?: string | null;
  website_link?: string | null;
  extra_link?: string | null;

  color?: string | null;
}
