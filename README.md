# Dart scoreboard application using React, MobX and TypeScript
React demo app for Western MA Developers User Group

# Demo app web site
https://wmugdarts.azurewebsites.net/

# src Folder Structure

## api
Code related to service calls such as AJAX requests or local storage.

## components
React TSX components and controls.  Higher level components will inject MobX stores while lower level components will have data sent through props.

## models
Business logic

## stores
MobX stores that contain observable properties, computed properties, and actions.  These stores will reference model objects and make service calls to API methods in actions.

# Unit Tests
Jest is used for unit testing and the ts-jest pre-processor is used to compile TypeScript tests for Jest.  In watch mode Jest will monitor changes to source files and automatically run tests related to code changes since last commit.  Jest will also pick up new test fixtures using a configurable file name convention.

File mocks for CSS Pre-processing imports in Jest:
https://facebook.github.io/jest/docs/en/webpack.html

ripple button
https://codepen.io/Ruddy/pen/09052b957d82a17bd6ca70ac6663dd6a
