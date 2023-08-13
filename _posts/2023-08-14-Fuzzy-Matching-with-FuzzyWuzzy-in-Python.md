---
layout: post
title: Fuzzy String Matching with FuzzyWuzzy in Python
subtitle: Enhancing Search and Analysis with Simple Comparisons
tags: [Python, FuzzyWuzzy ]
comments: false

---

# 使用 FuzzyWuzzy 進行字串模糊匹配

在許多情況下，我們可能希望比較兩個字串的相似度。這可能是由於人類錯誤、拼寫錯誤或語法錯誤。`fuzzywuzzy` 是一個 Python 函式庫，專為這個目的而設計。

## 什麼是 FuzzyWuzzy？

`fuzzywuzzy` 使用 Levenshtein 距離來計算兩個字串之間的相似度。以下是一些主要功能：

1. **比率（Ratio）**：完全比較兩個字串。
2. **部分比率（Partial Ratio）**：比較字串的一部分。
3. **排序比率（Sorted Token Ratio）**：比較單詞，並排序後計算。
4. **集合比率（Set Ratio）**：比較單詞集合。

## 如何使用？

首先，你需要安裝 `fuzzywuzzy`：

```bash
pip install fuzzywuzzy
```

然後，你可以使用以下代碼進行基本的比較：

```python
from fuzzywuzzy import fuzz

similarity = fuzz.ratio("hello world", "helo world")
print(similarity) # 輸出 95
```

## 在搜尋中使用 FuzzyWuzzy

你可以使用 `fuzzywuzzy` 來構建一個搜索算法，找到與查詢最相似的文章。以下是一個示例代碼：

```python
from fuzzywuzzy import fuzz

def search_articles(articles, search_query):
    matching_articles = []
    for article in articles:
        title, content = article
        avg_similarity = calculate_avg_similarity(search_query, content)
        if avg_similarity > 50:
            matching_articles.append((title, content, avg_similarity))
    return matching_articles
```

## 完整代碼示例

以下是一個完整的示例，展示了如何使用 `fuzzywuzzy` 來搜索與查詢相關的文章：

```python
import pyodbc
from fuzzywuzzy import fuzz

def calculate_avg_similarity(query, content):
    keywords = query.split()
    similarities = [fuzz.partial_ratio(keyword, content) for keyword in keywords]
    return sum(similarities) / len(similarities)

def search_articles(articles, search_query):
    matching_articles = []
    for article in articles:
        title, content = article
        avg_similarity = calculate_avg_similarity(search_query, content)
        if avg_similarity > 50:
            matching_articles.append((title, content, avg_similarity))
    return matching_articles

def get_all_articles():
    server = 'your_server_name'
    database = 'your_database_name'
    username = 'your_username'
    password = 'your_password'
    connection_string = f'DRIVER={{SQL Server}};SERVER={server};DATABASE={database};UID={username};PWD={password}'
    connection = pyodbc.connect(connection_string)
    cursor = connection.cursor()
    sql_query = "SELECT Title, Content FROM Articles"
    cursor.execute(sql_query)
    all_articles = cursor.fetchall()
    connection.close()
    return all_articles

all_articles = get_all_articles()
search_query = '搜尋 系統'
matching_articles = search_articles(all_articles, search_query)

for title, content, similarity in matching_articles:
    print(f"Title: {title}, Similarity: {similarity}")
    print(f"Content: {content}\n")
```

## 結論

`fuzzywuzzy` 是一個強大而簡單的工具，可以應對多種情況，包括搜索引擎、數據清理和文本分析等。它讓字串匹配變得直觀並易於實現。

---
