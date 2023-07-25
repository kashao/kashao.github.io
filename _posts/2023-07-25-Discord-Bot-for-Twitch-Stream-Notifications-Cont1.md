---
layout: post
title: StreamAlert, A Discord Bot for Twitch Stream Notifications (Cont.)
subtitle: Utilizing Python, Discord.py, and TwitchAPI to Keep Up with Your Favorite Streamers
tags: [Discord, Twitch]
comments: false
---

# 使用 Discord Bot 通知 Twitch 直播

本文是我前一篇文章的延伸，我在此進行了一些改進，特別是在使用 Server 和 Channel id 來進行各個伺服器設定的部分。換句話說，無論是命令（command）或是直播主（streamers），我們都可以在不同的伺服器上進行個別的設定。

這些功能在我個人的專案中已經足夠實用，我覺得已經滿足了我個人的需求。若我有新的想法或是想要嘗試的 Discord bot 功能，我會透過開設新的專案來進行實驗和探索。

相關說明已在前篇文章撰寫 [StreamAlert, A Discord Bot for Twitch Stream Notifications](https://kashao.github.io/2023-07-18-Discord-Bot-for-Twitch-Stream-Notifications/)

## 關於各個檔案的說明

1. `db_manager.py`：此模塊定義了一個名為 `DBManager` 的類別，該類別用於管理 SQLite 數據庫的連接和交互。它主要負責建立數據庫表格、添加和刪除數據、以及查詢數據等操作。數據庫包含了三個表格：streamers、commands 和 servers_channels。

2. `main.py`：此模塊是整個專案的入口點，它創建並運行了一個 `DiscordBot` 實例。

3. `config_loader.py`：此模塊定義了一個名為 `ConfigLoader` 的類別，該類別用於加載配置文件（`config.yml`）的內容。

4. `twitch_bot.py`：此模塊定義了一個名為 `TwitchBot` 的類別，該類別用於與 Twitch API 進行交互。它主要負責檢查和更新 OAuth token、檢查 Twitch 用戶的狀態等操作。

5. `discord_bot.py`：此模塊定義了一個名為 `DiscordBot` 的類別，該類別用於與 Discord API 進行交互。它主要負責監聽和處理 Discord 的事件、發送訊息、以及啟動和管理 Twitch 用戶狀態的檢查等操作。

以下是每個模塊的詳細說明：

## `db_manager.py`

這個檔案定義了一個 `DBManager` 類別，用於處理與 SQLite 數據庫的交互。這個類別提供了許多方法，包括：

- `create_tables`：創建數據庫表格。
- `add_streamer`：向數據庫添加一個 Twitch streamer。
- `remove_streamer`：從數據庫移除一個 Twitch streamer。
- `list_streamers`：列出所有被監控的 Twitch streamers。
- `get_last_notified_at`：獲取最後一次發送通知的時間。
- `set_last_notified_at`：設置最後一次發送通知的時間。
- `add_command`：向數據庫添加一個命令和其對應的回應。
- `remove_command`：從數據庫移除一個命令。
- `list_commands`：列出所有的命令和其對應的回應。
- `get_channel_id`：獲取一個服務器的頻道 ID。
- `add_server_channel`：向數據庫添加一個服務器和其對應的頻道 ID。
- `remove_server_channel`：從數據庫移除一個服務器和其對應的頻道 ID。

## `main.py`

這個檔案是專案的主要入口點。它創建了一個 `ConfigLoader` 實例來讀取配置，創建了一個 `DBManager` 實例來管理數據庫，然後創建了一個 `DiscordBot` 實例並運行它。

## `config_loader.py`

這個檔案定義了一個 `ConfigLoader` 類別，用於讀取 YAML 格式的配置文件。它在初始化時打開 `config.yml` 檔案，並用 `yaml.safe_load` 方法讀取其內容。

## `twitch_bot.py`

這個檔案定義了一個 `TwitchBot` 類別，用於與 Twitch API 進行交互。這個類別提供了許多方法，包括：

- `read_json` 和 `write_json`：讀取和寫入 JSON 檔案。
- `check_token` 和 `fetch_new_token`：檢查和獲取 OAuth token。
- `check_user`：檢查一個 Twitch 用戶的狀態。

## `discord_bot.py`

這個檔案定義了一個 `DiscordBot` 類別，用於與 Discord API 進行交互。這個類別提供了許多方法，包括：

- `update_commands_dict`：更新命令字典。
- `add_streamer_command`、`remove_streamer_command` 和 `list_streamers_command`：用於添加、移除和列出 Twitch streamers 的命令。
- `add_command_command` 和 `remove_command_command`：用於添加和移除命令的命令。
- `remove_server_channel_command` 和 `add_server_channel_command`：用於移除和添加服務器頻道的命令。
- `_live_notifs_loop`：一個無限迴圈，用於定期檢查 Twitch 用戶的狀態並發送通知。
- `on_ready`：當 bot 準備就緒時觸發的事件處理器。
- `on_message`：當收到消息時觸發的事件處理器。
- `run`：啟動 bot 的方法。

這些模塊一起工作，提供了一個可以監控 Twitch 用戶狀態並在 Discord 上發送通知的功能。它還允許用戶透過

 Discord 命令來管理被監控的 Twitch 用戶列表。
