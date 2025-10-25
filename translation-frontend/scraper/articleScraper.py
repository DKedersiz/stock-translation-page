import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
import uuid
import urllib3

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

for i in range(1, 14):
    base_url = 'https://stockanalysis.com'
    website = f'{base_url}/blog/?page={i}'
    result = requests.get(website)
    content = result.content

    soup = BeautifulSoup(content, 'lxml', from_encoding='utf-8')

    article_links = [link.get('href') for link in soup.find_all('a', href=True) if '/article' in link.get('href')]

    try:
        client = MongoClient('mongodb://localhost:27017/')
        db = client['translation-db']
        collection = db['blogs']
        print("MongoDB bağlantısı başarılı")
    except Exception as e:
        print(f"MongoDB bağlantı hatası: {e}")

    for link in article_links:
        article_url = f'{base_url}{link}'
        article_result = requests.get(article_url)
        article_content = article_result.text
        article_soup = BeautifulSoup(article_content, 'lxml')

        box = article_soup.find('div', class_='content')

        if box:
            title_tag = article_soup.find('h1')
            title = title_tag.get_text().strip() if title_tag else 'No Title'
            paragraphs = box.find_all('p')
            content = ''.join([para.get_text() for para in paragraphs])
            images = [img.get('src') for img in article_soup.find_all('img', src=True)]
            image = images[0] if images else None
        else:
            title = 'No Title'
            content = 'No Content'
            image = None

        if collection.count_documents({'title': title}, limit=1) == 0:
            blogs_item = {
                '_id': str(uuid.uuid4()),
                'title': title,
                'content': content,
                'image': image,
                
            }
            print("Yeni makale eklendi:", title)
            collection.insert_one(blogs_item)
        else:
            print("Makale zaten mevcut:", title)
