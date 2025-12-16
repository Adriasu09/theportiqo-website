import { WaitingListFormType } from "../schemas/waiting-list.schema";

export const WAITING_LIST_DEFAULT_VALUES: WaitingListFormType = {
  firstName: "",
  lastName: "",
  email: "",
  acceptCommunication: false,
  acceptPrivacyPolicy: false,
};
