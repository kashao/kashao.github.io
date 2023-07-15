---
layout: post
title: Exploring Azure Free Services, Bots, and VMs
subtitle: Discovering and utilizing Azure's free offerings for creating bots and virtual machines
tags: [Azure, Bot, VM]
comments: false
---

在這篇文章中，我想分享一下為什麼我開始接觸並試用 Azure 服務的原因，並且我盡可能地想要使用免費的服務。

我想使用 Bot 服務，一些社交平台已經提供了一些可以直接新增的機器人（例如，我在 Discord 上可以免費新增機器人）。但是，對於 Teams 平台，我需要與 Microsoft 的服務進行綁定，雖然新增機器人不需要費用，但進行進階設定需要綁定 Azure 帳戶。

我做了甚麼：

1. Create Bot Service

    申請類似社交平台上機器人的空殼。

2. Create Windows/Linux VM

    運行我的機器人所需的伺服器。

遇到的問題整理：

1. 免費服務？

    在申請帳戶時，我盡量尋找關於免費服務的相關資訊，但仍然有一些令我困惑的項目。例如，在建立 VM 時，我對可選的規格選擇感到困惑。此外，在建立 VM 時，附帶的其他服務（如公用 IP、磁碟）容易被錯誤申請，而我當初並未特別注意到這些可能需要付費的服務。

2. Windows / Linux VM 建立

    雖然我習慣使用 Windows 系統，但由於免費帳戶一開始提供的 VM 規格對我來說不太方便，我決定選擇 Linux 系統。在轉換到 Linux 後，我需要進一步了解他們的 SSH 連線設定，經過多次嘗試後，我成功地透過 user@(公用 IP) 在 VSCode 上連線。

3. Linux 上 python 的使用

    令我驚訝的是，Linux 內建了 Python，但沒有預先安裝 pip（不過可以另外安裝）。另外，內建的 Python 也沒有內建的 venv（虛擬環境），但這些都可以透過額外安裝來解決。我也需要適應一些 Windows 上指令的差異。

    ```cmd
    source venv/bin/activate
    ```

4. 在伺服器上運行 HTTPS

    我想運行一個支援 HTTPS 連線的服務，因為 Bot 服務上的某個端點需要使用 HTTPS 連線。然而，我不知道當初申請的開放 443 Port 如何使用。我以為在啟動伺服器後，它會自動開啟 443 HTTPS 連線（這部分我真的不了解，之前使用 Heroku 時並不需要這些設定）。後來我查了一下，似乎需要申請憑證來運行我的伺服器。於是我決定使用 ngrok。

5. 使用 ngrok

    使用 ngrok 相對簡單，我在 Linux 上下載了 ngrok 並申請了帳號來使用。我成功地建立了一個 HTTPS 網址，並將其設定在機器人的端點上，成功地啟動了我的機器人。

最後總結一下目前的狀況：

我成功地在 Azure 上建立了機器人並使用 VM 達成了我的目標。然而，我必須提醒自己，這些服務並不是完全免費的。公用 IP 和磁碟會產生費用，雖然一部分提供了免費額度，但相關規則仍然讓我困惑。因此，我目前會繼續使用 Bot 服務，但對於伺服器部分，我將進一步研究或尋找其他免費資源。

最後，我要提醒大家，這些服務隨時間而改變。之前的 Heroku 服務規則也有變動，所以這篇文章紀錄的是我目前的經驗，未來免費資源的可用性可能會有所改變。

Reference:

* [探索免費的 Azure 服務](https://azure.microsoft.com/zh-tw/pricing/free-services/)
* [Chatgpt](https://openai.com/)