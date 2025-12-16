
export interface SectionChild {
  labelKey: string;
  url?: string;
  isExternalUrl?: boolean;
  action?: () => void;
}
export interface FooterSection {
  titleKey: string;
  children: SectionChild[];
  url?: string;
  isExternalUrl?: boolean;
}
