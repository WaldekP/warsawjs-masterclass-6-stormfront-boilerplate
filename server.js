/* eslint-env node */
'use strict';

const express = require('express');
const fetch = require('node-fetch');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS;

const FORECAST_DELAY = 0;

const API_KEY = 'API_KEY';
const BASE_URL = `https://api.darksky.net/forecast`;

const fakeForecast = {
  fakeData: true,
  latitude: 0,
  longitude: 0,
  timezone: 'Europe/Warsaw',
  currently: {
    time: 0,
    summary: 'Clear',
    icon: 'clear-day',
    temperature: 13.4,
    humidity: 0.62,
    windSpeed: 3.74,
    windBearing: 208,
  },
  daily: {
    data: [
      {
        time: 0,
        icon: 'partly-cloudy-night',
        sunriseTime: 1553079633,
        sunsetTime: 1553123320,
        temperatureHigh: 22.91,
        temperatureLow: 18.35,
      },
      {
        time: 86400,
        icon: 'rain',
        sunriseTime: 1553165933,
        sunsetTime: 1553209784,
        temperatureHigh: 24.01,
        temperatureLow: 22.17,
      },
      {
        time: 172800,
        icon: 'rain',
        sunriseTime: 1553252232,
        sunsetTime: 1553296247,
        temperatureHigh: 30.31,
        temperatureLow: 28.61,
      },
      {
        time: 259200,
        icon: 'partly-cloudy-night',
        sunriseTime: 1553338532,
        sunsetTime: 1553382710,
        temperatureHigh: 27.44,
        temperatureLow: 25.82,
      },
      {
        time: 345600,
        icon: 'partly-cloudy-night',
        sunriseTime: 1553424831,
        sunsetTime: 1553469172,
        temperatureHigh: 34.5,
        temperatureLow: 30.82,
      },
      {
        time: 432000,
        icon: 'rain',
        sunriseTime: 1553511130,
        sunsetTime: 1553555635,
        temperatureHigh: 27.79,
        temperatureLow: 24.8,
      },
      {
        time: 518400,
        icon: 'rain',
        sunriseTime: 1553597430,
        sunsetTime: 1553642098,
        temperatureHigh: 22.28,
        temperatureLow: 19.49,
      },
      {
        time: 604800,
        icon: 'snow',
        sunriseTime: 1553683730,
        sunsetTime: 1553728560,
        temperatureHigh: 23.58,
        temperatureLow: 20.68,
      },
    ],
  },
};

/**
 * Generates a fake forecast in case the weather API is not available.
 *
 * @param {String} location GPS location to use.
 * @return {Object} forecast object.
 */
function generateFakeForecast(location) {
  location = location || '52.228629, 21.013732';
  const commaAt = location.indexOf(',');

  // Create a new copy of the forecast
  const result = Object.assign({}, fakeForecast);
  result.latitude = parseFloat(location.substr(0, commaAt));
  result.longitude = parseFloat(location.substr(commaAt + 1));
  return result;
}


/**
 * Gets the weather forecast from the Dark Sky API for the given location.
 *
 * @param {Request} req request object from Express.
 * @param {Response} resp response object from Express.
 */
function getForecast(req, resp) {
  const location = req.params.location || '52.228629, 21.013732';
  const params = 'units=si';
  const url = `${BASE_URL}/${API_KEY}/${location}?${params}`;
  fetch(url).then((resp) => {
    if (resp.status !== 200) {
      throw new Error(resp.statusText);
    }
    return resp.json();
  }).then((data) => {
    setTimeout(() => {
      resp.json(data);
    }, FORECAST_DELAY);
  }).catch((err) => {
    console.error('Dark Sky API Error:', err.message);
    resp.json(generateFakeForecast(location));
  });
}

/**
 * Starts the Express server.
 *
 * @return {ExpressServer} instance of the Express server.
 */
function startServer() {
  const app = express();

  // Redirect HTTP to HTTPS,
  app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

  // Logging for each request
  app.use((req, resp, next) => {
    const now = new Date();
    const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
    const path = `"${req.method} ${req.path}"`;
    const m = `${req.ip} - ${time} - ${path}`;
    // eslint-disable-next-line no-console
    console.log(m);
    next();
  });

  // Handle requests for the data
  app.get('/forecast/:location', getForecast);
  app.get('/forecast/', getForecast);
  app.get('/forecast', getForecast);

  // Handle requests for static files
  app.use(express.static('public'));

  // Start the server
  return app.listen('8000', () => {
    // eslint-disable-next-line no-console
    console.log('Local DevServer Started on port 8000...');
  });
}

startServer();
