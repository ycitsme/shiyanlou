define(function(require, exports, module) {
    var Util = require('./Util');
    var Launcher = require('./Launcher');

    function World(config){
        this.backgroundImage = config.backgroundImage;
        this.canvas = config.canvas;
        this.context = config.canvas.getContext('2d');

        this.time = 0;

        /*
            éåå éåº¦ï¼æ¹åæ¯åç´ç
            ä¸è¬æ¥è¯´ä¸ä¸ªä¸çéåå éåº¦æ¯ç¨³å®ç
            åè®¸çªåï¼ä½ååä¸ä¼åHeatæèWindä¸æ ·ä¸ç¨³å®
         */
        this.gravity = config.gravity || 1;

        /*
            ç­æ° Heat
            ç­æ°å¼ºåº¦æ»æ¯éæºçï¼æ¹ååç´åä¸ç
            å½heatEnableæ¶ï¼ç­æ°å¤§å°ä¼éçupdateStatus()åæ¹å
            åå¨å¹åº¦æ¯minHeatå°maxHeat
         */
        this.heat = 8;
        this.heatEnable = true;
        this.minHeat = config.minHeat || 16;
        this.maxHeat = config.maxHeat || 20;

        /*
            é£å Wind
            é£åå¼ºåº¦æ»æ¯éæºçï¼æ¹åæ¯å·¦å³çï¼æ­£æ¹åä¸ºå³å
            å½windEnableæ¶ï¼ç­æ°å¤§å°ä¼éçupdateStatus()åæ¹å
            åå¨å¹åº¦æ¯minHeatå°maxHeat
         */
        this.wind = 0;
        this.windEnable = true;
        this.minWind = config.minWind || -5 ;
        this.maxWind = config.maxWind || 5;

        /*
            Worldçæ¶é´éå¢éåº¦
            æ¯ä¸æ¬¡TimeTické½ä¼è®©timeå ä¸è¿ä¸ªå¼
            å¦æä¸ºè´æ°ï¼é£ä¹æ¶é´éæµ
         */
        this.timeProgress = config.timeProgress || 0.1;

        this.launchers = []; //åå°å¨åè¡¨
    }

    World.prototype.drawBackground = function(){
        this.context.save();
        this.context.drawImage(this.backgroundImage,0,0,this.canvas.width,this.canvas.height);
        this.context.restore();
    };//ç»ç»ä¸çèæ¯
    World.prototype.updateStatus = function(){
        this.wind = Util.randomFloat(this.minWind,this.maxWind);
        this.heat = Util.randomFloat(this.minHeat,this.maxHeat);
    };//æ´æ°ä¸ççç¶æ
    World.prototype.timeTick = function(){
        this.time+=this.timeProgress;

        //æ´æ°ä¸çåç§ç¶æ
        this.updateStatus();

        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
        this.drawBackground();

        //è§¦åææåå°å¨çå¾ªç¯è°ç¨å½æ°
        for(var i = 0;i<this.launchers.length;i++){
            this.launchers[i].updateLauncherStatus();
            this.launchers[i].createGrain(1);
            this.launchers[i].paintGrain();
        }
    };//å¾ªç¯æ§è¡ä»»å¡
    World.prototype.createLauncher = function(config){
        var _launcher = new Launcher(config);
        this.launchers.push(_launcher);
    };//åå»ºLauncher


    module.exports = World;
   });