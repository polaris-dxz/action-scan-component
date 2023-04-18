const https = require('https');
const progress = require('./dist/progress.json')

const webhook = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=741f5819-3510-4b2c-af34-6230257189d3'

const all_coverage = `<font color="info">${progress.all.coverage}</font>`
const progress_url = 'https://our.ones.pro/wiki/#/team/RDjYMhKq/space/A6tq64xH/page/DJM3C7nL'
const progress_time = new Date().toLocaleString()

const TEXT_ALL_COVERAGE = `[组件替换进度](${progress_url})：${all_coverage} (${progress_time})\n`
let TEXT_COMPONENTS = 'P0:\n'
let TEXT_STYLE = '样式替换:\n'
let TEXT_PENDING = 'P1:\n'

const ignoreComponents = [
  '', 
  'Upload', 
  'UserTransfer', 
  'Transfer', 
  'getLocaleCode', 
  'warning', 
  'default', 
  'enUS', 
  'ja',
  'Layout', 
  'List',
  '​Upload',
]
const pendingComponents = [
  'ConfigProvider', 
  'Table', 
  'Filter', 
  'DatePicker', 
  'Steps', 
  'Collapse', 
  'Anchor', 
  'Percent', 
  'Notification', 
  'Progress', 
  'Slider'
]

const getTextCoverage = (coverage) => {
  let TEXT_COVERAGE = ''
  const coverage_num = Number(coverage.replace('%', ''))
  if (coverage_num >= 90) {
    TEXT_COVERAGE = `<font color="info">${coverage}</font>`
  } else {
    TEXT_COVERAGE = `<font color="warning">${coverage}</font>`
  }
  return TEXT_COVERAGE
}

Object.keys(progress).forEach((key) => {
  if (key !== 'all') {
    const files = Object.keys(progress[key].files).length
    const TEXT_FILES = `<font color="comment">${files}</font>`
    const coverage = progress[key].coverage
    const TEXT_COVERAGE = getTextCoverage(coverage)
    if (files !== 0 && !ignoreComponents.includes(key)) {
      if (key === 'antd') {
        TEXT_STYLE += `\`${key}\`(${TEXT_FILES}) coverage: ${TEXT_COVERAGE}\n`
      } else if (pendingComponents.includes(key)) {
        TEXT_PENDING += `\`${key}\`(${TEXT_FILES}) coverage: ${TEXT_COVERAGE}\n`
      } else {
        TEXT_COMPONENTS += `\`${key}\`(${TEXT_FILES}) coverage: ${TEXT_COVERAGE}\n`
      }     
    } 
  }
})

const content = `${TEXT_ALL_COVERAGE}${TEXT_COMPONENTS}${TEXT_PENDING}${TEXT_STYLE}`

const pushNotifications = (url, content) => {
  
  const data = JSON.stringify({
    msgtype: 'markdown',
    markdown: {
      content,
    },
  });

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const req = https.request(url, options);

  req.on('error', (e) => {
    console.log(`Notify WeChat failed: ${e.message}`);
  });

  req.end(data);
};

console.log(content)
pushNotifications(webhook, content)