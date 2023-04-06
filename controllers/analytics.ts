import { Request, Response } from "express";
import { BetaAnalyticsDataClient } from "@google-analytics/data";

const propertyId = "241704526";
export const getAnalytics = async (req: Request, res: Response) => {
  try {
    // Using a default constructor instructs the client to use the credentials
    // specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
    const analyticsDataClient = new BetaAnalyticsDataClient();

    // Runs a simple report.
    async function runReport() {
      const [response] = await analyticsDataClient.runReport({
        property: `properties/${propertyId}`,
        dateRanges: [
          {
            startDate: "2020-03-31",
            endDate: "today",
          },
        ],
        dimensions: [
          {
            name: "country",
          },
        ],
        metrics: [
          {
            name: "activeUsers",
          },
        ],
      });

      console.log("Report result:");
      response.rows.forEach((row) => {
        console.log(row.dimensionValues[0], row.metricValues[0]);
      });
    }

    runReport();
    res.status(200).send({ message: "Done" });
  } catch (error) {
    res.status(500).send("Error fetching analytics data: " + error.message);
  }
};
