import { Search } from "lucide-react";

export interface FiltersState {
  search: string;
  status: string;
  gender: string;
  urgent: string;
  sort: string;
}

interface VacancyFiltersProps {
  filters: FiltersState;
  onFilterChange: (filters: FiltersState) => void;
}

export function VacancyFilters({ filters, onFilterChange }: VacancyFiltersProps) {
  const update = (key: keyof FiltersState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="rounded-xl border border-slate-100 bg-white p-5 shadow-soft">
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search subject, location, or class..."
          value={filters.search}
          onChange={(e) => update("search", e.target.value)}
          className="form-field w-full pl-10 pr-4"
          aria-label="Search vacancies"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <select
          value={filters.status}
          onChange={(e) => update("status", e.target.value)}
          className="form-field text-xs"
          aria-label="Filter by status"
        >
          <option value="">All Status</option>
          <option value="OPEN">Open</option>
          <option value="CLOSED">Closed</option>
        </select>

        <select
          value={filters.gender}
          onChange={(e) => update("gender", e.target.value)}
          className="form-field text-xs"
          aria-label="Filter by gender"
        >
          <option value="">All Genders</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Any">Any</option>
        </select>

        <select
          value={filters.urgent}
          onChange={(e) => update("urgent", e.target.value)}
          className="form-field text-xs"
          aria-label="Filter by urgency"
        >
          <option value="">All</option>
          <option value="urgent">Urgent Only</option>
          <option value="normal">Normal Only</option>
        </select>

        <select
          value={filters.sort}
          onChange={(e) => update("sort", e.target.value)}
          className="form-field text-xs"
          aria-label="Sort vacancies"
        >
          <option value="">Newest First</option>
          <option value="salary-high">Highest Salary</option>
          <option value="salary-low">Lowest Salary</option>
        </select>
      </div>
    </div>
  );
}
