---
layout: post
title: Harnessing the Power of File Handling in Django
subtitle: Uploading and Running Files
tags: [Django]
comments: false
---

最近，我在 Django 網站上研究了一些功能，試圖實現檔案上傳和執行的功能。

Submit View

```python
def Submit(request):
    if request.method == 'POST':
        import time
        global current_time #用來命名之後 Run 的檔案，賦予上傳的時間點
        current_time = time.strftime("%Y-%m-%d-%H-%M-%S", time.localtime())

        fileinfo = request.FILES.get('file')

        #aaa_n = int(request.POST['aaa']) 這裡是用來取 html input value
        #bbb = str(request.POST['bbb'])

        if fileinfo:        
            filename = str(request.FILES['file'])
            if filename == '******.xlsx':
                handle_uploaded_file(request.FILES['file'], str(request.FILES['file']), aaa_n, bbb)
                #return HttpResponse("Successful you upload the " + filename + " and done!")
                return render(request,'*****.html', {'time': current_time}) #成功就到其他頁面，並帶值進去
            else:
                #messages.success(request, 'you upload the wrong file')
                return HttpResponse("you upload the wrong file")
        else:
            #messages.success(request, 'you did not upload the file')
            return HttpResponse("you did not upload the file") 
    return HttpResponse("Failed")
```

在上面的代碼中，我定義了一個名為 Submit 的視圖函式，用於處理 POST 請求。

我使用 time 模組來獲取當前時間，並將其賦值給 current_time 變數，以便後續使用。

接著，我從 POST 請求中獲取檔案資訊，並檢查是否存在檔案以及檔案名稱是否符合預期。

如果檔案符合預期，我會調用 handle_uploaded_file 函式來處理上傳的檔案並進行相應的操作。

最後，我返回適當的響應。

HttpResponse("Failed") 這句就直接讓網頁顯示 Failed

Download View

```python
def download(request):
    from django.http import FileResponse
    file=open('APP/STATIC/SIDEAPP/****/***.xlsx','rb')
    response =FileResponse(file)
    response['Content-Type']='application/octet-stream'
    response['Content-Disposition']='attachment;filename="***.xlsx"'
    return response
```

另外，我還定義了一個名為 download 的視圖函式，用於處理下載檔案的請求。

在這個函式中，我打開了檔案並使用 FileResponse 來生成響應對象，並設置了相應的檔案類型和檔案名稱。

handle_uploaded_file Function

```python
def handle_uploaded_file(file, filename, cluster_n, TWvalue):
    if not os.path.exists('APP/STATIC/SIDEAPP/****/upload/'+ current_time + '/'):
        os.mkdir('APP/STATIC/SIDEAPP/****/upload/'+ current_time + '/')
        global path
        path = 'APP/STATIC/SIDEAPP/****/upload/'+ current_time + '/'
 
    with open( path + filename, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)
    #os.chdir('upload/'+ current_time + '/')
    #save_excel(path + filename)
    main(path + filename, cluster_n, TWvalue)
    zip() #壓縮檔案 (用另外 function)
    #result()
    return True
```

此外，我還定義了一個名為 handle_uploaded_file 的函式，用於處理上傳的檔案。

在這個函式中，我檢查是否存在指定的目錄，如果不存在則創建它。

然後，我打開目標檔案，將檔案分塊寫入目的地。接著，我調用 main 函式，並進行壓縮等操作。

最後，我返回 True。

Result View
```python
def result(request):
    #os.chdir('*****/upload/'+ current_time + '/')
    from django.http import FileResponse
    zip_filename = current_time + '-WordCloud.zip'
    file=open(path + zip_filename,'rb')
    response =FileResponse(file)
    response['Content-Type']='application/octet-stream'
    response['Content-Disposition']='attachment;filename="{}"'.format(zip_filename)

    return response
```

最後，我還定義了一個名為 result 的視圖函式，用於處理結果頁面的請求。

在這個函式中，我打開壓縮後的檔案，並生成相應的響應對象，同時設置了檔案類型和檔案名稱。

這些是我最近在一個之前的副專案上進行的一些實驗和研究。

Reference: 
+ My previous side-project