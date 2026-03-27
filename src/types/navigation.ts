import { Address } from "src/types";

export type RootStackParamList = {
  Setup: undefined;
  CollectionSchedule: { selectedAddress: Address };
  TermsOfService: undefined;
  Configuration: undefined;
};