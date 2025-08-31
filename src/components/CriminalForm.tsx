import { useState, FormEvent } from "react";

type CriminalFormProps = {
  onSubmit: (data: {
    criminalName: string;
    crime: string;
    sentenceYear: string;
  }) => Promise<void>;
  status: string;
};

export default function CriminalForm({ onSubmit, status }: CriminalFormProps) {
  const [criminalName, setCriminalName] = useState("");
  const [crime, setCrime] = useState("");
  const [sentenceYear, setSentenceYear] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit({ criminalName, crime, sentenceYear });
    setCriminalName("");
    setCrime("");
    setSentenceYear("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
    >
      <div className="mb-4">
        <label
          htmlFor="criminalName"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Criminal Name:
        </label>
        <input
          id="criminalName"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          type="text"
          value={criminalName}
          onChange={(e) => setCriminalName(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="crime"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Crime:
        </label>
        <input
          id="crime"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          type="text"
          value={crime}
          onChange={(e) => setCrime(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="sentenceYear"
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          Sentence Year:
        </label>
        <input
          id="sentenceYear"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          type="number"
          value={sentenceYear}
          onChange={(e) => setSentenceYear(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Criminal Record
      </button>

      {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
    </form>
  );
}
