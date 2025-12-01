import { ReactNode } from "react";

export type FormControlProps = {
  label: string;
  description?: string;
};

export type FormBaseProps = FormControlProps & {
  children: ReactNode;
  horizontal?: boolean;
  controlFirst?: boolean;
  showErrorMessage?: boolean;
};

export interface SelectOption {
  label: string;
  value: string;
}

export interface Country {
  name: string;
  isoCode: string;
  prefix: string;
}
