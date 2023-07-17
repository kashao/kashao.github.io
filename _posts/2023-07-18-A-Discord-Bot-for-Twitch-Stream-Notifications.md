---
layout: post
title: StreamAlert, A Discord Bot for Twitch Stream Notifications
subtitle: Utilizing Python, Discord.py, and TwitchAPI to Keep Up with Your Favorite Streamers
tags: [Discord, Twitch]
comments: false
---

# 使用 Discord Bot 通知 Twitch 直播

在這篇文章中，我將分享我建立的一個 Discord Bot，並讓它在 Twitch 頻道開始直播時通知，總之目前是有個像樣的結果出來。

使用 Python 語言進行開發，並利用 Discord 和 Twitch 的 API。

## 開始之前

相關程式碼已放置在我的 GitHub 頁面 [DiscordStreamerAlert](https://github.com/kashao/DiscordStreamerAlert)

確保你已經擁有 Python 3.11 和 pip 的開發環境，並且安裝了下列的 Python 套件:

```shell
pip install -r requirements.txt
```

以及申請相關的 Twitch API 和 Discord bot 的使用

```yaml
twitch:
  client_id: YOUR_TWITCH_CLIENT_ID
  client_secret: YOUR_TWITCH_CLIENT_SECRET
  redirect_uri: YOUR_TWITCH_REDIRECT_URI
  token_url: https://id.twitch.tv/oauth2/token
  user_api: https://api.twitch.tv/helix/users?id={}
  stream_url: https://www.twitch.tv/{}

discord:
  channel: YOUR_DISCORD_CHANNEL_ID

connection:
  Discord bot token: YOUR_DISCORD_BOT_TOKEN```
```

## Discord Bot 的建立

首先，你需要在 Discord 的開發者平台創建一個新的 Bot，並取得它的 token。記下這個 token，在程式中會使用到它。

以下是一個 Discord bot 的簡單範例：

```python
from discord.ext import commands

bot = commands.Bot(command_prefix='!')

@bot.command()
async def hello(ctx):
    await ctx.send('Hello, world!')

bot.run('<your-token-goes-here>')
```

在這個例子中，創建了一個新的 bot，並使用了 "!" 作為指令的前綴。也添加了一個新的指令 "hello"，當用戶輸入 "!hello" 時，Bot 就會回覆 "Hello, world!"。

最後，使用在 Discord 開發者平台取得的 token 來啟動 Bot。

## Twitch 直播通知

為了監控 Twitch 的直播狀態，需要使用 Twitch 的 Helix API。為此，需要在 Twitch 的開發者平台建立一個新的應用程式並獲得其 Client ID 和 Client Secret。

接著，使用 `TwitchBot.check_user` 與 Twitch API 進行交互。它會檢查一個 Twitch 用戶是否正在直播。

## 結合 Discord Bot 和 Twitch 直播通知

有了以上的兩個部分，可以將他們結合起來，讓 Discord Bot 在 Twitch 頻道開始直播時發送通知。

將會使用 `discord.ext.tasks` 中的 `loop` 裝飾器來建立一個每 10 秒執行一次的背景任務，這個任務會檢查 Twitch 頻道的直播狀態，並在頻道開始直播時發送通知。

```python
from discord.ext import tasks

class MyBot(commands.Bot):
    def __init__(self):
        super().__init__(command_prefix='!')
        self.live_notifs_loop.start()

    @tasks.loop(seconds=10)
    async def live_notifs_loop(self):
        # Twitch 直播狀態檢查和 Discord 通知的程式碼放在這裡
```

在 `live_notifs_loop` 方法中，你需要將檢查 Twitch 直播狀態並發送 Discord 通知的程式碼放在這裡。

綜上所述，使用 Discord Bot 來接收 Twitch 直播通知是一個很方便的功能。在本文中，學習了如何使用 Python、Discord.py 和 TwitchAPI 來實現這個功能。希望這篇文章能夠對你有所幫助！

## 結尾

在文章的結尾，我想提及一些將來可能會考慮新增的功能。目前，streamer 和commands 的資料都存儲在 SQLite 中，可以通過操作這些命令來實現添加或刪除功能。同時，我正在思考是否要把部分指令移至伺服器端或者用戶的私人訊息。

再者，在考慮在 SQLite 中處理 server 和 channel 的設定，以滿足不同伺服器的需求。儘管目前這個項目還處於個人使用階段並且只是個人娛樂，但希望能夠使其功能更加豐富。期待繼續努力優化並增加更多新的功能。

## 參考資源

- [Discord Bot 開發文檔](https://discordpy.readthedocs.io/en/stable/)
    在開發這個專案時，大量使用了 Discord Bot 的相關技術。上述連結是其官方文檔，詳細介紹了如何使用和開發 Discord Bot。
- [Discord Developer Platform](https://discord.com/developers/docs/intro)
- [Twitch API 文檔](https://dev.twitch.tv/docs)
    專案也運用到了 Twitch API 來進行直播狀態的監控和相關通知的發送。Twitch 提供了非常完整的 API 文檔，上述連結可以幫助你理解其工作原理並應用在你的專案中。
