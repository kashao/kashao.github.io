---
layout: post
title: Troubleshooting Static File Display Issues on Django with IIS
subtitle: Overcoming Challenges in Serving Static Files and Embracing Django's Documentation
tags: [Django, IIS]
comments: false
---

這篇網誌文章記錄了我在處理靜態文件問題時遇到的困境。

靜態文件，如網頁的 CSS 和 JavaScript 檔案，對於美化網站至關重要。

然而，問題出在原本在本地運行時，顯示正常，但將 Django 部署到 IIS 上後...

出現了顯示設定的問題。

在網路上查找後，發現有人說無法找到靜態文件，但我試過了所有方法，都沒有用。

我使用的作業系統是 Windows 2018 Server，並且按照公司的說明使用了 HTTPS 認證上線。

---

{: .box-note}
**Note:** 一種方法試不了你有試第二次嗎？

其實，我在網上找到了幾種方法，就在 Stack Overflow 上搜尋關鍵字

"IIS, Django, Static"，能找到的方法就那幾種。

我試了所有方法，但都沒有用。

儘管可能因為不同的時空背景有所不同。

我嘗試過新增虛擬目錄、應用程式，甚至試過新增資料夾權限，但都無法成功...

暫時使用 CDN 解決了問題，但我還是擔心這樣是否安全。如果公司封鎖了 CDN，那該怎麼辦呢？

---

{: .box-note}
**Note:** 問，問就是直接看 Django 的 doc

結果問題不在於 Django 的設定，而是需要調整 IIS 的設定。

反正只需要調整一下 IIS 的前置作業和 WSGI 等，就不需要進行其他操作了。

[How to manage static files (e.g. images, JavaScript, CSS)](https://docs.djangoproject.com/en/4.0/howto/static-files/)

對，就是這篇文件，我成功地在 IIS 上取得了靜態文件。

再次深刻體認到**好的**文件真的很有用。

這篇網誌文章記錄了我在處理 Django 與 IIS 上靜態文件顯示問題時的困境，並最終通過閱讀 Django 的文件成功解決了問題。

Reference:

+ [How to manage static files (e.g. images, JavaScript, CSS)](https://docs.djangoproject.com/en/4.0/howto/static-files/)