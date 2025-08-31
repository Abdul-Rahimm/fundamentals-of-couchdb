// API service for CouchDB operations
export type CriminalRecord = {
  criminalName: string;
  crime: string;
  sentenceYear: string;
  recordedAt?: string;
};

export type ApiResponse = {
  success: boolean;
  id?: string;
  message?: string;
};

export async function insertCriminalRecord(
  record: CriminalRecord
): Promise<ApiResponse> {
  try {
    const response = await fetch("/api/couchdb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...record,
        recordedAt: new Date().toISOString(),
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "Error inserting record" };
  }
}

// Add these new types and functions to your existing couchdbService.ts file
export type CriminalRecordWithId = CriminalRecord & {
  _id: string;
  _rev: string;
};

export type FilterOptions = {
  criminalName?: string;
  crime?: string;
  sentenceYear?: string;
};

export async function fetchCriminalRecords(
  filters: FilterOptions = {}
): Promise<{
  success: boolean;
  records?: CriminalRecordWithId[];
  message?: string;
}> {
  try {
    // Construct query string from filters
    const queryParams = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });

    const response = await fetch(`/api/couchdb?${queryParams.toString()}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch records");
    }

    return {
      success: true,
      records: data.records,
    };
  } catch (error) {
    console.error("Error fetching records:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
