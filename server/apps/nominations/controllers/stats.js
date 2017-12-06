const db = require('../../../models');
const auth = require('../../lib/auth');
const sql = require('sequelize');

module.exports = {
  dashboardStats: async (req, res) => {
    /*
    Total number of children nominated
    Total number of families nominated
    Total number of children approved
    */
    const nominatedChildren = await db.sequelize.query(`
      SELECT 
        COUNT(*) 
      FROM
        households h
      LEFT JOIN children c ON c.household_id = h.id
      WHERE h.deleted = 0
    `);

    const nominatedFamilies = await db.sequelize.query(`
      SELECT
        COUNT(*)
      FROM
        households h
      WHERE 
        h.deleted = 0
    `);

    const approvedChildren = await db.sequelize.query(`
      SELECT
        COUNT(*)
      FROM
        households h
      LEFT JOIN children c ON c.household_id = h.id
      WHERE
        h.deleted = 0 AND
        h.reviewed = 1 AND
        h.approved = 1
    `);

    /*
      Total number of families approved
      Total number of families declined
      Total number of children declined
    */
    const familiesApproved = await db.sequelize.query(`
      SELECT
        COUNT(*)
      FROM
        households h
      WHERE 
        h.deleted = 0 AND
        reviewed = 1 AND
        approved = 1
    `);
    
    const familiesDeclined = await db.sequelize.query(`
      SELECT
        COUNT(*)
      FROM
        households h
      WHERE 
        h.deleted = 0 AND
        reviewed = 1 AND
        approved = 0
    `);
    
    const declinedChildren = await db.sequelize.query(`
      SELECT
        COUNT(*)
      FROM
        households h
      LEFT JOIN children c ON c.household_id = h.id
      WHERE
        h.deleted = 0 AND
        h.reviewed = 1 AND
        h.approved = 0
    `);
    
    /*
      Total number of families waiting for review
      Total number of children waiting for review
    */
    const familiesAwaitingReview = await db.sequelize.query(`
      SELECT
        COUNT(*)
      FROM
        households h
      WHERE
        h.deleted = 0 AND
        h.reviewed = 0
    `);
    
    const childrenAwaitingReview = await db.sequelize.query(`
      SELECT
        COUNT(*)
      FROM
        households h
      LEFT JOIN children c ON c.household_id = h.id
      WHERE
        h.deleted = 0 AND
        h.reviewed = 0
    `);

    /*
      Total number of children adopted by:
      (list from adopted table) | View report (create in the future)
    */

    /*
      Total number of bikes requested:
      Total number of:
        Tricycles
        12"
        16"
        20" Coaster
        20" Geared
        24" Geared:
    */
    const bicyclesRequested = await db.sequelize.query(`
      SELECT
        COUNT(*),
        c.bike_size
      FROM
        households h
      LEFT JOIN children c ON c.household_id = h.id
      WHERE 
        h.deleted = 0 AND  
        h.reviewed = 1 AND h.approved = 1 AND 
        c.bike_want = 1
      GROUP BY bike_size
    `);

    res.json(bicyclesRequested);
  }
};