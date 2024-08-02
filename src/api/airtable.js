import Airtable from 'airtable';

const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY;
const baseId = process.env.REACT_APP_AIRTABLE_BASE_ID;
const base = new Airtable({ apiKey }).base(baseId);

export const getDJRecords = async (djViewId) => {
  return new Promise((resolve, reject) => {
    const recordsArray = [];
    base(djViewId).select({
      maxRecords: 100,
      view: "Grid view"
    }).eachPage(function page(records, fetchNextPage) {
      records.forEach(function(record) {
        recordsArray.push({ id: record.id, fields: record.fields });
      });
      fetchNextPage();
    }, function done(err) {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(recordsArray);
      }
    });
  });
};

export const createSongRequest = async (formId, songName, artistName) => {
  return new Promise((resolve, reject) => {
    base(formId).create([
      {
        "fields": {
          "Song Name": songName,
          "Artist": artistName
        }
      }
    ], function(err, records) {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(records);
      }
    });
  });
};

export const saveSongRequest = async (formId, songName, artistName, created, option = '') => {
  return new Promise((resolve, reject) => {
    base(formId).create([
      {
        "fields": {
          "Song Name": songName,
          "Artist": artistName,
          "Time of request": created,
          "Option": option 
        }
      }
    ], function(err, records) {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(records);
      }
    });
  });
};

export const getDJInfo = async (formId) => {
  return new Promise((resolve, reject) => {
    base('Database DJ\'s').select({
      filterByFormula: `{ID Form} = "${formId}"`,
      maxRecords: 1,
    }).firstPage((err, records) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(records[0].fields);
      }
    });
  });
};

export const deleteDJRecord = async (djViewId, recordId) => {
  return new Promise((resolve, reject) => {
    base(djViewId).destroy([recordId], function(err, deletedRecords) {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        resolve(deletedRecords);
      }
    });
  });
};