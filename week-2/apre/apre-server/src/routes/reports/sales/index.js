/**
 * Author: Professor Krasso
 * Date: 8/14/24
 * File: index.js
 * Description: Apre sales report API for the sales reports
 */

'use strict';

const express = require('express');
const { mongo } = require('../../../utils/mongo');

const router = express.Router();

/**
 * @description
 *
 * GET /regions
 *
 * Fetches a list of distinct sales regions.
 *
 * Example:
 * fetch('/regions')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
router.get('/regions', (req, res, next) => {
  try {
    mongo (async db => {
      const regions = await db.collection('sales').distinct('region');
      res.send(regions);
    }, next);
  } catch (err) {
    console.error('Error getting regions: ', err);
    next(err);
  }
});

/**
 * @description
 *
 * GET /regions/:region
 *
 * Fetches sales data for a specific region, grouped by salesperson.
 *
 * Example:
 * fetch('/regions/north')
 *  .then(response => response.json())
 *  .then(data => console.log(data));
 */
router.get('/regions/:region', (req, res, next) => {
  try {
    mongo (async db => {
      const salesReportByRegion = await db.collection('sales').aggregate([
        { $match: { region: req.params.region } },
        {
          $group: {
            _id: '$salesperson',
            totalSales: { $sum: '$amount'}
          }
        },
        {
          $project: {
            _id: 0,
            salesperson: '$_id',
            totalSales: 1
          }
        },
        {
          $sort: { salesperson: 1 }
        }
      ]).toArray();
      res.send(salesReportByRegion);
    }, next);
  } catch (err) {
    console.error('Error getting sales data for region: ', err);
    next(err);
  }
});
/**
 * @description
 *
 * GET /monthly-sales
 *
 * Fetches monthly sales totals (months 1–12) for charting/tabular display.
 *
 * Response shape:
 * [
 *   { months: [1,2,3], totalSales: [1234, 5678, 9012] }
 * ]
 */
router.get('/monthly-sales', (req, res, next) => {
  try {
    mongo(async db => {
      const data = await db.collection('sales').aggregate([
        // If date is already a Date in Mongo, this is harmless; if it's a string, it converts it.
        { $addFields: { date: { $toDate: '$date' } } },

        { $group: { _id: { $month: '$date' }, totalSales: { $sum: '$amount' } } },
        { $project: { _id: 0, month: '$_id', totalSales: 1 } },
        { $sort: { month: 1 } },

        // Convert to chart-friendly arrays like other APRE report endpoints do
        {
          $group: {
            _id: null,
            months: { $push: '$month' },
            totalSales: { $push: '$totalSales' }
          }
        },
        { $project: { _id: 0, months: 1, totalSales: 1 } }
      ]).toArray();

      res.send(data);
    }, next);
  } catch (err) {
    console.error('Error in /monthly-sales', err);
    next(err);
  }
});
module.exports = router;