import { listRegions } from "@lib/data/regions"

export async function GET() {
  try {
    const regions = await listRegions()
    return Response.json({ regions }, { status: 200 })
  } catch (error) {
    console.error("Failed to fetch regions:", error)
    return Response.json(
      {
        error: "Failed to fetch regions",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    )
  }
}
