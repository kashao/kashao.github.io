---
layout: post
title: Troubleshooting PowerShell Script Execution in VSCode
subtitle: Fixing Disabled Script Execution Issue
tags: [VScode]
comments: false
---

{: .box-note}
**Note:** 狀況

我在 VSCode 中設置了 Python 虛擬環境，打開 VSCode 時會執行虛擬環境中的 Activate.ps1 腳本。然而，在終端窗口中出現了一個警告訊息。

```text
\Scripts\Activate.ps1 因為這個系統上已停用指令碼執行，所以無法載入 \Scripts\Activate.ps1 檔案。如需詳細資訊，請參閱 about_Execution_Policies，網址為 https:/go.microsoft.com/fwlink/?LinkID=135170。

```

---

{: .box-note}
**Note:** 分析問題

我之前在 Windows 10 上可以正常執行腳本，所以我懷疑這個問題可能是升級到 Windows 11 後出現的。

---

{: .box-note}
**Note:** 解決方案：啟用 PowerShell 中未受限制腳本的執行

由於正在執行的文件是 .ps1 文件，我在網上找到了兩種可能的解決方案。您可以選擇其中一種更方便的方式。

Option 1: 設定 Set-ExecutionPolicy

* 以系統管理員身份打開 PowerShell。
* 執行命令 Set-ExecutionPolicy RemoteSigned 將執行原則更改為 [Y]。
    這將允許在本地編寫的腳本文件在未簽名的情況下執行，但從遠程源下載的腳本必須由可信任的發行者簽名才能執行（參考資料）。

```text
Set-ExecutionPolicy RemoteSigned

執行原則變更
執行原則有助於防範您不信任的指令碼。如果變更執行原則，可能會使您接觸到 about_Execution_Policies 說明主題 (網址為
https:/go.microsoft.com/fwlink/?LinkID=135170) 中所述的安全性風險。您要變更執行原則嗎?
[Y] 是(Y)  [A] 全部皆是(A)  [N] 否(N)  [L] 全部皆否(L)  [S] 暫停(S)  [?] 說明 (預設值為 "N"): Y
```

注意： 變更執行原則可能會導致安全風險，請謹慎操作。有關詳細資訊，請參閱 about_Execution_Policies 說明主題（網址：https:/go.microsoft.com/fwlink/?LinkID=135170）。

```text
Set-ExecutionPolicy Default
```

注意： 將執行原則改回 Default 可能會再次引入問題，因此請謹慎使用。

Option 2: 繞過執行原則

如果您不希望全局更改執行原則，可以在每次呼叫 PowerShell 前繞過執行原則。

在終端上輸入以下命令，然後執行所需的 Python 虛擬環境中的 ps1 文件路徑。

```text
powershell -ep bypass
```

---

我找不到直接驗證腳本的方法，但您可以查閱定義的選項以獲取更多詳細資訊。

感謝提供資訊的來源。以下是供進一步調查的自我記錄參考：

AllSigned

```text
Scripts can run. ─ 腳本可以執行

Requires that all scripts and configuration files be signed by a trusted publisher, including scripts that you write on the local computer. ─ 要求所有腳本和配置文件均由受信任的發布者簽名，包括本機上編寫的腳本。

Prompts you before running scripts from publishers that you haven’t yet classified as trusted or untrusted. ─ 在運行尚未歸類為受信任或不受信任的發布者的腳本之前會提示您。

Risks running signed, but malicious, scripts. ─ 運行帶有簽名但有惡意的腳本的風險。

即僅限經過可信任的發布者簽屬才可執行
```

Bypass

```text
Nothing is blocked and there are no warnings or prompts. ─ 不進行任何阻擋，亦沒有警告或提示。

This execution policy is designed for configurations in which a PowerShell script is built in to a larger application or for configurations in which PowerShell is the foundation for a program that has its own security model. ─ 此執行原則設計用於將PowerShell腳本內置到較大的應用程序中的配置，或者用於以PowerShell為具有自己的安全模型的程序的基礎的配置。

意思是供PowerShell使用

```

Default

```text
Sets the default execution policy. ─ 設置默認的執行原則。

Restricted for Windows clients. ─ Windows客戶端採取Restricted原則。

RemoteSigned for Windows servers. ─ Windows servers端則採取RemoteSigned原則
即預設模式。

```

RemoteSigned

```text

The default execution policy for Windows server computers. ─ Windows server計算機默認的執行原則。

Scripts can run. ─ 腳本可以執行。

Requires a digital signature from a trusted publisher on scripts and configuration files that are downloaded from the internet which includes email and instant messaging programs. ─ 需要從可信任的發布者處獲得從網路上下載的腳本和配置文件的電子簽名，其中包括電子郵件和即時通訊程式。

Doesn’t require digital signatures on scripts that are written on the local computer and not downloaded from the internet. ─ 電子簽名不必在本機電腦上撰寫且並非從網路上下載。

Runs scripts that are downloaded from the internet and not signed, if the scripts are unblocked, such as by using the Unblock-File cmdlet. ─ 如果是從網路上下載且沒有被阻擋的腳本，如使用Unblock-File cmdlet，仍然執行。

Risks running unsigned scripts from sources other than the internet and signed scripts that could be malicious. ─ 執行來自非由網路上取得的腳本或已簽屬但可能具有惡意的腳本。

如果是本機電腦上撰寫的腳本檔案，不論是否簽屬，如果是來自遠端下載，則需經由可信任者處簽屬即可執行
```

Restricted

```text
The default execution policy for Windows client computers. ─ Windows客戶端計算機的默認執行原則。

Permits individual commands, but does not allow scripts. ─ 允許使用個別指令，但不允許使用腳本。

Prevents running of all script files, including formatting and configuration files (.ps1xml), module script files (.psm1), and PowerShell profiles (.ps1). ─ 阻止所有腳本文件執行，包括格式和配置文件（.ps1xml），模組腳本文件（.psm1）和PowerShell配置文件（.ps1）。

只要是腳本文件，就不可執行，惟個別指令可以

```

Undefined

```text

There is no execution policy set in the current scope. ─ 未設置任何執行策略。

If the execution policy in all scopes is Undefined, the effective execution policy is Restricted for Windows clients and RemoteSigned for Windows Server. ─ 如果所有執行原則均為未定義，則Windows客戶端及Windows Server都採取默認，即對於Windows客戶端，有效的執行原則為“Restricted”；對於Windows Server，則為“RemoteSigned”。

```

Unrestricted

```text

The default execution policy for non-Windows computers and cannot be changed. ─ non-Windows計算機默認的執行原則，且不能被更改。

Unsigned scripts can run. There is a risk of running malicious scripts. ─ 未簽屬的腳本仍可執行，具執行含惡意腳本的風險。

Warns the user before running scripts and configuration files that are not from the local intranet zone. ─ 在非本地網域執行腳本和配置文件時警告使用者
即解除所有限制，惟在非本地網域執行時僅提醒使用者。

```

---

Reference:

* [PowerShell 「系統上已停用指令碼執行」解決方法](https://hackercat.org/windows/powershell-cannot-be-loaded-because-the-execution-of-scripts-is-disabled-on-this-system)
* [解決 Windows 上輸入指令出現「因為這個系統上已停用指令碼執行，所以無法載入...」的問題](https://israynotarray.com/other/20200510/1067127387/)
* [記錄學習經過 Terminal上出現「因為這個系統上已停用指令碼執行，所以無法載入…」](https://han5227.medium.com/關於terminal上出現-因為這個系統上已停用指令碼執行-所以無法載入-14b13431df68)
* [about_Execution_Policies](https://learn.microsoft.com/zh-tw/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.3&viewFallbackFrom=powershell-7)