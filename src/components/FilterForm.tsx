import { useState, FormEvent } from "react";
import { FilterOptions } from "@/services/couchdbService";

type FilterFormProps = {
  onFilter: (filters: FilterOptions) => void;
};

export default function FilterForm({ onFilter }: FilterFormProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    criminalName: "",
    crime: "",
    sentenceYear: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({
      criminalName: "",
      crime: "",
      sentenceYear: "",
    });
    onFilter({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md mb-6"
    >
      <h2 className="text-lg font-bold mb-4">Filter Records</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label
            htmlFor="criminalName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            id="criminalName"
            name="criminalName"
            type="text"
            value={filters.criminalName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Search by name"
          />
        </div>

        <div>
          <label
            htmlFor="crime"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Crime
          </label>
          <input
            id="crime"
            name="crime"
            type="text"
            value={filters.crime}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Search by crime"
          />
        </div>

        <div>
          <label
            htmlFor="sentenceYear"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Sentence Year
          </label>
          <input
            id="sentenceYear"
            name="sentenceYear"
            type="number"
            value={filters.sentenceYear}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
            placeholder="Enter year"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Reset
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </div>
    </form>
  );
}
