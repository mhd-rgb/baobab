<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta http-equiv="Content-Style-Type" content="text/css">
  <title></title>
  <meta name="Generator" content="Cocoa HTML Writer">
  <meta name="CocoaVersion" content="2487.7">
  <style type="text/css">
    p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 16.0px 'Helvetica Neue'; color: #15171a; -webkit-text-stroke: #15171a}
    p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 16.0px 'Helvetica Neue'; color: #15171a; -webkit-text-stroke: #15171a; min-height: 18.0px}
    span.s1 {font-kerning: none}
  </style>
</head>
<body>
<p class="p1"><span class="s1">// 全局数据存储</span></p>
<p class="p1"><span class="s1">let collections = []; // 所有合集</span></p>
<p class="p1"><span class="s1">let currentCollectionId = null; // 当前打开的合集ID</span></p>
<p class="p1"><span class="s1">let currentPhotos = []; // 当前合集的照片</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">// DOM 元素缓存</span></p>
<p class="p1"><span class="s1">const DOM = {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>// 导航相关</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>menuBtn: document.getElementById('menuBtn'),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>mobileMenu: document.getElementById('mobileMenu'),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>navbar: document.getElementById('navbar'),</span></p>
<p class="p2"><span class="s1"><span class="Apple-converted-space">    </span></span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>// 合集列表相关</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>collectionsGrid: document.getElementById('collectionsGrid'),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>noCollections: document.getElementById('noCollections'),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>createFirstCollection: document.getElementById('createFirstCollection'),</span></p>
<p class="p2"><span class="s1"><span class="Apple-converted-space">    </span></span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>// 创建合集相关</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>collectionName: document.getElementById('collectionName'),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>collectionDescription: document.getElementById('collectionDescription'),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>collectionCoverInput: document.getElementById('collectionCoverInput'),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>collectionCoverPreview: document.getElementById('collectionCoverPreview'),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>coverPreviewImg: document.getElementById('coverPreviewImg'),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>removeCover: document.getElementById('removeCover'),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>nameError: document.getElementById('nameError'),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>createBtn: document.getElementById('createBtn'),</span></p>
<p class="p2"><span class="s1"><span class="Apple-converted-space">    </span></span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>// 合集模态框相关</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>collectionModal: document.getElementById('collectionModal'),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>modalCollectionName: document.getElementById('modalCollectionName'),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>modalCollectionDescription: document.getElementById('modalCollectionDescription'),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>collectionPhotosGrid: document.getElementById('collectionPhotosGrid'),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>noPhotosInCollection: document.getElementById('noPhotosInCollection'),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>collectionPhotoCount: document.getElementById('collectionPhotoCount'),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>collectionPhotoInput: document.getElementById('collectionPhotoInput'),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>collectionUploadArea: document.getElementById('collectionUploadArea'),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>closeCollectionModal: document.getElementById('closeCollectionModal'),</span></p>
<p class="p2"><span class="s1"><span class="Apple-converted-space">    </span></span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>// 消息提示相关</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>toast: document.getElementById('toast'),</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>toastMessage: document.getElementById('toastMessage')</span></p>
<p class="p1"><span class="s1">};</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">// 初始化函数</span></p>
<p class="p1"><span class="s1">function init() {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>loadDataFromLocalStorage(); // 从本地存储加载数据</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>renderCollections(); // 渲染合集列表</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>bindAllEvents(); // 绑定所有事件</span></p>
<p class="p1"><span class="s1">}</span></p>
<p class="p2"><span class="s1"></span><br></p>
<p class="p1"><span class="s1">// 从本地存储加载数据</span></p>
<p class="p1"><span class="s1">function loadDataFromLocalStorage() {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>try {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>const savedCollections = localStorage.getItem('albumCollections');</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>if (savedCollections) {</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>collections = JSON.parse(savedCollections);</span></p>
<p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>} else {</span></p>
</body>
</html>
