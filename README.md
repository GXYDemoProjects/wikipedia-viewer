# WikipediaViewer

It is the same as the FreeCodeCampus [Wikipedia Viwer project][1] for learning.

Some improvements:
1. Since 'bourbon' scss libarary have many deprecated features, modify the css
2. $http service for v1.6 have changed much from v1.2, so the ajax is better
to be realized with jQuery.
3. The original webpack.config.js in [this project][2] is hard to understand straightly,
so refactor the webpack config to be more friendly.

To be done:
1. Unit test
2. E2E test

## my-theme
The branch my_theme is a new theme based on the master. And I made some optimization
such as decrease the unnecessary dom manipulation in angular.controller.

![img][3]

[1]: https://codepen.io/freeCodeCamp/full/wGqEga
[2]: https://github.com/GuoXiaoyang/ShowLocalWeather
[3]: http://static.zybuluo.com/guoxiaoyang/bgrar1yn3n9ju8c3qbc85w9b/image_1bker5hsm16qhk541a9i1f0o1lq99.png