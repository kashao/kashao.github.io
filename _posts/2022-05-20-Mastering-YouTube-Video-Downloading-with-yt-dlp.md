---
layout: post
title: Mastering YouTube Video Downloading with yt-dlp
subtitle: Exploring a Powerful and Efficient Tool for Downloading YouTube Videos
tags: [Python, yt-dlp]
comments: false
---

這篇網誌文章介紹了 yt-dlp，一個用於從 YouTube 下載影片和音訊的強大套件。

大約一兩年前，我還在使用 youtube-dl，但當時發現下載速度太慢，且容易出現錯誤。

後來，我在網上查找後才知道原來這個套件已經停滯不前，而 yt-dlp 成為了一個活躍的分支。

本篇文章只提供了一些我常用的指令，並強調了使用 CLI 界面進行操作。

```python
pip install yt-dlp
```

**Note:** 本篇文章僅提供簡單的指令，請參考 GitHub 上的完整說明。

**Note:** 在使用 yt-dlp 時，我將 ffmpeg、ffplay 和 ffprobe 的執行檔與 yt-dlp 放在同一個資料夾中。

這些工具在合成視頻或音頻時需要使用，如果缺少這些工具，會出現錯誤，除非您已經設置了相應的環境變數。

---

{: .box-note}
**Note:** 簡單一行指令滿足我的需求

我提供了一行簡單的指令，滿足了我對於下載 YouTube 影片所需的需求。

這個指令的功能包括指定下載該影片的最佳畫質和音頻、抓取瀏覽器的 cookies、下載影片縮圖，以及以影片標題命名下載的文件。

```bash
yt-dlp -f "bv*+ba" --cookies-from-browser edge --embed-thumbnail https://youtu.be/* -o "%(title)s"
```

這是我在下載影片時通常所使用的格式，如果您有其他需要更改的部分，可以參考原始的 GitHub 文檔。

---

{: .box-note}
**Note:** 簡單解中的設定說明

簡單解中使用了一些內容，以下是這些內容的說明：

+ bv*+ba* : 下載最佳畫質和音頻。可以參考 -F 指令以了解該影片可選的不同格式。
+ --cookies-from-browser ：抓取瀏覽器的 cookies。某些影片可能需要登錄才能觀看，這個設定可以解決該問題。您可以指定要使用的瀏覽器，請參考下面的指令。
+ --embed-thumbnail：下載影片縮圖。
+ -o：後面的內容指定下載的文件名稱。有很多選項可以根據您的喜好進行更改，請參考原文。

```less
#-F, --list-formats List available formats of each video.
yt-dlp --list-formats  https://youtu.be/*

# Download the best mp4 video available, or the best video if no mp4 available
$ yt-dlp -f "bv*[ext=mp4]+ba[ext=m4a]/b[ext=mp4] / bv*+ba/b"

#--cookies-from-browser BROWSER[+KEYRING][:PROFILE] Cookies from browser
Currently supported browsers are: brave, chrome, chromium, edge, firefox, opera, safari, vivaldi.

#--embed-thumbnail Embed thumbnail in the video as cover art
```

這些是我對於 yt-dlp 的常用指令和一些設定的解釋，以及一些相關的參考資料。

Reference:

+ [yt-dlp/yt-dlp A youtube-dl fork with additional features and fixes - Github](https://github.com/yt-dlp/yt-dlp)