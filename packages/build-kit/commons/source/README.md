# 静态文件目录规范

本文档试用于前端静态资源项目目录规范。

###  目录命名原则

HTML文件放在`${root}`下;
资源文件均放在 `#{root}/assets` 文件夹下,子目录包括但不限于:

- img: 图片。 不允许(MUST NOT) 使用image、images、imgs等。
- js: javascript脚本。 不允许(MUST NOT) 使用script、scripts等。
- css: 样式表。 不允许(MUST NOT) 使用style、styles等。

例如:
```
|____html
| |____160715_lottery.html
| |____160715_rule.html
|____assets
| |____css
| | |____160715_lottery_index.css
| | |____160715_lottery_index.css.map
| | |____160715_rule_index.css
| | |____160715_rule_index.css.map
| |____img
| | |____160715_lottery_52d628cb.png
| | |____160715_lottery_80c70a06.png
| | |____160715_lottery_b541fb17.png
| |____js
| | |____160715_lottery_index.js
| | |____160715_lottery_index.js.map
| | |____160715_rule_index.js
| | |____160715_rule_index.js.map
| | |____frms-finger-origin-min.js
```

