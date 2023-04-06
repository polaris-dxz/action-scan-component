const fs = require('fs')
const path = require('path')

const componentMap = {
  Icon: 'Icon',
  Action: 'Action',
  Alert: 'Alert',
  Hint: 'Alert',
  AnchorNavigation: 'Anchor',
  Avatar: 'Avatar',
  BaseAvatar: 'Avatar',
  MemberAvatar: 'Avatar',
  getAvatarUrl: 'Avatar',
  Badge: 'Badge',
  Breadcrumb: 'Breadcrumb',
  Button: 'Button',
  Card: 'Card',
  CardHeader: 'Card',
  CardWrapper: 'Card',
  LeftRightCardWrapper: 'Card',
  Cascader: 'Cascader',
  Checkbox: 'Checkbox',
  Col: 'Col',
  Collapse: 'Collapse',
  ConfigProvider: 'ConfigProvider',
  LocaleProvider: 'ConfigProvider',
  DatePicker: 'DatePicker',
  Calendar: 'DatePicker',
  PopoverCalendar: 'DatePicker',
  RangeCalendar: 'DatePicker',
  RangePicker: 'DatePicker',
  RangeRelativeDatePicker: 'DatePicker',
  RelativeDatePicker: 'DatePicker',
  RcDatePicker: 'DatePicker',
  wrapPicker: 'DatePicker',
  Divider: 'Divider',
  Drawer: 'Drawer',
  Dropdown: 'Dropdown',
  Empty: 'Empty',
  EmptyRow: 'Empty',
  Form: 'Form',
  Highlight: 'Highlight',
  Input: 'Input',
  BaseInput: 'Input',
  InputLinkify: 'Input',
  InputNumber: 'InputNumber',
  AntInputNumber: 'InputNumber',
  BaseNumberInput: 'InputNumber',
  NumberInput: 'InputNumber',
  Layout: 'Layout',
  CommonDetailLayout: 'Layout',
  CommonDetailLayoutWithMultiHead: 'Layout',
  LayoutLeftRightResizable: 'Layout',
  LeftNav: 'Layout',
  LeftNavLink: 'Layout',
  LeftNavList: 'Layout',
  LeftNavHeaderITI: 'Layout',
  LeftNavSection: 'Layout',
  LayoutMainFlow: 'Layout',
  LayoutMainFixed: 'Layout',
  LayoutMainFixedFullGap: 'Layout',
  LayoutMainFixedWide: 'Layout',
  LayoutTopMainFull: 'Layout',
  LayoutTopMainFlow: 'Layout',
  LayoutTopMainFixed: 'Layout',
  LayoutTopMainFixedCard: 'Layout',
  LayoutTopMainFixedTab: 'Layout',
  LayoutLeftMainFull: 'Layout',
  LayoutLeftMainFlow: 'Layout',
  LayoutLeftMainFixed: 'Layout',
  LayoutLeftTopMainFixed: 'Layout',
  LayoutLeftTopMainFlow: 'Layout',
  List: 'List',
  Loading: 'Loading',
  LoadingAtCenterOfParent: 'Loading',
  Menu: 'Menu',
  Modal: 'Modal',
  notification: 'Notification',
  Option: 'Option',
  DropDownUserCell: 'Option',
  PopupConfirm: 'PopupConfirm',
  Popover: 'Popover',
  ProgressBar: 'Precent',
  Progress: 'Progress',
  Radio: 'Radio',
  RadioGroup: 'Radio',
  Result: 'Result',
  Row: 'Row',
  Select: 'Select',
  OptionList: 'Select',
  OptionGroupList: 'Select',
  DropdownSelect: 'Select',
  DropdownMultiSelect: 'Select',
  DropdownSingleSelect: 'Select',
  VirtualizeSelect: 'Select',
  Skeleton: 'Skeleton',
  Slider: 'Slider',
  Space: 'Space',
  Steps: 'Steps',
  Switch: 'Switch',
  RcSwitch: 'Switch',
  Tabs: 'Tabs',
  FoldableTabs: 'Tabs',
  UrlFoldableTabs: 'Tabs',
  Tag: 'Tag',
  TimePicker: 'TimePicker',
  toast: 'Toast',
  message: 'Toast',
  Tooltip: 'Tooltip',
  Tree: 'Tree',
  importDepartmentTree: 'Tree',
  importJQTreeWithReactNode: 'Tree',
  importSelectJQTree: 'Tree',
  TreeSelect: 'TreeSelect',
  SelectAntTree: 'TreeSelect',
  SelectTree: 'TreeSelect',
  Typography: 'Typography',
  ClickableLink: 'Typography',
  Upload: '​Upload',
  AvatarUploader: '​Upload',

  FilterEditor: 'Filter',
  NewFilterEditor: 'Filter',
  SimpleCustomTaskFilterEditor: 'Filter',

  Guide: 'Guide',

  Table: 'Table',
  SimpleTable: 'Table',
  TaskList: 'Table',
  VirtualTable: 'Table',
  CanvasTable: 'CanvasTable',

  Transfer: 'Transfer',
  SelectMemberDialog: 'UserTransfer',

  User: 'UserSelect',
  UserSelect: 'UserSelect',
}
const componentNames = Object.keys(componentMap)

const invalidResult = {
  Action: {
    files: ['ones-web-common/packages/graph/src/scripts'],
  },
  Empty: {
    files: ['ones-project-web/src/scripts/ui/views/task_view/task_list/group_task_list/index.jsx'],
  },
  Input: {
    files: [
      'ones-ai-web-common/packages/components/src/scripts/logs/message/item_message_editor/item_message_input.jsx',
    ],
  },
  InputNumber: {
    files: ['ones-project-web/src/scripts/ui/views/automation/field_components'],
    packages: ['@ones-ai/widgets'],
  },
  Modal: {
    files: ['ones-ai-web-common/packages/components/src/scripts/ui/widgets/dialog'],
  },
  PopupConfirm: {
    files: [
      'ones-ai-web-common/packages/components/src/scripts/manhour/task_detail/grouped_manhour_panel_header/remaining_manhour_popover_confirm.jsx',
      'ones-ai-web-common/packages/unit/lib/popover_progress_slider/popover_progress_slider.jsx',
    ],
  },
  Radio: {
    files: ['ones-project-web/src/scripts/ui/views/view/common_view_config_edit_form/index.jsx'],
  },
  Result: {
    files: ['ones-project-web/src/scripts/ppm/scripts/ui/components/dep_dialogs'],
  },
  Skeleton: {
    files: [
      'ones-project-web/src/scripts/ui/components/project_list/view/view_layout.tsx',
      'ones-ai-web-common/packages/components/src/scripts/team/user_group/member_table',
    ],
  },
  Table: {
    files: [
      'ones-ai-web-common/packages/unit/lib/dashboard/card/special_chart_card/index.tsx',
      'ones-ai-web-common/packages/widgets/node_modules/@ones-ai/fixed-data-table-2/examples/ContextExample.js',
    ],
  },
  Tag: {
    files: [
      'ones-ai-web-common/packages/components/src/scripts/third_party/components/common/index.tsx',
    ],
    packages: ['@ones-ai/components/src/scripts/third_party/components/common'],
  },
  UserSelect: {
    files: [
      'ones-project-web/src/scripts/ui/views/automation/field_components/field_group.tsx',
      'ones-project-web/src/scripts/ui/views/component/kanban/kanban_detail_card.tsx',
      'ones-project-web/src/scripts/ui/views/task/task_field/task_field_source.ts',
      'ones-ai-web-common/packages/dao/schemas.ts',
      'ones-ai-web-common/packages/types/lib/graphql_models/manhour.ts',
    ],
    packages: ['@ones-ai/components/src/scripts/user'],
  },
}

const components = {
  all: {
    new: 0,
    old: 0,
  },
}

function dfs(targetPath) {
  const fullPath = path.resolve(targetPath)
  const files = fs.readdirSync(fullPath)
  files.forEach((name) => {
    const filePath = path.join(fullPath, name)

    // 排除无须扫描的目录
    if (/ones-ai-web-common\/packages\/onboarding/.test(filePath)) {
      return
    }

    if (filePath.includes('node_modules')) {
      return
    }

    const stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      dfs(filePath)
    }
    if (stats.isFile() && /\.(ts|tsx|js|jsx)$/.test(name)) {
      const data = fs.readFileSync(filePath, 'utf-8')
      const matchArray = [...data.matchAll(/^import +(?!type)([^'"]+) +from +['"]([^'"]*)['"]/gm)]
      matchArray.forEach((item) => {
        item[1]
          .replace(/[{}]/g, '')
          .split(',')
          .forEach((component) => {
            let name = component.trim().replace(/ .+/, '')

            // 排除无须扫描的包
            if (
              /^react|^@ones-design\/icons/.test(item[2]) ||
              (!componentNames.includes(name) && !/^antd/.test(item[2]))
            ) {
              return
            }

            name = componentMap[name] ?? name

            if (
              invalidResult[name]?.files?.some((i) => filePath.includes(i)) ||
              invalidResult[name]?.packages?.some((i) => i == item[2])
            ) {
              return
            }

            if (!components[name]) {
              components[name] = {
                new: 0,
                old: 0,
                files: {},
              }
            }
            if (/^@ones-design/.test(item[2])) {
              components[name].new++
              components.all.new++
            } else {
              components[name].files[path.relative(path.resolve(), filePath)] = item[0]
              components[name].old++
              components.all.old++
            }
          })
      })
    }
  })
}

;[
  '../ones-project-web/src',
  '../wiki-web/src',
  '../ones-ai-web-common/packages',
  '../ones-web-common/packages',
].forEach(dfs)

Object.keys(components).forEach((item) => {
  components[item].coverage =
    ((components[item].new / (components[item].new + components[item].old)) * 100).toFixed(2) + '%'
})

fs.writeFileSync(path.resolve('dist/progress.json'), JSON.stringify(components, null, 2))

module.exports = components