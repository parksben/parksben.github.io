===

标题: [正则表达式与web前端] 一剂偏方，重构你的文章
标签: 前端, 正则表达式

===

正则表达式是处理文本、数据的一剂良药，吃久了吃惯了才不觉得苦，PO主久病多年苦无良医，所以捣鼓了一些针对web前端方面的偏方。

**【 功能主治 】**

适用于以下人群及症状：
* 内容妹纸：从网上拷下来的文章样式太乱，拿人手短。。。
* 前端妹纸：某些内容的排版太繁琐，不想浪费青春。。。
* 爬虫汉子：扒到的文章内容有点污，不想手洗。。。

**【 禁忌人群 】**

以下人群可能存在不良反应，请慎用此方：
* 岁月静好，不怕麻烦和浪费青春的；
* 有更牛X解决方案的；
* 觉得我本人无聊的。。。

下面以JS代码举例，主要介绍本人百无聊赖时总结出的一些短（lai）小（da）精（wo）悍（ya）的代码，用来重新定义和优化网页上的文章内容。

### 1. 行内样式，洗洗更健康

对于 css 样式来说，诸如 ```style="..."``` 和 ```height="..."``` 这样的行内样式，由于其优先级较高，容易一上场就干掉很多我们殚精竭虑码完的 css 样式。因此，如果你手里头有类似于下面这段 html 的代码，请务必先洗一洗：

```html
<div id="news-content" class="news-content"><!--content_start--><!--content_start--><p>　　2016年10月20日，在第七届中国高成长企业CEO峰会上，第十一届“中国最具投资价值企业50强”评选榜单（以下简称V50榜单）正式发布。该榜自2006年以来，至今已举办十一年之久，是投资界首个专注高成长企业的年度评选活动，被誉为“行业投资风向标”。</p><p>　　本届榜单在2015年风格的基础上进行了微调，根据企业发展的不同阶段与规模，将“中国最具投资价值企业50强”榜单评选，细分为“风云榜”（融资阶段A轮及其以后的未上市企业）和“新芽榜”（融资阶段A轮以前的未上市企业，创立时间两年以内）。</p><p>　　本届V50评选，自2016年3月初全面启动以来，广泛征集报名企业，经首轮筛选进入初评的企业达1000+，再通过严格的初评和复评，汇聚了近百位投资界“意见领袖”及<a href="http://newseed.pedaily.cn/company/2529" target="_blank">精英</a>们的专业意见，最终缔造了本届中国最具投资价值企业风云榜50强和新芽榜50强！</p><div><table border="1"><tbody><tr><td colspan="3"><p style="text-align:center;"><b>2016</b><b>年第十一届中国最具投资价值企业50强榜单·新芽榜</b></p><p style="text-align:center;">（此榜单排名不分先后，按企业全称首字母排序）</p></td></tr><tr><td><p><b>序号</b></p></td><td><p><b>企业简称</b></p></td><td><p><b>公司名称</b></p></td></tr><tr><td><p><b>1</b></p></td><td><p><a href="http://newseed.pedaily.cn/company/43432" target="_blank">POMCube</a></p></td><td><p><a href="http://newseed.pedaily.cn/company/43432" target="_blank">POMCube</a><a href="http://newseed.pedaily.cn/company/28649" target="_blank">Inc</a>.</p></td></tr><tr><td><p><b>2</b></p></td><td><p><a href="http://newseed.pedaily.cn/company/43348" target="_blank">京华未来</a></p></td><td><p>北京<a href="http://newseed.pedaily.cn/company/43348" target="_blank">京华未来</a>机器人科技有限公司</p></td></tr><tr><td><p><b>3</b></p></td><td><p>玲珑</p></td><td><p>北京<a href="http://newseed.pedaily.cn/company/38816" target="_blank">科玲文化科技</a>有限公司</p></td></tr><tr><td><p><b>4</b></p></td><td><p>联想<a href="http://zdb.pedaily.cn/people/智慧/" target="_blank">智慧</a>医疗</p></td><td><p>北京联想<a href="http://zdb.pedaily.cn/people/智慧/" target="_blank">智慧</a>医疗信息技术公司</p></td></tr><tr><td><p><b>5</b></p></td><td><p>灵犀微光</p></td><td><p>北京灵犀微光科技有限公司</p></td></tr><tr><td><p><b>6</b></p></td><td><p><a href="http://newseed.pedaily.cn/company/42856" target="_blank">美信金融</a></p></td><td><p>北京美信众诚科技有限公司</p></td></tr><tr><td><p><b>7</b></p></td><td><p><a href="http://newseed.pedaily.cn/company/43249" target="_blank">魔视互动</a></p></td><td><p>北京<a href="http://newseed.pedaily.cn/company/43249" target="_blank">魔视互动</a>科技有限公司</p></td></tr><tr><td><p><b>8</b></p></td><td><p>魔数科技</p></td><td><p>北京魔数科技有限公司</p></td></tr><tr><td><p><b>9</b></p></td><td><p><a href="http://newseed.pedaily.cn/company/41882" target="_blank">潜力股</a></p></td><td><p>北京<a href="http://newseed.pedaily.cn/company/41882" target="_blank">潜力股</a>科技有限公司</p></td></tr><tr><td><p><b>10</b></p></td><td><p>斑马社</p></td><td><p>北京青云<a href="http://newseed.pedaily.cn/company/28217" target="_blank">互帮</a>网络科技有限公司</p></td></tr><tr><td><p><b>11</b></p></td><td><p>深鉴科技</p></td><td><p>北京深鉴科技有限公司</p></td></tr><tr><td><p><b>12</b></p></td><td><p>住范儿</p></td><td><p>北京<a href="http://newseed.pedaily.cn/company/42325" target="_blank">水木优品</a>科技有限公司</p></td></tr><tr><td><p><b>13</b></p></td><td><p>万娱引力</p></td><td><p>北京万娱引力文化传媒有限公司</p></td></tr><tr><td><p><b>14</b></p></td><td><p>细刻科技</p></td><td><p>北京细刻网络科技有限公司</p></td></tr><tr><td><p><b>15</b></p></td><td><p>医洋科技</p></td><td><p>北京医洋科技有限公司</p></td></tr><tr><td><p><b>16</b></p></td><td><p>艺妙神州</p></td><td><p>北京艺妙<a href="http://newseed.pedaily.cn/company/21983" target="_blank">神州医疗</a>科技有限公司</p></td></tr><tr><td><p><b>17</b></p></td><td><p>有序科技</p></td><td><p>北京有序科技有限公司</p></td></tr><tr><td><p><b>18</b></p></td><td><p>91金服</p></td><td><p>北京众智人人信息科技有限责任公司</p></td></tr><tr><td><p><b>19</b></p></td><td><p>水滴互助</p></td><td><p>北京<a href="http://newseed.pedaily.cn/company/42462" target="_blank">纵情向前</a>科技有限公司</p></td></tr><tr><td><p><b>20</b></p></td><td><p><a href="http://newseed.pedaily.cn/company/43061" target="_blank">天仪研究院</a></p></td><td><p>长沙天仪空间科技研究院有限公司</p></td></tr><tr><td><p><b>21</b></p></td><td><p><a href="http://newseed.pedaily.cn/company/42633" target="_blank">11Space</a></p></td><td><p>畅联管理咨询（北京）有限公司</p></td></tr><tr><td><p><b>22</b></p></td><td><p><a href="http://newseed.pedaily.cn/company/39083" target="_blank">比呀比</a></p></td><td><p>广州<a href="http://newseed.pedaily.cn/company/39083" target="_blank">比呀比</a>信息科技有限公司</p></td></tr><tr><td><p><b>23</b></p></td><td><p><a href="http://zdb.pedaily.cn/people/金华/" target="_blank">金华</a>佗</p></td><td><p>广州杜仲哥互联网科技有限公司</p></td></tr><tr><td><p><b>24</b></p></td><td><p>康立明生物</p></td><td><p>广州市康立明生物科技有限责任公司</p></td></tr><tr><td><p><b>25</b></p></td><td><p>国民认证</p></td><td><p>国民认证科技（北京）有限公司</p></td></tr><tr><td><p><b>26</b><b></b></p></td><td><p><a href="http://newseed.pedaily.cn/company/43634" target="_blank">维权骑士</a></p></td><td><p>杭州刀豆网络科技有限公司</p></td></tr><tr><td><p><b>27</b><b></b></p></td><td><p><a href="http://newseed.pedaily.cn/company/42379" target="_blank">文签网络</a></p></td><td><p>杭州<a href="http://newseed.pedaily.cn/company/42379" target="_blank">文签网络</a>技术有限公司</p></td></tr><tr><td><p><b>28</b><b></b></p></td><td><p>空中云汇</p></td><td><p>空中云汇（深圳）网络科技有限公司</p></td></tr><tr><td><p><b>29</b><b></b></p></td><td><p>爱诺医药</p></td><td><p>宁波爱诺医药科技有限公司</p></td></tr><tr><td><p><b>30</b><b></b></p></td><td><p><a href="http://newseed.pedaily.cn/company/43199" target="_blank">埃德斯</a></p></td><td><p>上海<a href="http://newseed.pedaily.cn/company/43199" target="_blank">埃德斯</a>生物科技有限公司</p></td></tr><tr><td><p><b>31</b><b></b></p></td><td><p>幼师口袋</p></td><td><p>上海必加教育科技有限公司</p></td></tr><tr><td><p><b>32</b><b></b></p></td><td><p>果藤金融</p></td><td><p>上海果藤互联网金融信息服务有限公司</p></td></tr><tr><td><p><b>33</b><b></b></p></td><td><p>禾赛科技</p></td><td><p>上海禾赛<a href="http://newseed.pedaily.cn/company/23214" target="_blank">光电科技</a>有限公司</p></td></tr><tr><td><p><b>34</b><b></b></p></td><td><p><a href="http://newseed.pedaily.cn/company/42401" target="_blank">金枣金融</a></p></td><td><p>上海<a href="http://newseed.pedaily.cn/company/42401" target="_blank">金枣金融</a>信息服务有限公司</p></td></tr><tr><td><p><b>35</b><b></b></p></td><td><p>哮喘管家</p></td><td><p>上海朔茂网络科技有限公司</p></td></tr><tr><td><p><b>36</b><b></b></p></td><td><p>烯牛数据</p></td><td><p>上海烯牛信息技术有限公司</p></td></tr><tr><td><p><b>37</b><b></b></p></td><td><p>朋友印象</p></td><td><p>上海<a href="http://newseed.pedaily.cn/company/40089" target="_blank">阅人信息技术</a>有限公司</p></td></tr><tr><td><p><b>38</b><b></b></p></td><td><p>快金数据</p></td><td><p>深圳快金数据技术服务有限公司</p></td></tr><tr><td><p><b>39</b><b></b></p></td><td><p>莱斯购</p></td><td><p>深圳市莱斯购电子商务有限公司</p></td></tr><tr><td><p><b>40</b><b></b></p></td><td><p>寻材问料</p></td><td><p>深圳市寻材问料网络科技有限公司</p></td></tr><tr><td><p><b>41</b><b></b></p></td><td><p>万<a href="http://newseed.pedaily.cn/company/29464" target="_blank">瑞达</a>生物</p></td><td><p>深圳万<a href="http://newseed.pedaily.cn/company/29464" target="_blank">瑞达</a>生物科技有限公司</p></td></tr><tr><td><p><b>42</b><b></b></p></td><td><p>英美达</p></td><td><p>深圳英美达医疗技术有限公司</p></td></tr><tr><td><p><b>43</b><b></b></p></td><td><p>0glass</p></td><td><p>深圳增强现实技术有限公司</p></td></tr><tr><td><p><b>44</b><b></b></p></td><td><p>欧瑞吉医药</p></td><td><p>四川欧瑞吉生物医药股份有限公司</p></td></tr><tr><td><p><b>45</b><b></b></p></td><td><p>玩咖</p></td><td><p>玩咖欢聚文化传媒（北京）有限公司</p></td></tr><tr><td><p><b>46</b><b></b></p></td><td><p>一起火</p></td><td><p>衣旗（杭州）科技有限公司</p></td></tr><tr><td><p><b>47</b><b></b></p></td><td><p>标准普惠</p></td><td><p>颐月信息技术（北京）有限公司</p></td></tr><tr><td><p><b>48</b><b></b></p></td><td><p>水滴科技</p></td><td><p>银河水滴科技（北京）有限公司</p></td></tr><tr><td><p><b>49</b><b></b></p></td><td><p>娱猫</p></td><td><p>娱猫（北京）科技有限公司</p></td></tr><tr><td><p><b>50</b><b></b></p></td><td><p>北斗云点</p></td><td><p>珠海北斗云点信息技术有限公司</p></td></tr></tbody></table></div><p style="text-align:center;">![新芽榜·2016年中国最具投资价值企业50强榜单](http://upload-images.jianshu.io/upload_images/590155-14755fa8a7bf8d94?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)</p><p>　　<b>关于<a href="http://newseed.pedaily.cn/vc/38531" target="_blank">清科集团</a></b></p><p>　　<a href="http://newseed.pedaily.cn/vc/38531" target="_blank">清科集团</a>：成立于1999年，是中国领先的创业与投资综合服务平台及投资机构。旗下包括：清科研究中心、清科传媒、清科资本、清科财富、<a href="http://newseed.pedaily.cn/vc/110" target="_blank">清科创投</a>、清科母基金。主要业务涉及：研究咨询、数据产品、会议论坛、信息资讯、投资银行服务、直接投资、母基金管理及财富管理。</p><!--content_end--><!--content_pagestart--> <!--content_pageend--></div>
```

首先来清理一下这一坨里面的形如 ```<!--XXX-->``` 这样的注释语句和一些换行符（```\n```, ```\t```, ```\r```）：

```js
// 这里用htmlStr表示刚才你看到的上面那一坨
let htmlStr = '...';
// 匹配无用代码的正则
let pattForUselessCode = /(\n|\t|\r|\<\!\-\-[^\>]*\-\-\>)/gi;
// 将匹配项替换为空字符(即将无用代码从html字符串中剔除)
htmlStr = htmlStr.replace(pattForUselessCode, '');
```

接下来，清理 ```style="..."``` 形式的行内样式：

```js
let pattForStyleInline = /\s(style)\=\"[^\"]*\"/gi;    // 匹配行内样式的正则
htmlStr = htmlStr.replace(pattForStyleInline, '');
```

清理 ```height="..."``` 形式的行内样式（主要目的在于清理 ```<img>``` 元素的行内宽度和高度，方便你在 css 中自己定义新的样式）：

```js
let pattForSizeInline = /(\s(height)\=\"[^\"]*\"|\s(width)\=\"[^\"]*\")/gi;    // 匹配行内高、宽的正则
htmlStr = htmlStr.replace(pattForSizeInline, '');
```

注意：适当留下些有用的东西，比如：将 ```<p>``` 标签的 ```style="text-align:center"``` 的样式通过 ```class``` 保留下来，我们可以知道哪些文字需要居中；将标签原有的 ```id```, ```class``` 等内容保留下来，也方便我们后期丰富 css 细节时，可以直接使用：

```js
// 匹配文字水平居中的p标签的正则
let pattForTextHorizontally = /\<p[^(style|\>)]+style\=\"[^(\"|text)]*text\-align\:center\;[^\"]*\"[^\>]*\>/gi;
// 将<p style="...text-align:center...">替换为<p class="text-center">，而.text-center元素的样式你可以在css里面自己定义
htmlStr = htmlStr.replace(pattForTextHorizontally, '<p class="text-center">');
```

做完上面这些工作，你就可以安安心心去写 css 了。。。这里我就不赘述了。。。

灵活运用标签和选择器，你会发现，大多数网站的文章内容，虽然标签、结构不尽相同，但你仍能统一他们的表现风格。毕竟，经过清洗后留下来的东西，都是比较简单清晰的结构。

最开始的那一坨，经过清理后，大概长这样：

```html
<div id="news-content" class="news-content"><p>　　2016年10月20日，在第七届中国高成长企业CEO峰会上，第十一届“中国最具投资价值企业50强”评选榜单（以下简称V50榜单）正式发布。该榜自2006年以来，至今已举办十一年之久，是投资界首个专注高成长企业的年度评选活动，被誉为“行业投资风向标”。</p><p>　　本届榜单在2015年风格的基础上进行了微调，根据企业发展的不同阶段与规模，将“中国最具投资价值企业50强”榜单评选，细分为“风云榜”（融资阶段A轮及其以后的未上市企业）和“新芽榜”（融资阶段A轮以前的未上市企业，创立时间两年以内）。</p><p>　　本届V50评选，自2016年3月初全面启动以来，广泛征集报名企业，经首轮筛选进入初评的企业达1000+，再通过严格的初评和复评，汇聚了近百位投资界“意见领袖”及精英们的专业意见，最终缔造了本届中国最具投资价值企业风云榜50强和新芽榜50强！</p><div><table cellpadding="0" cellspacing="0"><tbody><tr class="light-row"><td colspan="3"><p class="text-center"><b>2016</b><b>年第十一届中国最具投资价值企业50强榜单·新芽榜</b></p><p class="text-center">（此榜单排名不分先后，按企业全称首字母排序）</p></td></tr><tr><td class="dark-line"><p><b>序号</b></p></td><td><p><b>企业简称</b></p></td><td class="dark-line"><p><b>公司名称</b></p></td></tr><tr class="light-row"><td class="dark-line"><p><b>1</b></p></td><td><p>POMCube</p></td><td class="dark-line"><p>POMCubeInc.</p></td></tr><tr><td class="dark-line"><p><b>2</b></p></td><td><p>京华未来</p></td><td class="dark-line"><p>北京京华未来机器人科技有限公司</p></td></tr><tr class="light-row"><td class="dark-line"><p><b>3</b></p></td><td><p>玲珑</p></td><td class="dark-line"><p>北京科玲文化科技有限公司</p></td></tr><tr><td class="dark-line"><p><b>4</b></p></td><td><p>联想智慧医疗</p></td><td class="dark-line"><p>北京联想智慧医疗信息技术公司</p></td></tr><tr class="light-row"><td class="dark-line"><p><b>5</b></p></td><td><p>灵犀微光</p></td><td class="dark-line"><p>北京灵犀微光科技有限公司</p></td></tr><tr><td class="dark-line"><p><b>6</b></p></td><td><p>美信金融</p></td><td class="dark-line"><p>北京美信众诚科技有限公司</p></td></tr><tr class="light-row"><td class="dark-line"><p><b>7</b></p></td><td><p>魔视互动</p></td><td class="dark-line"><p>北京魔视互动科技有限公司</p></td></tr><tr><td class="dark-line"><p><b>8</b></p></td><td><p>魔数科技</p></td><td class="dark-line"><p>北京魔数科技有限公司</p></td></tr><tr class="light-row"><td class="dark-line"><p><b>9</b></p></td><td><p>潜力股</p></td><td class="dark-line"><p>北京潜力股科技有限公司</p></td></tr><tr><td class="dark-line"><p><b>10</b></p></td><td><p>斑马社</p></td><td class="dark-line"><p>北京青云互帮网络科技有限公司</p></td></tr><tr class="light-row"><td class="dark-line"><p><b>11</b></p></td><td><p>深鉴科技</p></td><td class="dark-line"><p>北京深鉴科技有限公司</p></td></tr><tr><td class="dark-line"><p><b>12</b></p></td><td><p>住范儿</p></td><td class="dark-line"><p>北京水木优品科技有限公司</p></td></tr><tr class="light-row"><td class="dark-line"><p><b>13</b></p></td><td><p>万娱引力</p></td><td class="dark-line"><p>北京万娱引力文化传媒有限公司</p></td></tr><tr><td class="dark-line"><p><b>14</b></p></td><td><p>细刻科技</p></td><td class="dark-line"><p>北京细刻网络科技有限公司</p></td></tr><tr class="light-row"><td class="dark-line"><p><b>15</b></p></td><td><p>医洋科技</p></td><td class="dark-line"><p>北京医洋科技有限公司</p></td></tr><tr><td class="dark-line"><p><b>16</b></p></td><td><p>艺妙神州</p></td><td class="dark-line"><p>北京艺妙神州医疗科技有限公司</p></td></tr><tr class="light-row"><td class="dark-line"><p><b>17</b></p></td><td><p>有序科技</p></td><td class="dark-line"><p>北京有序科技有限公司</p></td></tr><tr><td class="dark-line"><p><b>18</b></p></td><td><p>91金服</p></td><td class="dark-line"><p>北京众智人人信息科技有限责任公司</p></td></tr><tr class="light-row"><td class="dark-line"><p><b>19</b></p></td><td><p>水滴互助</p></td><td class="dark-line"><p>北京纵情向前科技有限公司</p></td></tr><tr><td class="dark-line"><p><b>20</b></p></td><td><p>天仪研究院</p></td><td class="dark-line"><p>长沙天仪空间科技研究院有限公司</p></td></tr><tr class="light-row"><td class="dark-line"><p><b>21</b></p></td><td><p>11Space</p></td><td class="dark-line"><p>畅联管理咨询（北京）有限公司</p></td></tr><tr><td class="dark-line"><p><b>22</b></p></td><td><p>比呀比</p></td><td class="dark-line"><p>广州比呀比信息科技有限公司</p></td></tr><tr class="light-row"><td class="dark-line"><p><b>23</b></p></td><td><p>金华佗</p></td><td class="dark-line"><p>广州杜仲哥互联网科技有限公司</p></td></tr><tr><td class="dark-line"><p><b>24</b></p></td><td><p>康立明生物</p></td><td class="dark-line"><p>广州市康立明生物科技有限责任公司</p></td></tr><tr class="light-row"><td class="dark-line"><p><b>25</b></p></td><td><p>国民认证</p></td><td class="dark-line"><p>国民认证科技（北京）有限公司</p></td></tr><tr><td class="dark-line"><p><b>26</b><b></b></p></td><td><p>维权骑士</p></td><td class="dark-line"><p>杭州刀豆网络科技有限公司</p></td></tr><tr class="light-row"><td class="dark-line"><p><b>27</b><b></b></p></td><td><p>文签网络</p></td><td class="dark-line"><p>杭州文签网络技术有限公司</p></td></tr><tr><td class="dark-line"><p><b>28</b><b></b></p></td><td><p>空中云汇</p></td><td class="dark-line"><p>空中云汇（深圳）网络科技有限公司</p></td></tr><tr class="light-row"><td class="dark-line"><p><b>29</b><b></b></p></td><td><p>爱诺医药</p></td><td class="dark-line"><p>宁波爱诺医药科技有限公司</p></td></tr><tr><td class="dark-line"><p><b>30</b><b></b></p></td><td><p>埃德斯</p></td><td class="dark-line"><p>上海埃德斯生物科技有限公司</p></td></tr><tr class="light-row"><td class="dark-line"><p><b>31</b><b></b></p></td><td><p>幼师口袋</p></td><td class="dark-line"><p>上海必加教育科技有限公司</p></td></tr><tr><td class="dark-line"><p><b>32</b><b></b></p></td><td><p>果藤金融</p></td><td class="dark-line"><p>上海果藤互联网金融信息服务有限公司</p></td></tr><tr class="light-row"><td class="dark-line"><p><b>33</b><b></b></p></td><td><p>禾赛科技</p></td><td class="dark-line"><p>上海禾赛光电科技有限公司</p></td></tr><tr><td class="dark-line"><p><b>34</b><b></b></p></td><td><p>金枣金融</p></td><td class="dark-line"><p>上海金枣金融信息服务有限公司</p></td></tr><tr class="light-row"><td class="dark-line"><p><b>35</b><b></b></p></td><td><p>哮喘管家</p></td><td class="dark-line"><p>上海朔茂网络科技有限公司</p></td></tr><tr><td class="dark-line"><p><b>36</b><b></b></p></td><td><p>烯牛数据</p></td><td class="dark-line"><p>上海烯牛信息技术有限公司</p></td></tr><tr class="light-row"><td class="dark-line"><p><b>37</b><b></b></p></td><td><p>朋友印象</p></td><td class="dark-line"><p>上海阅人信息技术有限公司</p></td></tr><tr><td class="dark-line"><p><b>38</b><b></b></p></td><td><p>快金数据</p></td><td class="dark-line"><p>深圳快金数据技术服务有限公司</p></td></tr><tr class="light-row"><td class="dark-line"><p><b>39</b><b></b></p></td><td><p>莱斯购</p></td><td class="dark-line"><p>深圳市莱斯购电子商务有限公司</p></td></tr><tr><td class="dark-line"><p><b>40</b><b></b></p></td><td><p>寻材问料</p></td><td class="dark-line"><p>深圳市寻材问料网络科技有限公司</p></td></tr><tr class="light-row"><td class="dark-line"><p><b>41</b><b></b></p></td><td><p>万瑞达生物</p></td><td class="dark-line"><p>深圳万瑞达生物科技有限公司</p></td></tr><tr><td class="dark-line"><p><b>42</b><b></b></p></td><td><p>英美达</p></td><td class="dark-line"><p>深圳英美达医疗技术有限公司</p></td></tr><tr class="light-row"><td class="dark-line"><p><b>43</b><b></b></p></td><td><p>0glass</p></td><td class="dark-line"><p>深圳增强现实技术有限公司</p></td></tr><tr><td class="dark-line"><p><b>44</b><b></b></p></td><td><p>欧瑞吉医药</p></td><td class="dark-line"><p>四川欧瑞吉生物医药股份有限公司</p></td></tr><tr class="light-row"><td class="dark-line"><p><b>45</b><b></b></p></td><td><p>玩咖</p></td><td class="dark-line"><p>玩咖欢聚文化传媒（北京）有限公司</p></td></tr><tr><td class="dark-line"><p><b>46</b><b></b></p></td><td><p>一起火</p></td><td class="dark-line"><p>衣旗（杭州）科技有限公司</p></td></tr><tr class="light-row"><td class="dark-line"><p><b>47</b><b></b></p></td><td><p>标准普惠</p></td><td class="dark-line"><p>颐月信息技术（北京）有限公司</p></td></tr><tr><td class="dark-line"><p><b>48</b><b></b></p></td><td><p>水滴科技</p></td><td class="dark-line"><p>银河水滴科技（北京）有限公司</p></td></tr><tr class="light-row"><td class="dark-line"><p><b>49</b><b></b></p></td><td><p>娱猫</p></td><td class="dark-line"><p>娱猫（北京）科技有限公司</p></td></tr><tr><td class="dark-line"><p><b>50</b><b></b></p></td><td><p>北斗云点</p></td><td class="dark-line"><p>珠海北斗云点信息技术有限公司</p></td></tr></tbody></table></div><p class="text-center">![新芽榜·2016年中国最具投资价值企业50强榜单](http://upload-images.jianshu.io/upload_images/590155-14755fa8a7bf8d94?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)</p><p>　　<b>关于清科集团</b></p><p>　　清科集团：成立于1999年，是中国领先的创业与投资综合服务平台及投资机构。旗下包括：清科研究中心、清科传媒、清科资本、清科财富、清科创投、清科母基金。主要业务涉及：研究咨询、数据产品、会议论坛、信息资讯、投资银行服务、直接投资、母基金管理及财富管理。</p> </div>
```

### 2. 两句正则实现复杂的 table 明暗交替样式

一般情况下，像 ```<table>``` 这样的东西，从几千年前活到现在，难免有些历史遗留的臭毛病，为保险起见，很多站点在拿到类似元素时，并没有花太多功夫去美化修饰，所以一臭百臭。

下面是新芽（newseed）网站上的一篇文章的截图，可以看出，对于 table 标签的样式，适配的很不好，为曾经怀揣设计理想的我所不能容忍。

![某网站文章页面对 table 标签的适配效果](http://upload-images.jianshu.io/upload_images/590155-cb63ef3fa792be0e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

再下面是鄙人使用从该页面扒下来的同样的 html 结构实现的效果：

![改良后的效果](http://upload-images.jianshu.io/upload_images/590155-2afd77f85a8a261c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

披了一件华丽的外套，与光着身子示人的感觉，毕竟有云泥之别。。。

第二张图的样式，实现起来方法很多，主要的难点在于每行的背景色、每列的背景色都是明暗相间的。这个效果做起来，实现的方法有很多种：

如果在客户端渲染页面，可以基于 DOM 操作：

* 通过写一个或两个```for```循环 给 ```<tr>``` ```<td>``` 根据奇、偶数添加相应标记，如： 奇数列 ```<td class="light">``` 偶数列 ```<td class="dark">``` ，然后 css 再进行统一修饰。

* 再考虑 ```:nth-child(even)``` ```:nth-child(odd)``` 这样的 css 伪类选择器写法，同样可以实现；或者用 jQuery 实现：

```js
$("#tab tr:nth-child(even)").addClass("evenRow");      // 添加偶数行样式
$("#tab tr:nth-child(odd)").addClass("oddRow");        // 添加奇数行样式
$("#tab td:nth-child(even)").addClass("evenCol");      // 添加偶数列样式
$("#tab td:nth-child(odd)").addClass("oddCol");        // 添加奇数列样式
```

基于本文最初提到的那“坨” html 字符串，无从谈起操作 DOM，因而直接操作字符串：

```js
// 表格 - 奇数行浅灰
htmlStr = htmlStr.replace(/\<tr\>(.*?\<\/tr\>\<tr\>.*?\<\/tr\>)/gi, '<tr style="background:#f8f8f8;">$1');
```
```
// 表格 - 奇数列浅灰（使用半透明色值，与上面的行的背景色进行叠加）
htmlStr = htmlStr.replace(/\<td\>(.*?\<\/td\>(\<td\>.*?\<\/td\>)?)/gi, '<td style="background:rgba(0,0,0,.2);">$1');
```

仅此两句，在不额外撰写 css 的情况下，实现了明暗交替的效果。
