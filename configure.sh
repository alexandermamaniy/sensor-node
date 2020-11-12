#!/bin/bash

cd web-page && \
npm install &&  \
npm run build && \
cd ../rest-server && \
npm install