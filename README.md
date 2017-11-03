# ImageRecognition
node,three,canvas 图片文字识别

### 图片重文字识别重要的前提是，<font style="#f00">文字要正</font>，，在业务场景中我们的图片可能会五花八门（倾斜），本次我们的目标是采取车架号；

> 此次项目做的比较粗燥，纯属兴趣尝试，主要的思想：


<pre>使用百度 ocr 的node-sdk,来对图片中的文字进行识别， 当然如果图片倾斜这些如何处理？图片是二维，我如何对图片本身进行旋转？而且是3维的旋转！
图片-three转canvas(旋转操作)-图片。。。为什么要用three，因为现在我们canvas，从代码中就可以发现```getContext('2d')```,二维!</pre>

<br />


> 有个注意点：three的canvas转成图片的过程中要注意把WebGLRenderer中的preserveDrawingBuffer: true，否则保存出来的canvas可能是一块黑色区域


<br />

<pre>
  1、当然先去百度ocr申请应用http://ai.baidu.com/tech/ocr/general  然后
    设置这三个值
     var APP_ID = "＊＊＊＊＊＊＊";
     var API_KEY = "＊＊＊＊＊＊";
     var SECRET_KEY = "＊＊＊＊＊＊＊＊";
  2、 npm install
  3、node start
</pre>

附上我的demo，，代码比较简陋勿喷，纯属玩乐

![](https://github.com/zhouzefei/ImageRecognition/blob/master/demo.gif)
