import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
import uuid

website = 'https://stockanalysis.com/news/'
result = requests.get(website)
content = result.content

soup = BeautifulSoup(content, 'lxml',from_encoding='utf-8')

box = soup.find('div', class_='mb-2 flex flex-col space-y-3 overflow-x-hidden bg-gray-200 dark:bg-dark-950 sm:space-y-0 sm:bg-white dark:sm:bg-dark-800 lg:border-0')

titles = [title.get_text() for title in box.find_all('h3',class_="mb-2 mt-3 text-xl font-bold leading-snug sm:order-2 sm:mt-0 sm:leading-tight")]
contents = [content.get_text() for content in box.find_all('p',class_= "overflow-auto text-[0.95rem] text-light sm:order-3")]
images = [img.get('src') for img in box.find_all('img', src=True)]
news_url = [link.get('href') for link in box.find_all('a', href=True,class_="sm:mt-1")]

print(titles)
print(news_url)

# MongoDB bağlantısı
try:
    client = MongoClient('mongodb://localhost:27017/')
    db = client['translation-db']
    collection = db['news']
    print("MongoDB bağlantısı başarılı")
except Exception as e:
    print(f"MongoDB bağlantı hatası: {e}")


for title, content,image,newsurl in zip(titles, contents,images,news_url):
    news_item = {
        '_id': str(uuid.uuid4()),
        'title': title.strip(),
        'content': content.strip(),
        'image': image,
        'url': newsurl,
        
    }
    try:
        result = collection.insert_one(news_item)
        print(f"Item eklendi, id: {result.inserted_id}")
    except Exception as e:
        print(f"Veri eklenirken hata oluştu: {e}")
