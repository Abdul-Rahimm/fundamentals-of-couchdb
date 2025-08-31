"use client";

import { useState, useEffect } from "react";
import PageContainer from "@/components/PageContainer";
import FilterForm from "@/components/FilterForm";
import RecordsList from "@/components/RecordsList";
import {
  fetchCriminalRecords,
  type FilterOptions,
  type CriminalRecordWithId,
} from "@/services/couchdbService";

export default function RecordsPage() {
  const [records, setRecords] = useState<CriminalRecordWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>();
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({});

  const loadRecords = async (filters: FilterOptions = {}) => {
    setLoading(true);
    setError(undefined);

    try {
      const result = await fetchCriminalRecords(filters);

      if (result.success && result.records) {
        setRecords(result.records);
      } else {
        setError(result.message || "Failed to load records");
      }
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Load records on initial page load
  useEffect(() => {
    loadRecords();
  }, []);

  const handleFilter = (filters: FilterOptions) => {
    setActiveFilters(filters);
    loadRecords(filters);
  };

  return (
    <PageContainer title="Criminal Records">
      <FilterForm onFilter={handleFilter} />

      <div className="mb-4">
        <p className="text-sm text-gray-600">
          {records.length} record(s) found
          {Object.keys(activeFilters).some(
            (key) => activeFilters[key as keyof FilterOptions]
          ) && " with current filters"}
        </p>
      </div>

      <RecordsList records={records} loading={loading} error={error} />
    </PageContainer>
  );
}
