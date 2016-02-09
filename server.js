import express from 'express';

import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMStream from "react-dom-stream/server";
import DemoComponent from './DemoComponent';

var app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.write(`<!DOCTYPE html><html>  <head>
        <meta charset="utf-8">
        <title>Server Streamed</title>
        <style>
          nav {
            background-color: #536061;
            width: 100%;
            height: 60px;
            color: #ffffff;
          }
          body{
            margin: 0px;
          }
        </style>
      </head>
      <script> if('serviceWorker' in navigator) 
        { navigator.serviceWorker.register('/sw.js')}
      </script><body>
      
      <nav>This is server rendered stream response. It has nothing to do with serviceWorker. Refresh the page to see the magic</nav>
      
      <div>`)
    var stream = ReactDOMStream.renderToString(<DemoComponent />);
    stream.pipe(res, {end: false});
    stream.on("end", function() {
        res.write(`</div></body></html>`);
        res.end();
    });
});

app.get('/sw-stream-render', (req, res) => {
  var stream = ReactDOMStream.renderToString(<DemoComponent />);
  stream.pipe(res, {end: false});
  stream.on("end", function() {
      res.end();
  });
});

app.listen(8000, (error) => {
  console.log(error)
});