(function () {
  const CONTENT_KEY = '__CONTENT__';
  const ADDTION_KEY = '__ADDTION_KEY__';
  const VIEW_COUNT = '__VIEW_COUNT__';

  const mockAddtion = '韦应物';
  const mockContent = 
`1、雜曲歌辭·上皇三臺
2、詠曉
3、花徑
4、春⽉觀省屬城始憩東⻄林精舍
5、⾃蒲塘驛迴駕經歷⼭⽔
6、⼭形積⾬歸途始霽
7、郡中⻄齋
8、喜園中茶⽣
9、晚出澧上贈崔都⽔
10、秋夜南宮寄澧上弟及諸⽣
11、寄皎然上⼈
12、寄全椒⼭中道⼠
13、送褚校書歸舊⼭歌
14、贈蕭河南
15、⻄澗即事示盧陟`;

  function setStorage(key, value) {
    localStorage.setItem(key, value);
  }

  function getStorage(key) {
    return localStorage.getItem(key);
  }

  if (!getStorage(VIEW_COUNT)) {
    setStorage(ADDTION_KEY, mockAddtion);
    setStorage(CONTENT_KEY, mockContent);
  }

  setStorage(VIEW_COUNT, parseInt(getStorage(VIEW_COUNT) || 0) + 1);
})();
