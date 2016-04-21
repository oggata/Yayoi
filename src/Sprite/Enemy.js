//
//  Enemy.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//

var Enemy = cc.Node.extend({
    ctor: function(game,enemyId) {
        this._super();
        this.game = game;
        this.mapId = null;
        this.image = res.Effect_Enemy_png;
        this.initializeWalkAnimation();
        this.warriorCount = getRandNumberFromRange(3,5);
        this.hp = 150 * this.warriorCount;
        this.maxHp = 150 * this.warriorCount;
        this.reward = 50;
        /*
        this.gauge = new Gauge(80, 7, 'food');
        this.gauge.setAnchorPoint(0, 0);
        this.gauge.setPosition(-40, -30);
        this.addChild(this.gauge);
        */
    },

    init: function() {},

    update: function() {
        if(this.hp > 0)
        {
            //this.gauge.update(this.hp / this.maxHp);
            this.setVisible(true);
            return true;
        }else{
            this.setVisible(false);
            return false;
        }
    },

    initializeWalkAnimation: function() {
        var frameSeq = [];
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var frame = cc.SpriteFrame.create(this.image, cc.rect(750/3 * j, 750/3 * i,
                    750/3, 750/3));
                frameSeq.push(frame);
            }
        }
        this.wa = cc.Animation.create(frameSeq, 0.1);
        this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
        this.sprite = cc.Sprite.create(this.image, cc.rect(0, 0, 750/3, 750/3));
        this.sprite.runAction(this.ra);
        this.addChild(this.sprite);
        this.sprite.setOpacity(255 * 0.8);
    },
});