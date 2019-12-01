define(function (require, exports, module) {
    var Util = require('./Util');
    var Grain = require('./Grain');

    /**è¿éæ¯æ³¨é
        * åå°å¨æé å½æ°
        * @param config
        *          id              èº«ä»½æ è¯ç¨äºåç»­å¯è§åç¼è¾å¨çç»´æ¤
        *          world           è¿ä¸ªlauncherçå®¿ä¸»
        *
        *          grainImage      ç²å­å¾ç
        *          grainList       ç²å­éå
        *          grainLife       äº§ççç²å­ççå½
        *          grainLifeRange  ç²å­çå½æ³¢å¨èå´
        *          maxAliveCount   æå¤§å­æ´»ç²å­æ°é
        *
        *          x               åå°å¨ä½ç½®x
        *          y               åå°å¨ä½ç½®y
        *          rangeX          åå°å¨ä½ç½®xæ³¢å¨èå´
        *          rangeY          åå°å¨ä½ç½®yæ³¢å¨èå´
        *
        *          sizeX           ç²å­æ¨ªåå¤§å°
        *          sizeY           ç²å­çºµåå¤§å°
        *          sizeRange       ç²å­å¤§å°æ³¢å¨èå´
        *
        *          mass            ç²å­è´¨éï¼ææ¶æ²¡ä»ä¹ç¨ï¼
        *          massRange       ç²å­è´¨éæ³¢å¨èå´
        *
        *          heat            åå°å¨èªèº«ä½ç³»çç­æ°
        *          heatEnable      åå°å¨èªèº«ä½ç³»çç­æ°çæå¼å³
        *          minHeat         éæºç­æ°æå°å¼
        *          maxHeat         éæºç­æ°æå°å¼
        *
        *          wind            åå°å¨èªèº«ä½ç³»çé£å
        *          windEnable      åå°å¨èªèº«ä½ç³»çé£åçæå¼å³
        *          minWind         éæºé£åæå°å¼
        *          maxWind         éæºé£åæå°å¼
        *
        *          grainInfluencedByWorldWind      ç²å­åå°ä¸çé£åå½±åå¼å³
        *          grainInfluencedByWorldHeat      ç²å­åå°ä¸çç­æ°å½±åå¼å³
        *          grainInfluencedByWorldGravity   ç²å­åå°ä¸çéåå½±åå¼å³
        *
        *          grainInfluencedByLauncherWind   ç²å­åå°åå°å¨é£åå½±åå¼å³
        *          grainInfluencedByLauncherHeat   ç²å­åå°åå°å¨ç­æ°å½±åå¼å³
        *
        * @constructor
        */



    function Launcher(config) {
        this.id = config.id;
        this.world = config.world;

        this.grainImage = config.grainImage;//ç²å­å¾ç
        this.grainList = [];
        this.grainLife = config.grainLife || 3;
        this.grainLifeRange = config.grainLifeRange || 1;
        this.maxAliveCount = config.maxAliveCount || 100;

        this.x = config.x;
        this.y = config.y;
        this.rangeX = config.rangeX || 0;
        this.rangeY = config.rangeY || 0;

        this.sizeX = config.sizeX || 16;
        this.sizeY = config.sizeY || 16;
        this.sizeRange = config.sizeRange || 0;

        this.initGrainVx = config.initGrainVx || 0;
        this.initGrainVxRange = config.initGrainVxRange || 0;
        this.initGrainVy = config.initGrainVy || 0;
        this.initGrainVyRange = config.initGrainVyRange || 0;

        this.mass = config.mass || 16;
        this.massRange = config.massRange || 0;

        this.heat = 0;
        this.heatEnable = true;
        this.minHeat = config.minHeat || 0;
        this.maxHeat = config.maxHeat || 0;

        this.wind = 0;
        this.windEnable = true;
        this.minWind = config.minWind || 0;
        this.maxWind = config.maxWind || 0;

        this.grainInfluencedByWorldWind = config.grainInfluencedByWorldWind ;
        this.grainInfluencedByWorldHeat = config.grainInfluencedByWorldHeat ;
        this.grainInfluencedByWorldGravity = config.grainInfluencedByWorldGravity ;

        this.grainInfluencedByLauncherWind = config.grainInfluencedByLauncherWind ;
        this.grainInfluencedByLauncherHeat = config.grainInfluencedByLauncherHeat ;

    }
    Launcher.prototype.updateLauncherStatus = function () {
        if (this.grainInfluencedByLauncherWind) {
            this.wind = Util.randomFloat(this.minWind, this.maxWind);
        }
        if(this.grainInfluencedByLauncherHeat){
            this.heat = Util.randomFloat(this.minHeat, this.maxHeat);
        }
    };
    Launcher.prototype.swipeDeadGrain = function (grain_id) {
        for (var i = 0; i < this.grainList.length; i++) {
            if (grain_id == this.grainList[i].id) {
                this.grainList = this.grainList.remove(i);
                this.createGrain(1);
                break;
            }
        }
    };
    Launcher.prototype.createGrain = function (count) {
        if (count + this.grainList.length <= this.maxAliveCount) {
            //æ°å»ºäºcountä¸ªå ä¸æ§çè¿æ²¡è¾¾å°æå¤§æ°é¢éå¶
        } else if (this.grainList.length >= this.maxAliveCount &&
            count + this.grainList.length > this.maxAliveCount) {
            //åæ¯æ§çç²å­æ°éè¿æ²¡è½è¾¾å°æå¤§éå¶
            //æ°å»ºäºcountä¸ªå ä¸æ§çè¶è¿äºæå¤§æ°é¢éå¶
            count = this.maxAliveCount - this.grainList.length;
        } else {
            count = 0;
        }
        for (var i = 0; i < count; i++) {
            var _rd = Util.randomFloat(0, Math.PI * 2);
            var _grain = new Grain({
                id: Util.randomString("", 8),
                world: this.world,
                launcher: this,
                x: this.x + Util.randomFloat(-this.rangeX,this.rangeX),
                y: this.y + Util.randomFloat(-this.rangeY,this.rangeY),
                sizeX: this.sizeX + this.sizeRange * Math.cos(_rd),
                sizeY: this.sizeY + this.sizeRange * Math.sin(_rd),
                vx:this.initGrainVx+Util.randomInt(-this.initGrainVxRange,this.initGrainVxRange),
                vy:this.initGrainVy+Util.randomInt(-this.initGrainVyRange,this.initGrainVyRange),
                mass: this.mass + this.massRange * Math.random(),
                alpha: 1,
                life: this.grainLife + Util.randomFloat(-this.grainLifeRange,this.grainLifeRange),
                birthTime: parseFloat(this.world.time),
                influencedByWorldWind: this.grainInfluencedByWorldWind,
                influencedByWorldHeat: this.grainInfluencedByWorlHeat,
                influencedByWorldGravity: this.grainInfluencedByWorldGravity,
                influencedByLauncherWind: this.grainInfluencedByLauncherWind,
                influencedByLauncherHeat: this.grainInfluencedByLauncherHeat
            });
            this.grainList.push(_grain);
        }
    };
    Launcher.prototype.paintGrain = function () {
        for (var i = 0; i < this.grainList.length; i++) {
        this.grainList[i].paint();
        //æ¯ä¸ä¸ªgrainListéé¢çä¸ªä½é½æ¯ä¸ä¸ªGrainå¯¹è±¡ï¼æä»¥å¾ªç¯ç»åºç²å­
    }
    };

    module.exports = Launcher;

});