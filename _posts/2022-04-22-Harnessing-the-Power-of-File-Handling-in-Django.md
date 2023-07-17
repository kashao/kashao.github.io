---
layout: post
title: Harnessing the Power of File Handling in Django
subtitle: Uploading and Running Files
tags: [Django]
comments: false
---

關於在 Django 網站上實現檔案上傳和執行功能

Submit View:

```python
def Submit(request):
    if request.method == 'POST':
        import time
        global current_time  # 用來命名之後 Run 的檔案，賦予上傳的時間點
        current_time = time.strftime("%Y-%m-%d-%H-%M-%S", time.localtime())

        fileinfo = request.FILES.get('file')

        if fileinfo:
            filename = str(request.FILES['file'])
            if filename == '******.xlsx':
                handle_uploaded_file(request.FILES['file'], str(request.FILES['file']), aaa_n, bbb)
                return render(request, '*****.html', {'time': current_time})  # 成功就到其他頁面，並帶值進去
            else:
                return HttpResponse("you upload the wrong file")
        else:
            return HttpResponse("you did not upload the file")
    return HttpResponse("Failed")
```

在上面的代碼中，定義了一個名為 Submit 的視圖函式，用於處理 POST 請求。在該函式中，從 POST 請求中獲取檔案資訊，並檢查是否存在檔案以及檔案名稱是否符合預期。如果檔案符合預期，則調用 handle_uploaded_file 函式處理上傳的檔案並進行相應的操作。最後，返回適當的響應。

Download View:

```python
def download(request):
    from django.http import FileResponse
    file = open('APP/STATIC/SIDEAPP/****/***.xlsx', 'rb')
    response = FileResponse(file)
    response['Content-Type'] = 'application/octet-stream'
    response['Content-Disposition'] = 'attachment;filename="***.xlsx"'
    return response
```

另外，定義了一個名為 download 的視圖函式，用於處理下載檔案的請求。在該函式中，打開檔案並使用 FileResponse 生成響應對象，同時設置檔案類型和檔案名稱。

handle_uploaded_file Function:

```python
def handle_uploaded_file(file, filename, cluster_n, TWvalue):
    if not os.path.exists('APP/STATIC/SIDEAPP/****/upload/' + current_time + '/'):
        os.mkdir('APP/STATIC/SIDEAPP/****/upload/' + current_time + '/')
        global path
        path = 'APP/STATIC/SIDEAPP/****/upload/' + current_time + '/'

    with open(path + filename, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)
    
    main(path + filename, cluster_n, TWvalue)
    zip()  # 壓縮檔案 (用另外一個 function)
    
    return True
```

此外，定義了一個名為 handle_uploaded_file 的函式，用於處理上傳的檔案。在該函式中，檢查是否存在指定的目錄，如果不存在則創建它。然後，打開目標檔案，將檔案分塊寫入目的地。接著，調用 main 函式進行相應的操作，如壓縮檔案等。最後，返回 True。

Result View:

```python
def result(request):
    from django.http import FileResponse
    zip_filename = current_time + '-WordCloud.zip'
    file = open(path + zip_filename, 'rb')
    response = FileResponse(file)
    response['Content-Type'] = 'application/octet-stream'
    response['Content-Disposition'] = 'attachment;filename="{}"'.format(zip_filename)

    return response
```

最後，定義了一個名為 result 的視圖函式，用於處理結果頁面的請求。在該函式中，打開壓縮後的檔案，並生成相應的響應對象，同時設置檔案類型和檔案名稱。

參考資料：

- My previous side-project
