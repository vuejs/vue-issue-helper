module.exports = {
  _label: '中文',

  // intro
  'intro': require('./intro.md'),
  'intro-modal-title': '为什么要有这么严格的 issue 规定',
  'intro-modal': require('./intro-modal.md'),

  // bug report
  'repo-title': '相关库',
  'repo-subtitle': '请确保将 issue 发往相关的仓库。',
  'type-title': '这是一个',
  'title-title': 'Issue 标题',

  'version-title': '版本',
  'version-subtitle': '请检查问题是否存在于 Vue 的最新版本中。',

  'repro-title': '重现链接',
  'repro-subtitle': require('./repro-subtitle.md'),
  'repro-modal-title': '关于重现',
  'repro-modal': require('./repro-modal.md'),

  'browser-and-os-title': '浏览器和操作系统信息',
  'browser-and-os-subtitle': '请写明浏览器和操作系统的名称/版本，例如: Chrome 62 / Windows 10',

  'steps-title': '重现步骤',
  'steps-subtitle': require('./steps-subtitle.md'),

  'expected-title': '期望的结果是什么？',
  'actual-title': '实际的结果是什么？',
  'extra-title': '补充说明（可选）',
  'extra-subtitle': '比如：遇到这个 bug 的业务场景、上下文。',

  // feature request
  'rationale-title': '这个功能解决了什么问题？',
  'rationale-subtitle': require('./rationale-subtitle.md'),

  'proposal-title': '你期望的 API 是怎样的？',
  'proposal-subtitle': require('./proposal-subtitle.md'),

  // preview
  'preview': '预览',
  'preview-title': '预览',
  'create': '创建 Issue',

  // misc
  'bug-report': '错误报告',
  'feature-request': '功能要求',
  'similar-issues': '类似的 issue',
  'show-more': '展开',
  'show-less': '收起',
  'drop-warn': '由于 GitHub API 的限制，这里不支持图片拖拽上传功能。但是你可以先创建 issue，然后在 GitHub 的界面中上传需要的图片。'
}
