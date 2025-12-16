import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { FormBase } from "./form-base";
import { useFieldContext } from "./form-hooks";
import { Country, FormControlProps } from "./models/form.models";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { COUNTRIES } from "./constants/form.constants";
import { useState } from "react";

export function FormPhoneSelect({ ...props }: FormControlProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const [countrySelected, setCountrySelected] = useState<Country>(
    COUNTRIES[0],
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleCountrySelect = (country: Country) => {
    setCountrySelected(country);
    const currentInputValue: string = field.state.value.split(" ")[1] || "";
    field.handleChange(country.prefix + " " + currentInputValue);
  };

  return (
    <FormBase {...props} horizontal={false} controlFirst={false}>
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <DropdownMenu onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild>
              <InputGroupButton variant="tertiaryInputAddon" size="sm">
                {countrySelected.isoCode} ({countrySelected.prefix})
                {isOpen ? (
                  <ChevronUpIcon className="size-5" />
                ) : (
                  <ChevronDownIcon className="size-5" />
                )}
              </InputGroupButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="max-h-32 max-w-8">
              {COUNTRIES.map((country: Country) => (
                <DropdownMenuItem
                  key={country.isoCode}
                  onClick={() => handleCountrySelect(country)}
                  className="cursor-pointer hover:bg-qo-gray-100"
                >
                  {country.isoCode}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>

        <InputGroupInput
          id={field.name}
          name={field.name}
          value={(field.state.value || "").split(" ")[1] || ""}
          onBlur={field.handleBlur}
          onChange={(e) =>
            field.handleChange(`${countrySelected.prefix} ${e.target.value}`)
          }
          aria-invalid={isInvalid}
          autoComplete="off"
        />
      </InputGroup>
    </FormBase>
  );
}
