import { CriminalRecordWithId } from "@/services/couchdbService";

type RecordCardProps = {
  record: CriminalRecordWithId;
};

export default function RecordCard({ record }: RecordCardProps) {
  // Format the recorded date
  const formattedDate = record.recordedAt
    ? new Date(record.recordedAt).toLocaleDateString()
    : "Unknown date";

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold text-gray-800 mb-2">
        {record.criminalName}
      </h3>
      <div className="text-gray-600">
        <p>
          <span className="font-semibold">Crime:</span> {record.crime}
        </p>
        <p>
          <span className="font-semibold">Sentence Year:</span>{" "}
          {record.sentenceYear}
        </p>
        <p>
          <span className="font-semibold">Recorded:</span> {formattedDate}
        </p>
      </div>
      <div className="mt-2 text-xs text-gray-500">ID: {record._id}</div>
    </div>
  );
}
