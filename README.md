# Dart scoreboard application using React, MobX and TypeScript.
React demo app for Western MA Developers User Group

# src Folder Structure

## api
Code related to service calls such as AJAX requests or local storage.

## components
React TSX components and controls.  Higher level components will observe MobX stores while lower level components will only bind to props.

## models
Business logic and AJAX DTOs.

## stores
MobX stores that contain observable properties, computed properties, and actions.  These stores will be constructed from model objects and make service calls to API methods in actions.

# Unit Tests
Jest is used for unit testing, the ts-jest pre-processor is used to compile TypeScript tests.  In watch mode Jest will auto-detect new test fixtures and automatically run tests impacted by a code change.

File mocks for CSS Pre-processing imports in Jest:
https://facebook.github.io/jest/docs/en/webpack.html
