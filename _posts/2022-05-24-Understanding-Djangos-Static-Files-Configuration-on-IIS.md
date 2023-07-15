---
layout: post
title: Understanding Django's Static Files Configuration on IIS
subtitle: Exploring the Challenges and Considerations for Serving Static Files on IIS with Django
tags: [Django, IIS]
comments: false
---

這篇網誌文章是關於我在 IIS 上使用 Django 的靜態文件配置後的思考。

一開始我設定了 STATICFILES_DIRS 和 STATIC_URL，然後又需要設定 STATIC_ROOT。

但是 STATICFILES_DIRS 不應包含 STATIC_ROOT 的設定。

```css
The STATICFILES_DIRS setting should not contain the STATIC_ROOT setting.
```

我思考了很久，不知道這兩者有什麼不同！？

另外，我使用的是 Django 4 版本。

---

{: .box-note}
**Note:** 跟 DEBUG = True 有關！？

也許有一天當我關閉 DEBUG 模式時，可以試試看。

根據我目前看到的文件說明，STATIC_ROOT 只在 DEBUG = True 的情況下使用。

當使用 collectstatic 指令時，靜態文件會被收集到 STATIC_ROOT 資料夾中。

但是...如果我的應用程序已經在同一個資料夾中了，為什麼還要這麼做呢？

之前我查過 Django 樹狀結構的規範，但沒有固定的答案。

但我擔心 DEBUG 模式的差異是否會影響設定的正常使用 Orz

在 DEBUG = True 的情況下，文件說明認為這種設定方式效率低下並且可能不安全 :(

[Static file development view](https://docs.djangoproject.com/en/4.0/ref/contrib/staticfiles/#static-file-development-view)

是否有人可以給我解答呢（？也許只能自己試試看了

---

{: .box-note}
**Note:** 靜態文件配置真的很複雜

一查文檔，我才意識到靜態文件配置涉及到很多的設定。

本來我以為只要理解 STATICFILES_DIRS 和 STATIC_ROOT 就可以了，但文檔告訴我還有其他的選項！

+ STATIC_ROOT
+ STATIC_URL
+ STATICFILES_DIRS
+ STATICFILES_STORAGE
+ STATICFILES_FINDERS

...

我決定先試試看 DEBUG 模式的差異該怎麼處理。

儘管我自己試了很多次都沒有成功，但我看到有篇文章說，可以嘗試以下命令或安裝某個套件。

```python
manage.py runserver --insecure
```

雖然我更喜歡使用 CDN 解決方案。

畢竟別人已經編寫了漂亮的 CSS 和 JS，作為一個新手，我應該乖乖使用它們。

只希望公司不要封鎖這些資源。

而且還有媒體文件需要處理。

結果，根據上週我發布的文章，如果我將 DEBUG 設置為 False，那麼似乎在 IIS 上仍然需要進行一些配置。

---

Reference:

+ [The staticfiles app](https://docs.djangoproject.com/en/4.0/ref/contrib/staticfiles/)

+ [Differences between STATICFILES_DIR, STATIC_ROOT and MEDIA_ROOT](https://stackoverflow.com/questions/24022558/differences-between-staticfiles-dir-static-root-and-media-root)

+ [Django 中STATIC_ROOT 与STATICFILES_DIRS的区别](https://www.qikqiak.com/post/django-staticroot-staticfilesdirs-function/)

+ [I don't really understand how STATICFILES_DIRS and STATIC_ROOT Django settings works](https://stackoverflow.com/questions/62348013/i-dont-really-understand-how-staticfiles-dirs-and-static-root-django-settings-w)

+ [Django學習教程之靜態檔案的呼叫詳解](https://codertw.com/程式語言/356962/)
 [Why does DEBUG=False setting make my django Static Files Access fail?](https://stackoverflow.com/questions/5836674/why-does-debug-false-setting-make-my-django-static-files-access-fail)
