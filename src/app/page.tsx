"use client";

import { useState } from "react";
import CriminalForm from "@/components/CriminalForm";
import PageContainer from "@/components/PageContainer";
import {
  insertCriminalRecord,
  type CriminalRecord,
} from "@/services/couchdbService";

export default function Home() {
  const [status, setStatus] = useState("");

  const handleSubmit = async (data: Omit<CriminalRecord, "recordedAt">) => {
    if (!data.criminalName || !data.crime || !data.sentenceYear) {
      setStatus("Please fill in all required fields");
      return;
    }

    setStatus("Inserting...");

    try {
      const result = await insertCriminalRecord(data);

      if (result.success) {
        setStatus(`Record inserted successfully with ID: ${result.id}`);
      } else {
        setStatus(result.message || "Failed to insert record");
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("Error inserting record");
    }
  };

  return (
    <PageContainer title="Criminal Records Database">
      <CriminalForm onSubmit={handleSubmit} status={status} />
    </PageContainer>
  );
}
