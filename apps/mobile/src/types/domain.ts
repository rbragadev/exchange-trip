export type ProgramMode = 'study_holiday' | 'study_work';

export interface Destination {
  id: string;
  country: string;
  city: string;
  countryCode: string;
  summary: string;
}

export interface CourseType {
  id: string;
  label: string;
  description: string;
}

export interface ExchangePackage {
  id: string;
  title: string;
  school: string;
  destinationId: string;
  country: string;
  city: string;
  mode: ProgramMode;
  courseTypeId: string;
  durationWeeks: number;
  schedule: string;
  weeklyHours: number;
  included: string[];
  priceFromCents: number;
  currency: 'BRL';
  badge: string;
  isOffer: boolean;
  isBestSeller: boolean;
  imageTone: string;
}

export interface SearchFilters {
  mode: ProgramMode;
  destinationId: string;
  courseTypeId: string;
  startDate: string;
  durationWeeks: number;
}

export interface TripSummary {
  id: string;
  title: string;
  destinationName: string;
  status: 'draft' | 'planning' | 'ready';
  startDate: string;
  nextStep: string;
}
