import { Address, CollectionSchedule } from "src/types";

export type RootStackParamList = {
  Setup: undefined;
  CollectionSchedule: { selectedAddress: Address };
  CollectionShift: { selectedAddress: Address; selectedDays: CollectionSchedule };
  TermsOfService: undefined;
  Configuration: undefined;
};