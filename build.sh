#!/bin/bash

# create missing folders in dist
mkdir -p ./dist
mkdir -p ./dist/config
touch ./dist/.gitkeep

# Copy app engine resources
cp ./src/config/* ./dist/config/
