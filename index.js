const core = require('@actions/core');
const componentsResult = require('./progress.js');

// most @actions toolkit packages have async methods
async function run() {
  try {
    core.setOutput('result', componentsResult);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
