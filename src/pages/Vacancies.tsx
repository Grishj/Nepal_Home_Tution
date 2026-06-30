import { useState } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Reveal } from "../components/Reveal";
import { VacancyCard } from "../components/VacancyCard";
import { VacancyFilters, type FiltersState } from "../components/VacancyFilters";
import { VacancySkeleton } from "../components/VacancySkeleton";
import { useVacancies } from "../hooks/useVacancies";

const defaultFilters: FiltersState = {
  search: "",
  status: "",
  gender: "",
  urgent: "",
  sort: "",
};

export default function Vacancies() {
  const { vacancies, loading, error, refresh } = useVacancies();
  const [filters, setFilters] = useState<FiltersState>(defaultFilters);

  const filtered = vacancies.filter((v) => {
    if (filters.status && v.status !== filters.status) return false;
    if (filters.gender && v.teacherGender !== filters.gender) return false;
    if (filters.urgent === "urgent" && !v.urgent) return false;
    if (filters.urgent === "normal" && v.urgent) return false;

    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (
        !v.subject.toLowerCase().includes(q) &&
        !v.location.toLowerCase().includes(q) &&
        !v.class.toLowerCase().includes(q)
      ) {
        return false;
      }
    }

    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (filters.sort === "salary-high") return b.salary - a.salary;
    if (filters.sort === "salary-low") return a.salary - b.salary;
    return 0;
  });

  return (
    <>
      <section className="section-surface pt-32 pb-20">
        <div className="site-container">
          <Reveal className="mx-auto max-w-4xl text-center">
            <p className="mb-3 text-sm font-bold uppercase text-brand-orange">Vacancies</p>
            <h1 className="text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl">
              Open Tutor Positions
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-700">
              Browse current tutoring vacancies across Nepal. Apply directly if you match the requirements.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="site-container">
          {error && (
            <div className="mb-8 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-5 text-red-800" role="alert">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-bold">Unable to load vacancies</p>
                <p className="mt-1 text-sm">{error}</p>
                <button
                  type="button"
                  onClick={refresh}
                  className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-red-100 px-4 py-2 text-xs font-bold text-red-800 transition hover:bg-red-200 focus-ring"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Try Again
                </button>
              </div>
            </div>
          )}

          {!error && (
            <VacancyFilters filters={filters} onFilterChange={setFilters} />
          )}

          <div className="mt-10">
            {loading ? (
              <VacancySkeleton />
            ) : !error && sorted.length === 0 ? (
              <div className="rounded-xl border border-slate-100 bg-slate-50 px-6 py-16 text-center">
                <p className="text-lg font-bold text-slate-800">No vacancies available.</p>
                <p className="mt-2 text-sm text-slate-500">
                  {filters.search || filters.status || filters.gender || filters.urgent
                    ? "Try adjusting your filters."
                    : "Check back later for new opportunities."}
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sorted.map((vacancy) => (
                  <VacancyCard key={vacancy.id} vacancy={vacancy} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
