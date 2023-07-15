---
layout: post
title: Dynamic Time Display on Webpages
subtitle: Exploring JavaScript's Date Object
tags: [JavaScript]
comments: false
---

以下是一篇關於在網頁上取得使用者當前時間的 JavaScript 代碼：

HTML:

```html
<span id="clock"></span>
```

JavaScript：

```javascript
<script type="text/javascript">
    var clockElement = document.getElementById('clock');

    function clock() {
        clockElement.textContent = new Date().toString();
    }

    setInterval(clock, 1000);
</script>
```

JavaScript：

```javascript
<script type="text/javascript">
    var clockElement = document.getElementById('clock');

    function clock() {
        var date = new Date();

        // Replace '400px' below with where you want the format to change.
        if (window.matchMedia('(max-width: 400px)').matches) {
            // Use this format for windows with a width up to the value above.
            clockElement.textContent = date.toLocaleString();
        } else {
            // While this format will be used for larger windows.
            clockElement.textContent = date.toString();
        }
    }

    setInterval(clock, 1000);
</script>
```

這兩段代碼的差異在於時間的顯示方式：

toLocaleString()：使用本地化的格式來顯示時間。
toString()：使用預設的格式來顯示時間。

詳細的格式可以參考 [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)

Reference:

* [Is there an easier way to display live time and date in HTML using bootstrap?](https://stackoverflow.com/questions/61280319/is-there-an-easier-way-to-display-live-time-and-date-in-html-using-bootstrap)