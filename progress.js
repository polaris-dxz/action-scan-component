const fs = require('fs')
const path = require('path')

const componentMap = {
  Icon: 'Icon',
  Action: 'Action',
  Alert: 'Alert',
  Hint: 'Alert',
  Anchor: 'Anchor',
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
  BaseCheckbox: 'Checkbox',
  NewCheckbox: 'Checkbox',
  SquareCheckbox: 'Checkbox',
  Col: 'Col',
  Collapse: 'Collapse',
  ConfigProvider: 'ConfigProvider',
  Antd2LocaleProvider: 'ConfigProvider',
  LocaleProvider: 'ConfigProvider',
  // 自己实现的 ConfigProvider，与组件库无关
  // OutsideClickProvider: 'ConfigProvider',
  DatePicker: 'DatePicker',
  Calendar: 'DatePicker',
  PopoverCalendar: 'DatePicker',
  RangeCalendar: 'DatePicker',
  RangePicker: 'DatePicker',
  RangeRelativeDatePicker: 'DatePicker',
  RelativeDatePicker: 'DatePicker',
  RcDatePicker: 'DatePicker',
  wrapPicker: 'DatePicker',
  DateRangeInput: 'DatePicker',
  DateRangeInfoFragment: 'DatePicker',
  Divider: 'Divider',
  Drawer: 'Drawer',
  Dropdown: 'Dropdown',
  Empty: 'Empty',
  EmptyRow: 'Empty',
  Form: 'Form',
  Highlight: 'Highlight',
  Input: 'Input',
  BaseInput: 'Input',
  BaseTextarea: 'Input',
  InputLinkify: 'Input',
  SearchInput: 'Input',
  TextInput: 'Input',
  Textarea: 'Input',
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
  Percent: 'Percent',
  ProgressBar: 'Percent',
  PopupConfirm: 'PopupConfirm',
  Popover: 'Popover',
  Progress: 'Progress',
  Radio: 'Radio',
  RadioGroup: 'Radio',
  // 暂无对应组件
  // iconRadioFactory: 'Radio',
  // radioGroupFactory: 'Radio',
  Result: 'Result',
  Row: 'Row',
  Select: 'Select',
  EnhanceSelect: 'Select',
  OptionGroupList: 'Select',
  DropdownSelect: 'Select',
  DropdownMultiSelect: 'Select',
  DropdownSingleSelect: 'Select',
  VirtualizeSelect: 'Select',
  // FilterableSelect: 'Select',
  Skeleton: 'Skeleton',
  Slider: 'Slider',
  Space: 'Space',
  Steps: 'Steps',
  Switch: 'Switch',
  RcSwitch: 'Switch',
  Tabs: 'Tabs',
  FoldableTabs: 'Tabs',
  TextFoldableTabs: 'Tabs',
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

  Filter: 'Filter',
  FilterEditor: 'Filter',
  NewFilterEditor: 'Filter',
  SimpleCustomTaskFilterEditor: 'Filter',

  Guide: 'Guide',

  Table: 'Table',
  FilterableTable: 'Table',
  SimpleTable: 'Table',
  TaskList: 'Table',
  VirtualTable: 'Table',
  CanvasTable: 'CanvasTable',
  createAdapter: 'Table',

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
  Avatar: {
    files: ['ones-ai-web-common/packages/unit/lib/common_topbar/topbar_right/index.tsx'],
  },
  Anchor: {
    files: [
      // 底层逻辑已用组件库实现  https://github.com/BangWork/ones-design/issues/490#issuecomment-1541325468
      'ones-project-web/src/scripts/ui/views/layout_editor/screen/components/form_root.jsx',
      'ones-ai-web-common/packages/components/src/scripts/ui/views/global_add/task_edit_dialog/index.tsx',
    ],
  },
  Empty: {
    files: [
      'ones-project-web/src/scripts/ui/views/task_view/task_list/group_task_list/index.jsx',
      'ones-ai-web-common/packages/widgets/src/scripts/field_input/index.tsx',
    ],
  },
  Input: {
    files: [
      'ones-ai-web-common/packages/components/src/scripts/logs/message/item_message_editor/item_message_input.jsx',
      // 底层引用已用过 ones-design  https://github.com/BangWork/ones-design/issues/490#issuecomment-1514215212
      'ones-project-web/src/scripts/ui/components/project_list/main.tsx',
    ],
  },
  InputNumber: {
    files: [
      'ones-project-web/src/scripts/ui/views/automation/field_components',
      'ones-ai-web-common/packages/widgets/src/scripts/field_input',
    ],
    packages: ['@ones-ai/widgets'],
  },
  Loading: {
    packages: [
      '@ones-ai/components/src/scripts/ui/views/task_view/task_list/static_table_list/loading',
    ],
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
  Select: {
    files: [
      // 暂时无法替换，无对应 OptionList 组件
      'ones-ai-web-common/packages/devops/src/scripts/ui/views/configuration/pipeline_config_dialog/ci_select_dialog.tsx',
      // 暂时无法替换，无对应 OptionList 组件
      'ones-ai-web-common/packages/devops/src/scripts/ui/views/configuration/pipeline_config_dialog/repo_select_dialog.tsx',
    ],
  },
  Skeleton: {
    files: [
      'ones-project-web/src/scripts/ui/components/project_list/view/view_layout.tsx',
      'ones-ai-web-common/packages/components/src/scripts/team/user_group/member_table',
    ],
  },
  Tree: {
    files: [
      // 组件库不支持虚拟滚动的 Tree 组件，不在上半年替换计划中 https://github.com/BangWork/ones-design/issues/490#issuecomment-1506245418
      'ones-project-web/src/scripts/product/scripts/ui/views/product_detail/product_module/module_draggable_tree.jsx',
      'ones-ai-web-common/packages/components/src/scripts/select_member_dialog/select_member_dialog.jsx',
      'ones-ai-web-common/packages/components/src/scripts/team/team_department/department_index.jsx',
      'ones-ai-web-common/packages/components/src/scripts/ui/views/task/related_wiki/add_related_wiki/wiki_choose_tree.jsx',
      'ones-ai-web-common/packages/components/src/scripts/wiki/category-draggable_tree.jsx',
      'ones-ai-web-common/packages/testcase/src/scripts/ui/components/testmodule/module_tree/library_module_draggable_tree.jsx',
      'ones-ai-web-common/packages/wiki/src/scripts/ui/components/space/common_page_tree.jsx',
      'ones-ai-web-common/packages/wiki/src/scripts/ui/components/space/page_tree_draggable.jsx',
    ],
  },
  TreeSelect: {
    files: [
      // 需要替换成 Menu 组件，Menu 组件不支持选中父节点自动展开
      'ones-ai-web-common/packages/testcase/src/scripts/ui/views/test_plan/create_test_report_dialog/test_plan_picker/sprint_tree/sprint_tree.jsx',
    ],
  },
  Tooltip: {
    files: [
      // ones-web-common grpah 中的组件无法替换
      'ones-web-common/packages/graph/src/scripts/application/workflow/shapes/status_node_tooltip.jsx',
    ],
  },
  Checkbox: {
    files: [
      // ones-web-common grpah 中的组件无法替换
      'ones-web-common/packages/graph/src/scripts/application/workflow/task_status_transition_graph_toolbar.tsx',
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
  antd: {
    files: [
      // eslint 规则
      'ones-web-common/packages/eslint-config/index.js',
      'ones-web-common/packages/eslint-plugin-checkzh/lib/rules/no-antd-classname.js',
      // Menu 组件替换后样式会移除
      'ones-ai-web-common/packages/components/src/scripts/topbar/product_list.jsx',
      'ones-ai-web-common/packages/unit/lib/left_nav_advance/LeftNavHeader.tsx',
      'ones-ai-web-common/packages/widgets/src/scripts/custom_dropdown_select.jsx',
      'ones-ai-web-common/packages/widgets/src/scripts/dropdown_menu.jsx',
      'ones-ai-web-common/packages/widgets/src/scripts/filterable_menu/filterable_menu__deprecated.jsx',
      'ones-ai-web-common/packages/widgets/src/scripts/layout/foldable_tabs.jsx',
      // Tree 组件替换后样式会移除
      'ones-ai-web-common/packages/components/src/scripts/ui/views/task/related_wiki/add_related_wiki/wiki_choose_tree.jsx',
      'ones-ai-web-common/packages/editor/src/scripts/plugins/toc/page_choose_tree.jsx',
      'ones-ai-web-common/packages/editor/src/scripts/plugins/toc/title_insert_content.jsx',
      'ones-ai-web-common/packages/editor/src/scripts/plugins/toc/toc_content/page_table_of_content.jsx',
      'ones-ai-web-common/packages/editor/src/scripts/plugins/toc/toc_content/title_table_of_content.jsx',
      'ones-ai-web-common/packages/widgets/src/scripts/select_tree/select_anttree.jsx',
      // Transfer 组件替换后样式会移除
      'ones-ai-web-common/packages/widgets/src/scripts/transfer/index.jsx',
      // RC Calendar 组件替换后样式会移除
      'ones-ai-web-common/packages/unit/lib/antd/date-picker/range_picker.jsx',
      'ones-ai-web-common/packages/unit/lib/antd/popover_calendar.jsx',
      'ones-ai-web-common/packages/unit/lib/dashboard/component/info_fragments/date_range_info_fragment.jsx',
      'ones-ai-web-common/packages/widgets/src/scripts/antd/popover_calendar.jsx',
      // Table 组件替换后样式会移除
      'ones-project-web/src/scripts/product/scripts/ui/views/product_detail/product_module/index.jsx',
    ],
  },
  DatePicker: {
    files: [
      // 底层已用组件库实现
      '../ones-ai-web-common/packages/components/src/scripts/ui/views/filter/add_filter_query_content/index.jsx',
      '../ones-ai-web-common/packages/components/src/scripts/ui/widgets/input/field_datetime_input.jsx',
      '../ones-ai-web-common/packages/widgets/src/scripts/input/index.js',
      '../ones-ai-web-common/packages/widgets/src/scripts/input/range_relative_date_picker.jsx',
    ]
  }
}
const ignorePath = ['node_modules', 'ones-ai-web-common/packages/onboarding']

const args = process.argv.slice(2)
// 忽略组件不计入总替换进度
const ignoreComponents = args.length > 0 ? [
  'Layout' ,
  'List',
  '​Upload',
  'UserTransfer',
  'Transfer'
] :[] 

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
    if (ignorePath.some((path) => filePath.includes(path))) {
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
              if (!ignoreComponents.includes(name)) {
                components.all.new++
              }
            } else {
              components[name].files[path.relative(path.resolve(), filePath)] = item[0]
              components[name].old++
              if (!ignoreComponents.includes(name)) {
                components.all.old++
              }
            }
          })
      })

      // 样式扫描
      const styleMatchArray = [...data.matchAll(/(?<!\w)ant(-.*(?=['|"])|\/.*\s)/gm)]
      styleMatchArray.forEach((item) => {
        const name = 'antd'
        if (!components[name]) {
          components[name] = {
            new: 0,
            old: 0,
            files: {},
          }
        }
        if (
          invalidResult[name]?.files?.some((i) => filePath.includes(i)) ||
          invalidResult[name]?.packages?.some((i) => i == item[2])
        ) {
          return
        }
        components[name].files[path.relative(path.resolve(), filePath)] = item[0]
        components[name].old++
        // 样式扫描进度不影响总替换进度
        // components.all.old++
      })
    }
  })
}

const getAiCommonPath = () => {
  const aiCommon = '../ones-ai-web-common/packages'
  if (fs.existsSync(aiCommon)) {
    return [aiCommon]
  } else {
    const projectAiCommon = '../ones-project-web/ones-ai-web-common'
    const wikiAiCommon = '../wiki-web/ones-ai-web-common'

    const commons = []
    ;[projectAiCommon, wikiAiCommon].forEach((c) => {
      if (!fs.existsSync(c)) {
        console.error(`${c} not exists`)
      } else {
        commons.push(c)
      }
    })

    const refs = commons.map((c) => c + '/.git/HEAD')
    if (refs.length > 1) {
      const projectRef = fs.readFileSync(refs[0], 'utf-8')
      const wikiRef = fs.readFileSync(refs[1], 'utf-8')
      if (projectRef !== wikiRef) {
        console.error(
          `请将 project 和 wiki 中的 common 库指定为同一分支!\nproject ${projectRef}wiki ${wikiRef}`
        )
        process.exit(1)
      }
    }
    return commons.map((c) => c + '/packages')
  }
}

;[
  '../ones-project-web/src',
  '../wiki-web/src',
  '../ones-web-common/packages',
  ...getAiCommonPath(),
].forEach(dfs)

Object.keys(components).forEach((item) => {
  components[item].coverage =
    ((components[item].new / (components[item].new + components[item].old)) * 100).toFixed(2) + '%'
})
fs.writeFileSync(path.resolve('dist/progress.json'), JSON.stringify(components, null, 2))
