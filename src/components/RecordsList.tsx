import { CriminalRecordWithId } from "@/services/couchdbService";
import RecordCard from "./RecordCard";

type RecordsListProps = {
  records: CriminalRecordWithId[];
  loading: boolean;
  error?: string;
};

export default function RecordsList({
  records,
  loading,
  error,
}: RecordsListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        <p>{error}</p>
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-5 rounded flex items-center justify-center">
        <p className="text-center">
          No records found. Try adjusting your filters or add some records.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {records.map((record) => (
        <RecordCard key={record._id} record={record} />
      ))}
    </div>
  );
}
