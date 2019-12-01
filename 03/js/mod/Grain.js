define(function (require, exports, module) {
    var Util = require('./Util');

    /**
     * ç²å­æé å½æ°
     * @param config
     *          id              å¯ä¸æ è¯
     *          world           ä¸çå®¿ä¸»
     *          launcher        åå°å¨å®¿ä¸»
     *
     *          x               ä½ç½®x
     *          y               ä½ç½®y
     *          vx              æ°´å¹³éåº¦
     *          vy              åç´éåº¦
     *
     *          sizeX           æ¨ªåå¤§å°
     *          sizeY           çºµåå¤§å°
     *
     *          mass            è´¨é
     *          life            çå½é¿åº¦
     *          birthTime       åºçæ¶é´
     *
     *          color_r
     *          color_g
     *          color_b
     *          alpha           éæåº¦
     *          initAlpha       åå§åæ¶çéæåº¦
     *
     *          influencedByWorldWind
     *          influencedByWorldHeat
     *          influencedByWorldGravity
     *          influencedByLauncherWind
     *          influencedByLauncherHeat
     *
     * @constructor
     */
    function Grain(config) {
        this.id = config.id;

        this.world = config.world;
        this.launcher = config.launcher;

        this.x = config.x;
        this.y = config.y;

        this.vx = config.vx || 0;
        this.vy = config.vy || 0;

        this.sizeX = config.sizeX;
        this.sizeY = config.sizeY;

        this.mass = config.mass;
        this.life = config.life;
        this.birthTime = config.birthTime;

        this.color_r = config.color_r || 0;
        this.color_g = config.color_g || 0;
        this.color_b = config.color_b || 0;
        this.initAlpha = this.alpha = config.alpha || 1;

        //æ¯å¦åå°ä¸ççWind Heat Gravityå½±å
        this.influencedByWorldWind = config.influencedByWorldWind;
        this.influencedByWorldHeat = config.influencedByWorldHeat;
        this.influencedByWorldGravity = config.influencedByWorldGravity;

        //æ¯å¦åå°LauncherçWind Heat Gravityå½±å
        this.influencedByLauncherWind = config.influencedByLauncherWind;
        this.influencedByLauncherHeat = config.influencedByLauncherHeat;

    }

    Grain.prototype.isDead = function () {
        return Math.abs(this.world.time - this.birthTime)>this.life;
    };
    Grain.prototype.calculate = function () {
        //è®¡ç®ä½ç½®
        if (this.influencedByWorldGravity) {
            this.vy += this.world.gravity+Util.randomFloat(0,0.3*this.world.gravity);
        }
        if (this.influencedByWorldHeat && this.world.heatEnable) {
            this.vy -= this.world.heat+Util.randomFloat(0,0.3*this.world.heat);
        }
        if (this.influencedByLauncherHeat && this.launcher.heatEnable) {
            this.vy -= this.launcher.heat+Util.randomFloat(0,0.3*this.launcher.heat);
        }
        if (this.influencedByWorldWind && this.world.windEnable) {
            this.vx += this.world.wind+Util.randomFloat(0,0.3*this.world.wind);
        }
        if (this.influencedByLauncherWind && this.launcher.windEnable) {
            this.vx += this.launcher.wind+Util.randomFloat(0,0.3*this.launcher.wind);
        }
        this.y += this.vy;
        this.x += this.vx;
        this.alpha = this.initAlpha * (1 - (this.world.time - this.birthTime) / this.life);
    };
    Grain.prototype.paint = function () {
        if (this.isDead()) {
            this.launcher.swipeDeadGrain(this.id);
        } else {
            this.calculate();
            this.world.context.save();
            this.world.context.globalCompositeOperation = 'lighter';
            //æå¤ç§å¤æ ·çå±æ§ï¼ç´æ¥å½±åæ¯ä¸ªç²å­çæ¾ç¤ºææ
            this.world.context.globalAlpha = this.alpha;
            this.world.context.drawImage(this.launcher.grainImage, this.x-(this.sizeX)/2, this.y-(this.sizeY)/2, this.sizeX, this.sizeY);
            this.world.context.restore();
        }
    };
    module.exports = Grain;
});