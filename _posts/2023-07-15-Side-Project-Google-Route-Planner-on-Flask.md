---
layout: post
title: Google Route Planner on Flask, A Side Project Journey
subtitle: Building a custom route planner using Flask and Google Maps API
tags: [Flask, Google Maps API]
comments: false
---

# 自行架設 Flask 網站，規劃我的旅行行程

在我研究自動通知的 Twitch 專案之後已經過了一段時間。

而且隨著疫情的放鬆，我打算計劃一些旅行行程。每次都需要在 Google 地圖上逐一查找地點、確認距離和安排時間。雖然 Google 地圖已經很方便了，但有時記錄資訊仍然不太方便。

因此，我有了一個想法！

我想輸入一系列地點，並顯示這些地點之間的相對距離以及它們在地圖上的位置。最好能夠透過一個網頁來呈現這些資訊。

---

## 程式碼

關於程式碼的部分，請參閱以下連結中的 Readme 文件。我實在太懶了，所以我讓 ChatGPT 幫我生成，然後稍作修改。

其實這真的很方便，因為我並不經常撰寫這類文件。

- [Google-Route-Planner-on-Flask](https://github.com/kashao/Google-Route-Planner-on-Flask/tree/main)

---

## 困難處

透過 ChatGPT 的整理，大大縮短了搜尋資料和除錯的時間，雖然不是百分之百準確。原本可能需要花上一個禮拜的時間，現在只需短短一個小時就能完成。對於我這個程式開發的專案來說，可能只花了一個禮拜工作後的晚上時間。

- Google Map API
  - 事前的猶豫：起初我對於使用 Google Map API 並綁定 GCP 的服務有些猶豫，雖然有免費的限制，但我仍然對於可能需要付費的額外使用感到擔憂。但後來我仔細考慮後還是將我的信用卡綁定進去了。
    在之後的使用過程中，我透過閱讀網路文章學習了如何使用 Directions API 這個服務。
    （畢竟 ChatGPT 的知識截至於 2021 年 9 月，且有圖文解說更方便）
  - Python 方面：在編寫呼叫 API 的程式碼時，我使用了一個名為 googlemaps 的套件，它非常方便且整潔。
    由於 API 回傳的資料非常龐大，我依賴 ChatGPT 來整理，只需要告訴它我需要的資料即可。
    此外，我會盡可能詳細地向 ChatGPT 表達我的需求，除了自己進行除錯外，我也希望 ChatGPT 能夠提供更簡潔的寫法。
  - 意料之外的限制：在使用過程中，我遇到了一個問題，即**日本**地區的資料。這部分資料中並沒有關於大眾運輸的資訊，儘管 Google Map 理應包含這些資料。後來我上網找了一篇文章才了解到，確實無法獲取使用大眾運輸的交通時間。
- 前端設計
  - 這部分要怎麼說呢？雖然我有些前端經驗，但自己從頭開始刻前端真的很累。因此，根據自己的經驗，我明確告訴 ChatGPT 我需要的使用者界面（UI）。

  - 除了一些先前的經驗外，我實際上對於地圖的生成並不太了解，但似乎需要使用自己的 Google Map API 金鑰在 JavaScript 中繪製 Google 地圖。因此，我請求 ChatGPT 提供另一個套件，也就是 OpenStreetMap，並由 ChatGPT 教導我如何繪製地圖。然而，由於我對這個套件也不太了解，而 ChatGPT 的回答也不完全正確，所以在過程中遇到了一些錯誤，我根據自己的除錯經驗逐步找到解決方案。

---

## 結尾

在這篇文章中，我多次提到了 ChatGPT。我發現在使用它之後，我從依賴 Google 搜尋轉變為先問 ChatGPT，透過一問一答的方式，速度快得多。但同時，我也明白網頁搜索的文章仍然有其優點，不會被取代。相反地，為了獲得更準確的知識，我們需要多方閱讀，從不同來源獲取資訊。

然後，我成功地初步完成了這個專案，並且取得了我很滿意的結果。我感到非常開心，希望我能有足夠多的想法去實現我想做的事情，並追求更完美。ChatGPT 真的能夠讓我更快地跨越一些知識的門檻，成為一條捷徑。

參考資料：

- [ChatGPT](https://openai.com/)
- [Directions API](https://developers.google.com/maps/documentation/directions?hl=zh-tw)
