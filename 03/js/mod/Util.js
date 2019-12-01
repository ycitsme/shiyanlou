define(function(require, exports, module) {
    (function(){
        Array.prototype.remove = function(index){
            if(typeof index == 'undefined'){
                return [];
            }else{
                return this.slice(0,index).concat(this.slice(index+1,this.length));
            }
        }
    })();


    var Util = {};

    /**
     * äº§çminå°maxçéæºæ´æ°
     * @param min æå°å¼
     * @param max æå¤§å¼
     * @returns {Number} éæºæ´æ°
     */
    Util.randomInt = function(min,max){
        return parseInt(min+Math.random()*(max-min));
    };

    /**
     * äº§çminå°maxçéæºæµ®ç¹æ°
     * @param min æå°å¼
     * @param max æå¤§å¼
     * @returns {Number} éæºæµ®ç¹æ°
     */
    Util.randomFloat = function(min,max){
        return min+Math.random()*(max-min);
    };

    /**
     * äº§çåç¼ä¸ºprefixé¿åº¦ä¸ºlength+prefix.lengthçéæºå­ç¬¦ä¸²
     * @param prefix éæºå­ç¬¦ä¸² é»è®¤ä¸ºç©º
     * @param length éæºå­ç¬¦ä¸² é»è®¤é¿åº¦32
     * @returns {string} éæºå­ç¬¦ä¸²
     */
    Util.randomString = function(prefix,length){
        if(!prefix) prefix = "";
        if(!length || length<0) length = 32;
        var _dict = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var _dict_length = _dict.length;
        var rdStr = "";
        for(var i=0;i<length;i++){
            rdStr += _dict[Util.randomInt(0,_dict_length-1)];
        }
        return prefix+rdStr;
    };
    module.exports = Util;
});

