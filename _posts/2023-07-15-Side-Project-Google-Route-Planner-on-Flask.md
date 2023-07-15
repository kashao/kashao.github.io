---
layout: post
title: Google Route Planner on Flask, A Side Project Journey
subtitle: Building a custom route planner using Flask and Google Maps API
tags: [Flask, Google Maps API]
comments: false
---


{: .box-note}
**Note:** 前言

久偉的更新！

（過去的時間內被遊戲、模型填滿的我，然後一直不想訂閱個 Server 去跑我的 code。）

（然而，最近我的觀念有些改變，有些東西真的只有訂閱了才會方便，學習的更多。）

我終於下定決心每個月花費 20 美元訂閱 ChatGPT 這項服務。雖然它也有免費版本，但免費版本有時會受到速度和問題數量的限制。

然而，重點並不是這些，而是每當我開始接觸一個新的東西時，大部分的時間都花在了解有哪些工具可用以及閱讀冗長且晦澀的文件上。在使用 ChatGPT 輔助學習的過程中，我真的能夠大幅節省很多時間。想想其實，如果去找個家教，可能花費的錢都超過了這個費用，而且還沒有時間限制，對我來說真的非常划算。

---

{: .box-note}
**Note:** 背景

在繼之前我研究了自動通知的 Twitch 專案之後已過許久。

且隨著疫情的放鬆，我想安排一些旅行行程。每次都需要在 Google 地圖上一個一個地查找、確認相對距離和安排時間，雖然 Google 地圖已經很方便了，但在操作上有時候記錄一些資訊還是不太方便。

因此，興起了一個想法！

我想輸入一系列地點，並呈現這些地點兩兩之間的相對距離，以及它們在地圖上的位置。而且最好能夠透過個網頁來呈現這些資訊。

---

{: .box-note}
**Note:** 程式碼

程式碼的部分可以參閱網址中的 Readme，然後我超懶，我用 ChatGPT 幫我生成後，再進行修改部分

其實真的很方便，因為我並沒有寫過多少次這種文件。

* [Google-Route-Planner-on-Flask
](https://github.com/kashao/Google-Route-Planner-on-Flask/tree/main)

---

{: .box-note}
**Note:** 困難處

儘管不是百分之百準確，但透過 ChatGPT 的整理，大幅縮短了你尋找資料和除錯的時間。原本可能需要花上一個禮拜的時間，現在只需短短一個小時就能完成。而就我撰寫代碼的專案來看，可能就花了一個禮拜工作後的晚上時間。

1. Google Map API

    * 事前的猶豫：起初我對於使用 Google Map API 並綁定 GCP 的服務有些猶豫，雖然有免費的限制，但我仍然對於可能需要付費的額外使用感到擔憂。但後來我仔細考慮後還是將我的信用卡綁定進去了。

        在之後的使用過程中，我透過閱讀網路文章學習了如何使用 Directions API 這個服務。

        （畢竟 ChatGPT 的知識截至於 2021 年 9 月，且有圖文解說更方便）

    * Python 方面：在編寫呼叫 API 的程式碼時，GPT-4 提供了一個名為 googlemaps 的套件，使用起來非常方便整潔。

        由於 API 回傳的資料非常龐大，我依賴 ChatGPT 來整理，只需要告訴它我需要的資料即可。

        此外，我會盡可能詳細地向 ChatGPT 表達我的需求，除了自己進行除錯外，我也希望 ChatGPT 能夠提供更簡潔的寫法。

    * 意料之外的限制：在使用過程中，我遇到了一個問題，即**日本**地區的資料。這部分資料中並沒有關於大眾運輸的資訊，儘管 Google Map 理應包含這些資料。後來我上網找了一篇文章才了解到，確實無法獲取使用大眾運輸的交通時間。

2. Front-End

    這部分要怎麼說呢？雖然我有些前端經驗，但自己刻前端出來還真的是很累，所以我依賴自己的經驗，明確地告訴 ChatGPT 我需要的 UI。

    除了一些先前的經驗外，對於地圖的生成我實際上並不太了解，但似乎需要使用自己的 Google Map API 金鑰刻在 JavaScript 內來繪製 Google 地圖，因此我請求 ChatGPT 提供另一個套件使用 - OpenStreetMap，並由 ChatGPT 教導我如何繪製地圖。然而，由於我對這個套件也不太了解，且 ChatGPT 的回答不是完全正確，所以在過程中遇到了一些錯誤，根據自己的除錯經驗逐步找到解決方案。

---

{: .box-note}
**Note:** 結尾

在這篇文章中，我多次提到了 ChatGPT。我發現在使用了它之後，我的使用習慣也從依賴 Google 搜尋轉為先問 ChatGPT。老實說，透過一問一答的方式，相比於一篇篇文章的搜索，速度快得多。但同時，我也明白網頁搜尋的文章仍然有其優點，並不會被取代。相反地，為了獲得更準確的知識，我們需要多方閱讀，從不同來源獲取資訊。

然後，我成功地初步完成了這個專案，並且取得了我很滿意的結果。我感到非常開心，希望我能有足夠多的想法去實現我想做的事情，並追求更完美。ChatGPT 真的能夠讓我更快地跨越一些知識的門檻，成為一條捷徑。

---

Reference:

* [Chatgpt](https://openai.com/)
* [Directions API](https://developers.google.com/maps/documentation/directions?hl=zh-tw)