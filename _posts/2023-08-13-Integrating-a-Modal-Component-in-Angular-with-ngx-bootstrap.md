---
layout: post
title: Integrating a Modal Component in Angular with ngx-bootstrap
subtitle: Setting Up the Modal Service Subscribing to Actions within the Modal
tags: [TypeScript, Modal ]
comments: false

---

# 使用 ngx-bootstrap 在 Angular 中實現 Modal

在本文中，我們將探討如何在 Angular 應用程序中使用 ngx-bootstrap 函式庫創建和管理 modal 對話框。

## 設置 Modal 服務

首先，我們將導入必要的類別，並聲明一些屬性來處理 modal 的行為。

```typescript
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

class SomeClass {
  private modalService: BsModalService; // 聲明 modal 服務
  // 其他聲明...
}
```

## 定義打開 Modal 的函數

接下來，我們將定義一個名為 `openModal` 的方法，該方法接受 `result` 參數，用於設置 modal 的初始狀態。

```typescript
openModal(result) {
  if (this.modalOpen) {
    return; // 如果 modal 已開啟，則返回
  }
  // 進一步的代碼來打開 modal...
}
```

## 創建初始狀態

我們將創建一個對象，其中包括 modal 的初始狀態，包括各種配置和值。

```typescript
const initialState = {
  Config: this.Config,
  App: this.App,
  ValueData: this.ValueData,
};
```

## 顯示和自定義 Modal

我們將使用 `show` 方法顯示 modal 並自定義其外觀。

```typescript
this.modalRef = this.modalService.show(CommentComponent, { initialState });
this.modalRef.setClass('modal-xl'); // 設置 modal 的類
this.modalRef.content.closeBtnName = 'Close'; // 設置關閉按鈕的名稱
```

## 訂閱事件

最後，我們將訂閱一些事件，以處理像關閉 modal 和在觸發特定事件時執行某些函數之類的操作。

```typescript
this.modalRef.content.InsertComment.subscribe(() => {
  this.getData('Refresh');
}); // this.InsertComment.emit(); 這個可以在 modal 打開後呼叫
this.modalRef.onHide.subscribe(() => (this.modalOpen = false));
```

## 結論

本文提供了使用 ngx-bootstrap 函式庫在 Angular 中創建和管理 modal 的詳細指南。上述代碼提供了一個實際示例，演示了如何在 Angular 應用程序中設置、自定義和與 modal 互動。

## 完整的代碼

以下是完整的代碼示例：

```typescript
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

class SomeClass {
  private modalService: BsModalService;
  InsertComment: EventEmitter<any> = new EventEmitter();
  modalOpen = false;
  modalRef: BsModalRef;
  ValueData: any;

  // Other properties...

  openModal(result) {
    // The complete code for opening the modal
    // initialState
    // 顯示 modal 並設置初始狀態
    this.modalRef = this.modalService.show(CommentComponent, { initialState });
    this.modalRef.setClass('modal-xl'); // 設置 modal 的類
    this.modalRef.content.closeBtnName = 'Close'; // 設置關閉按鈕的名稱
    this.modalOpen = true; // 將 modal 打開狀態設置為 true
    // ...
  }

  // Other methods...
}
```
