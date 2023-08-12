---
layout: post
title: Enhancing Ag-Grid A Practical Guide
subtitle: Adding and Managing Buttons for Efficient Grid Operations
tags: [TypeScript, Ag-Grid]
comments: false

---

# Enhancing Ag-Grid: A Practical Guide: Adding and Managing Buttons for Efficient Grid Operations

## 掌握 Ag-Grid：關於 Ag-Grid 操作的進階技巧，我在工作中學到的幾件事：進階技巧

### 1. Ag-Grid 添加按鈕

#### 新增 Delete 和 Edit 按鈕到 Ag-Grid. Ag-Grid 添加刪除按鈕

#### a. Ag-Grid 添加刪除按鈕

```typescript
this.columnDefs.push({
      headerName: 'Delete',
      field: 'Delete',
      width: 100,
      cellRenderer: (params) => {
        const button = document.createElement('button');
        button.innerHTML = 'Del';
        button.classList.add('btn', 'btn-danger', 'mr-2'); // Bootstrap
        button.addEventListener('click', () => {
          const shouldDelete = confirm('確定要刪除此列嗎？');
          if (shouldDelete) {
            this.DoDelRow(params.node);
          }
        });
        return button;
      },
    });
```

#### b. Ag-Grid 添加編輯按鈕

```typescript
this.columnDefs.push({
      headerName: 'Edit',
      field: 'Edit',
      width: 100,
      cellRenderer: (params) => {
        const button = document.createElement('button');
        button.innerHTML = 'Edit';
        button.classList.add('btn', 'btn-primary', 'mr-2');
        button.addEventListener('click', () => {
          const shouldEdit = confirm('確定要編輯此列嗎？');
          if (shouldEdit) {
            this.DoeditRow(params.node);
          }
        });
        return button;
      },
    });
```

### 2. Delete and Edit Row Functions

#### 刪除和編輯行的函式

#### a. Call a Function from Another Component to Delete Row

```typescript
async DoDelRow(node: any): Promise<void> {
    const ID = node.data.ID;
    this.ID = ID;
    await this.DoUpdComment('DelComment');
    this.ValueData = this.ValueData.filter((item: any) => item.ID !== ID);
    this.gridApi.setRowData(this.ValueData);
    this.InsertComment.emit();
  }
```

#### b. Handle Specific Row Data Update in Ag-Grid to Edit Row

```typescript
  async DoeditRow(value: any): Promise<void> {
    this.ID = value.data['ID'];
    this.startTime = this.formatDateToYYYYMMDD(value.data['start_date']);
    this.endTime = this.formatDateToYYYYMMDD(value.data['end_date']);
    this.comment = value.data['comment'];
    await this.DoUpdComment('UpdComment');
    this.comment = '';
    this.startTime = null;
    this.endTime = null;
    this.onRefresh();
    this.InsertComment.emit();
  }
```

### 3. Working with Dates in Ag-Grid

#### 在 Ag-Grid 中操作日期

#### a. Convert Date Format to `"yyyy-MM-dd"`

```typescript
formatDateToYYYYMMDD(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
```

#### b. Set Background Color in Ag-Grid Based on Date Value

```typescript
colDef.cellStyle = (params) => {
    const columnDate = new Date(params.value);
    const columnDateFormatted = columnDate.toLocaleDateString('en-US', { timeZone: userTimeZone });
    const todayFormatted = new Date().toLocaleDateString('en-US', { timeZone: userTimeZone });

    if (columnDateFormatted === todayFormatted) return { backgroundColor: 'yellow' };
    if (columnDate.getTime() < new Date().getTime()) return { backgroundColor: 'red' };
    return null;
};
```

#### c. Get current Datetime

```typescript
const currentTime = new Date();
this.refreshTime = currentTime.toLocaleTimeString();
```

### 4. Column Definitions in Ag-Grid

#### 從資料來源動態生成 Column

```typescript
getDynamicColumns(valueData: any[]): string[] {
    const dynamicColumns: string[] = [];
    if (valueData && valueData.length > 0) {
      const firstRow = valueData[0];
      dynamicColumns.push(...Object.keys(firstRow));
    }
    return dynamicColumns;
  }
```

#### 在資料來源動態生成該 Column 下的 unique 值

```typescript
getUniqueValues(valueData: any[], column): string[] {
    return [...new Set(valueData.map((item) => item[column]))];
  }
```

#### 創建 Ag-Grid 使用的 columnDefs

```typescript
generateColumnDefs(valueData): void {
  this.hiddenColumns = [...Object.values(result)];
  this.ValueData = valueData;
  const dynamicColumns = this.getDynamicColumns(valueData);
  const hiddenColumns = this.getDynamicColumns(this.hiddenColumns);
  const filterColumns = ['ID', 'location'];
  const lockedColumns = ['ID'];
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;  
  const dateColumns = ['end_date', 'start_date'];
  const editableColumns = ['start_date', 'end_date', 'comment'];

  const dateRenderer = (params) => {
    const timeString = params.value;
    const datePart = timeString.split('T')[0];
    return datePart;
  };

  this.columnDefs = [
    // Checkbox column
    {
      headerName: 'Check Box',
      field: 'Check Box',
      headerCheckboxSelection: true,
      checkboxSelection: true,
      width: 150,
      lockVisible: true,
    },
    ...dynamicColumns.map((column) => {
      const isFilterColumn = filterColumns.includes(column);
      const colDef: ColDef = {
        headerName: column,
        field: column,
        filter: isFilterColumn,
        filterParams: isFilterColumn ? { values: this.getUniqueValues(this.ValueData, column) } : undefined,
        hide: hiddenColumns.includes(column),
        lockVisible: lockedColumns.includes(column),
        editable: isEditable,
        cellEditor: isEditable ? 'agTextCellEditor' : undefined,
      };

      // 若欄位名稱為 'ID'，則設置 cellStyle 屬性以控制背景色
      if (column === 'ID') {
        colDef.cellStyle = (params) => {
          return { backgroundColor: params.data.Color };
        };
      }

      return colDef;
    }),
  ];
}

```

```typescript
if (dateColumns.includes(column)) {
      colDef.cellRenderer = dateRenderer;

      if (column === 'end_date') {
        colDef.cellStyle = (params) => {
          const columnDate = new Date(params.value);
          const columnDateFormatted = columnDate.toLocaleDateString('en-US', { timeZone: userTimeZone });
          const todayFormatted = new Date().toLocaleDateString('en-US', { timeZone: userTimeZone });

          if (columnDateFormatted === todayFormatted) return { backgroundColor: 'yellow' };
          if (columnDate.getTime() < new Date().getTime()) return { backgroundColor: 'red' };
          return null;
        };
      }
    }
```
