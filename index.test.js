const cp = require('child_process');

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  const result = cp.execSync(`node ./progress.js`);
  console.log(result);
})
