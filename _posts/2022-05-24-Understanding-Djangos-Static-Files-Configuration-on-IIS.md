---
layout: post
title: Understanding Django's Static Files Configuration on IIS
subtitle: Exploring the Challenges and Considerations for Serving Static Files on IIS with Django
tags: [Django, IIS]
comments: false
---

# Django 中的靜態文件配置問題

這篇網誌文章記錄了我在 IIS 上使用 Django 時遇到的靜態文件配置問題，以及我對於 STATICFILES_DIRS 和 STATIC_ROOT 的理解和思考。

## STATICFILES_DIRS 和 STATIC_ROOT 的區別

在 Django 中，STATICFILES_DIRS 和 STATIC_ROOT 兩個設定用於處理靜態文件，但它們有著不同的功能和作用。

- **STATICFILES_DIRS** 是一個列表，用於指定其他包含靜態文件的目錄。在開發過程中，Django 會在這些目錄中尋找靜態文件。這在開發階段中非常有用，可以將靜態文件分散在多個目錄中，方便管理和編輯。但在部署到生產環境時，STATICFILES_DIRS 不應該包含 STATIC_ROOT 的設定。

- **STATIC_ROOT** 是用於收集靜態文件的目錄。當執行 `collectstatic` 命令時，Django 會將所有靜態文件從 STATICFILES_DIRS 中收集到 STATIC_ROOT 中，以便在生產環境中提供靜態文件的服務。

## DEBUG 模式對靜態文件配置的影響

在 DEBUG 模式下，Django 會自動處理靜態文件的服務，並且可以直接從 STATICFILES_DIRS 中的目錄中獲取靜態文件。這使得在開發階段中，靜態文件的配置相對簡單。

然而，當 DEBUG 模式設置為 False 時，Django 不再提供靜態文件的服務，這時就需要進行靜態文件的配置。在 IIS 上部署 Django 應用程式時，可能需要進一步調整 IIS 的設定以提供靜態文件的服務。

## 靜態文件配置的複雜性

在處理 Django 的靜態文件配置時，我發現這涉及到很多不同的設定項目，如 STATIC_ROOT、STATIC_URL、STATICFILES_DIRS、STATICFILES_STORAGE、STATICFILES_FINDERS 等等。

這些設定項目在不同的場景下有不同的作用，需要仔細閱讀 Django 的官方文件以了解每個設定項目的功能和使用方法。

## 解決方案和參考資料

儘管我對於 STATICFILES_DIRS 和 STATIC_ROOT 的區別有了一些理解，但對於 DEBUG 模式與靜態文件配置的關係仍有些困惑。

在網上搜索相關資料時，我找到了一些相關討論和解決方案，可以進一步了解並解決這些問題。

以下是一些我參考的資料：

- [The staticfiles app](https://docs.djangoproject.com/en/4.0/ref/contrib/staticfiles/)
- [Differences between STATICFILES_DIR, STATIC_ROOT and MEDIA_ROOT](https://stackoverflow.com/questions/24022558/differences-between-staticfiles-dir-static-root-and-media-root)
- [Django 中STATIC_ROOT 与STATICFILES_DIRS的区别](https://www.qikqiak.com/post/django-staticroot-staticfilesdirs-function/)
- [I don't really understand how STATICFILES_DIRS and STATIC_ROOT Django settings works](https://stackoverflow.com/questions/62348013/i-dont-really-understand-how-staticfiles-dirs-and-static-root-django-settings-w)
- [Django學習教程之靜態檔案的呼叫詳解](https://codertw.com/程式語言/356962/)
- [Why does DEBUG=False setting make my django Static Files Access fail?](https://stackoverflow.com/questions/5836674/why-does-debug-false-setting-make-my-django-static-files-access-fail)