import { NextRequest, NextResponse } from "next/server";
import nano from "nano";

// Configure connection to CouchDB
const couchUrl = "http://admin:password@localhost:5984"; // Update with your credentials
const couch = nano(couchUrl);
const db = couch.use("testdb");

export async function POST(request: NextRequest) {
  try {
    // Ensure database exists before proceeding
    await ensureDbExists();

    const data = await request.json();

    // Insert document into CouchDB
    const response = await db.insert(data);

    return NextResponse.json(
      { success: true, id: response.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("CouchDB error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to insert document" },
      { status: 500 }
    );
  }
}

// Add GET method to your existing route.ts file
export async function GET(request: NextRequest) {
  try {
    await ensureDbExists();

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url);
    const criminalName = searchParams.get("criminalName");
    const crime = searchParams.get("crime");
    const sentenceYear = searchParams.get("sentenceYear");

    // Build selector for Mango query
    const selector: Record<string, any> = {};

    if (criminalName) {
      selector.criminalName = { $regex: `(?i)${criminalName}` };
    }

    if (crime) {
      selector.crime = { $regex: `(?i)${crime}` };
    }

    if (sentenceYear) {
      selector.sentenceYear = sentenceYear;
    }

    // Query the database
    let records;
    if (Object.keys(selector).length > 0) {
      const query = {
        selector,
        limit: 100,
      };
      const result = await db.find(query);
      records = result.docs;
    } else {
      // If no filters, get all docs (with limit)
      const result = await db.list({ include_docs: true, limit: 100 });
      records = result.rows.map((row) => row.doc);
    }

    return NextResponse.json({ success: true, records }, { status: 200 });
  } catch (error) {
    console.error("CouchDB error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch records" },
      { status: 500 }
    );
  }
}

// Make sure to add this function if it doesn't exist already
async function ensureDbExists() {
  try {
    const dbs = await couch.db.list();
    if (!dbs.includes("testdb")) {
      await couch.db.create("testdb");
    }
  } catch (error) {
    console.error("Error ensuring database exists:", error);
    throw error;
  }
}
