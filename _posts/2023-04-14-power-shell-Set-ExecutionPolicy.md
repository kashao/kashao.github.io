---
layout: post
title: Troubleshooting PowerShell Script Execution in VSCode
subtitle: Fixing Disabled Script Execution Issue
tags: [VScode]
comments: false
---

# 狀況

我在 VSCode 中設置了 Python 虛擬環境，打開 VSCode 時會執行虛擬環境中的 Activate.ps1 腳本。然而，在終端窗口中出現了一個警告訊息。

```text
\Scripts\Activate.ps1 因為這個系統上已停用指令碼執行，所以無法載入 \Scripts\Activate.ps1 檔案。如需詳細資訊，請參閱 about_Execution_Policies，網址為 https:/go.microsoft.com/fwlink/?LinkID=135170。
```

---

## 分析問題

我之前在 Windows 10 上可以正常執行腳本，所以我懷疑這個問題可能是升級到 Windows 11 後出現的。

---

## 解決方案：啟用 PowerShell 中未受限制腳本的執行

由於正在執行的文件是 .ps1 文件，我在網上找到了兩種可能的解決方案。您可以選擇其中一種更方便的方式。

**Option 1: 設定 Set-ExecutionPolicy**

- 以系統管理員身份打開 PowerShell。
- 執行命令 `Set-ExecutionPolicy RemoteSigned` 將執行原則更改為 [Y]。

這將允許在本地編寫的腳本文件在未簽名的情況下執行，但從遠程源下載的腳本必須由可信任的發行者簽名才能執行（參考資料）。

```text
Set-ExecutionPolicy RemoteSigned
```

注意： 變更執行原則可能會導致安全風險，請謹慎操作。有關詳細資訊，請參閱 [about_Execution_Policies](https://learn.microsoft.com/zh-tw/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.3&viewFallbackFrom=powershell-7) 說明主題。

```text
Set-ExecutionPolicy Default
```

注意： 將執行原則改回 Default 可能會再次引入問題，因此請謹慎使用。

**Option 2: 繞過執行原則**

如果您不希望全局更改執行原則，可以在每次呼叫 PowerShell 前繞過執行原則。

在終端上輸入以下命令，然後執行所需的 Python 虛擬環境中的 ps1 文件路徑。

```text
powershell -ep bypass
```

---

我找不到直接驗證腳本的方法，但您可以查閱定義的選項以獲取更多詳細資訊。

感謝提供資訊的來源。以下是供進一步調查的自我記錄參考：

- AllSigned
- Bypass
- Default
- RemoteSigned
- Restricted
- Undefined
- Unrestricted

參考資料：
- [PowerShell 「系統上已停用指令碼執行」解決方法](https://hackercat.org/windows/powershell-cannot-be-loaded-because-the-execution-of-scripts-is-disabled-on-this-system)
- [解決 Windows 上輸入指令出現「因為這個系統上已停用指令碼執行，所以無法載入...」的問題](https://israynotarray.com/other/20200510/1067127387/)
- [記錄學習經過 Terminal上出現「因為這個系統上已停用指令碼執行，所以無法載入…」](https://han5227.medium.com/關於terminal上出現-因為這個系統上已停用指令碼執行-所以無法載入-14b13431df68)
- [about_Execution_Policies](https://learn.microsoft.com/zh-tw/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.3&viewFallbackFrom=powershell-7)