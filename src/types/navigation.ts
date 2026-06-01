import { Address, CollectionDays } from "src/types";

export type RootStackParamList = {
  Setup: undefined;
  CollectionSchedule: { selectedAddress: Address };
  CollectionShift: { selectedAddress: Address; selectedDays: CollectionDays };
  TermsOfService: undefined;
  Configuration: undefined;
  Support: undefined;
};