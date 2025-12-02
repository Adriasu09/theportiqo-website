import { Country, SelectOption } from "../models/form.models";

export const EU_COUNTRIES: Country[] = [
  { name: "austria", isoCode: "AT", prefix: "+43" },
  { name: "belgium", isoCode: "BE", prefix: "+32" },
  { name: "bulgaria", isoCode: "BG", prefix: "+359" },
  { name: "croatia", isoCode: "HR", prefix: "+385" },
  { name: "cyprus", isoCode: "CY", prefix: "+357" },
  { name: "czechRepublic", isoCode: "CZ", prefix: "+420" },
  { name: "denmark", isoCode: "DK", prefix: "+45" },
  { name: "estonia", isoCode: "EE", prefix: "+372" },
  { name: "finland", isoCode: "FI", prefix: "+358" },
  { name: "france", isoCode: "FR", prefix: "+33" },
  { name: "germany", isoCode: "DE", prefix: "+49" },
  { name: "greece", isoCode: "GR", prefix: "+30" },
  { name: "hungary", isoCode: "HU", prefix: "+36" },
  { name: "ireland", isoCode: "IE", prefix: "+353" },
  { name: "italy", isoCode: "IT", prefix: "+39" },
  { name: "latvia", isoCode: "LV", prefix: "+371" },
  { name: "lithuania", isoCode: "LT", prefix: "+370" },
  { name: "luxembourg", isoCode: "LU", prefix: "+352" },
  { name: "malta", isoCode: "MT", prefix: "+356" },
  { name: "netherlands", isoCode: "NL", prefix: "+31" },
  { name: "poland", isoCode: "PL", prefix: "+48" },
  { name: "portugal", isoCode: "PT", prefix: "+351" },
  { name: "romania", isoCode: "RO", prefix: "+40" },
  { name: "slovakia", isoCode: "SK", prefix: "+421" },
  { name: "slovenia", isoCode: "SI", prefix: "+386" },
  { name: "spain", isoCode: "ES", prefix: "+34" },
  { name: "sweden", isoCode: "SE", prefix: "+46" },
];



export const DOCUMENT_TYPE_OPTIONS: SelectOption[] = [
  { label: "DNI", value: "DNI" },
  { label: "NIE", value: "NIE" },
  { label: "Passport", value: "PASSPORT" },
];
