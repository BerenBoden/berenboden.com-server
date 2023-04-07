import { NextFunction, Request, Response } from "express";
import { runReport, runRealtimeReport } from "../utils/runReport.js";
import { updateNestedObject } from "../utils/updateNestedObject.js";

export const getAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await runReport();

    const analytics = {
      countries: {},
      cities: {},
      browsers: {},
      deviceCategories: {},
    };

    data.rows.forEach((row) => {
      const country = row.dimensionValues[0].value;
      const city = row.dimensionValues[1].value;
      const browser = row.dimensionValues[2].value;
      const deviceCategory = row.dimensionValues[3].value;
      const activeUsers = parseInt(row.metricValues[0].value, 10);

      updateNestedObject(analytics.countries, [country], activeUsers);
      updateNestedObject(analytics.cities, [city, country], activeUsers);
      updateNestedObject(analytics.browsers, [browser], activeUsers);
      updateNestedObject(
        analytics.deviceCategories,
        [deviceCategory],
        activeUsers
      );
    });

    res.status(200).send({ analytics });
  } catch (error) {
    console.log(error);
    next({ error, status: 500 });
  }
};
