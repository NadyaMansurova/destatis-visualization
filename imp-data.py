from urllib.request import urlopen
import json
import io
from bs4 import BeautifulSoup

url = 'https://www.destatis.de/DE/ZahlenFakten/GesellschaftStaat/Bevoelkerung/Geburten/Tabellen/GeburtenMutterAlterBundeslaender.html'

page = urlopen(url)
data = {}

soup = BeautifulSoup(page, 'lxml')

table = soup.find_all('table', attrs={'class':'Statistics'})


tbody = table[0].find_all('tbody')[0]
tr = table[0].find_all('thead')[0].find_all('tr')[1]

num = 0
metainfo = {}

for th in tr.find_all('th'):
    metainfo[num] = th.text.replace('\n', ' ').replace('\xad', '')
    num = num + 1;

grid = {}

i = 0
for tr2 in tbody.find_all('tr'):
    grid[i] = {}
    grid[i]['data'] = {}
    j = -1
    for td in tr2.find_all('td'):
        if (j == -1):
            grid[i]['title'] = td.text.replace('\n', ' ').replace('\xad', '')
        else:
            grid[i]['data'][j] = td.text.replace('\n', ' ').replace('\xad', '')
        j = j + 1
    i = i + 1

header = soup.find_all('h1', attrs={"class":"isFirstInSlot"})[0].text

data = {
    'header': header,
    'meta': metainfo,
    'grid': grid
}

with io.open('data.json', 'w') as outfile:
    json.dump(data, outfile, ensure_ascii=False, indent=4)
