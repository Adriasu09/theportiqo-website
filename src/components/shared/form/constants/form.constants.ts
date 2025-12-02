import { Country, SelectOption } from "../models/form.models";

export const EU_COUNTRIES: Country[] = [
  { name: "Austria", isoCode: "AT", prefix: "+43" },
  { name: "Belgium", isoCode: "BE", prefix: "+32" },
  { name: "Bulgaria", isoCode: "BG", prefix: "+359" },
  { name: "Croatia", isoCode: "HR", prefix: "+385" },
  { name: "Cyprus", isoCode: "CY", prefix: "+357" },
  { name: "Czech Republic", isoCode: "CZ", prefix: "+420" },
  { name: "Denmark", isoCode: "DK", prefix: "+45" },
  { name: "Estonia", isoCode: "EE", prefix: "+372" },
  { name: "Finland", isoCode: "FI", prefix: "+358" },
  { name: "France", isoCode: "FR", prefix: "+33" },
  { name: "Germany", isoCode: "DE", prefix: "+49" },
  { name: "Greece", isoCode: "GR", prefix: "+30" },
  { name: "Hungary", isoCode: "HU", prefix: "+36" },
  { name: "Ireland", isoCode: "IE", prefix: "+353" },
  { name: "Italy", isoCode: "IT", prefix: "+39" },
  { name: "Latvia", isoCode: "LV", prefix: "+371" },
  { name: "Lithuania", isoCode: "LT", prefix: "+370" },
  { name: "Luxembourg", isoCode: "LU", prefix: "+352" },
  { name: "Malta", isoCode: "MT", prefix: "+356" },
  { name: "Netherlands", isoCode: "NL", prefix: "+31" },
  { name: "Poland", isoCode: "PL", prefix: "+48" },
  { name: "Portugal", isoCode: "PT", prefix: "+351" },
  { name: "Romania", isoCode: "RO", prefix: "+40" },
  { name: "Slovakia", isoCode: "SK", prefix: "+421" },
  { name: "Slovenia", isoCode: "SI", prefix: "+386" },
  { name: "Spain", isoCode: "ES", prefix: "+34" },
  { name: "Sweden", isoCode: "SE", prefix: "+46" },
];



export const DOCUMENT_TYPE_OPTIONS: SelectOption[] = [
  { label: "DNI", value: "DNI" },
  { label: "NIE", value: "NIE" },
  { label: "Passport", value: "PASSPORT" },
];
