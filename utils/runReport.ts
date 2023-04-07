import { BetaAnalyticsDataClient } from "@google-analytics/data";
const propertyId = "241704526";

const analyticsDataClient = new BetaAnalyticsDataClient();

export async function runReport() {
  const data = [];
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
      {
        name: "city",
      },
      {
        name: "browser",
      },
      {
        name: "deviceCategory",
      },
      {
        name: "pagePath",
      },
    ],
    metrics: [
      {
        name: "activeUsers",
      },
    ],
  });
  return response
}

export async function runRealtimeReport() {
  const data = [];
  const [response] = await analyticsDataClient.runRealtimeReport({
    property: `properties/${propertyId}`,
    dimensions: [
      {
        name: "country",
      },
      {
        name: "city",
      },
      {
        name: "deviceCategory",
      },
    ],
    metrics: [
      {
        name: "activeUsers",
      },
    ],
  });
  response.rows.forEach((row) => {
    const dimensionValues = row.dimensionValues.map((dimValue) => {
      console.log(dimValue);
      return {
        value: dimValue.value,
        oneValue: "value",
      };
    });

    const metricValues = row.metricValues.map((metricValue) => {
      console.log(metricValue);
      return { value: metricValue.value, oneValue: "value" };
    });

    data.push({
      dimensionValues,
      metricValues,
    });
  });
  return data;
}
