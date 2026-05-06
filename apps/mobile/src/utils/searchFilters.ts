import type { SearchFilters } from '../types/domain';

export const defaultSearchFilters: SearchFilters = {
  mode: 'study_holiday',
  destinationId: 'all',
  courseTypeId: 'all',
  startDate: '2026-05-25',
  durationWeeks: 4,
};

export function searchFiltersToParams(filters: SearchFilters): Record<string, string> {
  return {
    mode: filters.mode,
    destinationId: filters.destinationId,
    courseTypeId: filters.courseTypeId,
    startDate: filters.startDate,
    durationWeeks: String(filters.durationWeeks),
  };
}

export function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export function searchFiltersFromParams(params: Record<string, string | string[] | undefined>): SearchFilters {
  const mode = firstParam(params.mode);
  const durationWeeks = Number(firstParam(params.durationWeeks));

  return {
    mode: mode === 'study_work' ? 'study_work' : 'study_holiday',
    destinationId: firstParam(params.destinationId) ?? defaultSearchFilters.destinationId,
    courseTypeId: firstParam(params.courseTypeId) ?? defaultSearchFilters.courseTypeId,
    startDate: firstParam(params.startDate) ?? defaultSearchFilters.startDate,
    durationWeeks: Number.isFinite(durationWeeks) && durationWeeks > 0 ? durationWeeks : defaultSearchFilters.durationWeeks,
  };
}
