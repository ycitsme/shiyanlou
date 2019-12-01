define(function(require, exports, module) {
    /*
    ImgLoader(arrPreLoadImg, function (o) {
        //o is process from 0 to 1
        if (o == 1) {
            alert("all loaded");
        }
    });
    * */
    var loadImg = function(imgArr, callback, timeout){
        var waitTime  = timeout || 5000;

        // å è½½å¾çæ°é
        var len = imgArr.length;
        if(len <= 0 ){
            return;
        }

        // å·²å®æå è½½è®¡æ°
        var loaded = 0;

        var imgList = [];


        var loadFun = function(evt) {
            var type = {'load': 1, 'error': 2}[evt.type];


            // å·²å è½½è®¡æ°ï¼ç¨äºè®¡ç®å®æç¾åæ¯
            if (loaded < len) {
                ++loaded;
                callback(loaded/len);
            }
        };

        for(var i = 0; i<len; i++){
            imgList[i] = new Image();

            imgList[i].onload = function() {
                loadFun({type: 1});
            };
            imgList[i].onerror = function() {
                loadFun({type: 2});
            };

            // åéè¯·æ±
            imgList[i].src = imgArr[i];
        }

        //è¶æ¶å¤ç
        setTimeout(function() {
            if(loaded < len){
                callback(1);
                // å¼ºå¶å è½½å®æ
                loaded = len;

            }
        }, waitTime*len);


    };

    module.exports = loadImg;

});