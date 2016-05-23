//
//  Enemy.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//

var Enemy = cc.Node.extend({
    ctor: function(game, enemyId) {
        this._super();
        this.game = game;
        this.route = [];
        this.image = res.Enemy_001_png;
        this.maxKillPeopleCount = 5;
        this.killedPeopleCount = 0;
        this.pastMaxMonth = 12;
        this.pastMonth = 0;

        this.warriorCount = 5;
        this.hp = 150 * this.warriorCount;
        this.maxHp = 150 * this.warriorCount;
        this.reward = 8 * this.warriorCount;
        this.name = "祟鬼lv." + this.warriorCount;
        this.description = "病や災害などをもたらす";
        this.imgHeight = 128;
        this.imgWidth = 128;
        this.direction = "";

        this.initializeWalkAnimation();
        this.routeId = 0;
        this.targetMarker = null;
        this.walkSpeed = 3;
        this.testCnt = 0;
        this.giveRewordFlag = 1;
    },

    init: function() {},

    update: function() {
        if(this.killedPeopleCount >= this.maxKillPeopleCount)
        {
            this.giveRewordFlag = 0;
            return false;
        }

        if(this.pastMonth >= this.pastMaxMonth)
        {
            this.giveRewordFlag = 0;
            return false;    
        }

        if (this.hp > 0) {
            this.moveToTargetMarker(this.targetMarker);
            this.setVisible(true);
            return true;
        } else {
            this.setVisible(false);
            return false;
        }
    },

    isHitEnemies : function(nextTargetMarker)
    {
        for (var i = 0; i < this.game.enemies.length; i++) {
            if(this.game.enemies[i] != this)
            {
                if(this.game.enemies[i].targetMarker == nextTargetMarker)
                {
                    return true;
                }
            }
        }
        return false;
    },

    incrementRouteId: function() {
        this.targetMarker = this.game.getMapChipByMapId(this.route[0]);
        this.pastMonth++;
        if (this.route.length > 1) {
            //もし削除後のマーカーが被っていたら動かない
            var _nextTargetMarker = this.game.getMapChipByMapId(this.route[1]);
            if(this.isHitEnemies(_nextTargetMarker) == false)
            {
                this.route.splice(0, 1);
                this.targetMarker = this.game.getMapChipByMapId(this.route[0]);
            }
        }
    },

    moveToTargetMarker: function(targetSprite) {
        if (!targetSprite) return;
        if (targetSprite == null) return;

        if (targetSprite.getPosition()) {
            var dX = targetSprite.getPosition().x - this.getPosition().x;
            var dY = targetSprite.getPosition().y + 108 / 2 - this.getPosition().y;
            if (Math.abs(dX) < 2 && Math.abs(dY) < 2) {
                return;
            }
            this.setDirection(targetSprite);

            var rad = Math.atan2(dX, dY);
            var speedX = this.walkSpeed * Math.sin(rad);
            var speedY = this.walkSpeed * Math.cos(rad);
            this.setPosition(
                this.getPosition().x + speedX,
                this.getPosition().y + speedY
            );
        }
    },

    initializeWalkAnimation: function() {
        var frameSeq = [];
        for (var i = 0; i < 1; i++) {
            for (var j = 0; j < 2; j++) {
                var frame = cc.SpriteFrame.create(this.image, cc.rect(this.imgWidth * j, this.imgHeight * i,
                    this.imgWidth, this.imgHeight));
                frameSeq.push(frame);
            }
        }
        this.wa = cc.Animation.create(frameSeq, 0.5);
        this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
        this.sprite = cc.Sprite.create(this.image, cc.rect(0, 0, this.imgWidth, this.imgHeight));
        this.sprite.runAction(this.ra);
        this.addChild(this.sprite);
        this.sprite.setScale(1.4, 1.4);
    },

    setDirection: function(targetSprite) {
        if (!targetSprite) return;
        var diffX = Math.floor(targetSprite.getPosition().x - this.getPosition().x);
        var diffY = Math.floor((targetSprite.getPosition().y * -1) - 108 / 2 - (this.getPosition().y * -1));
        if (diffX > 0 && diffY > 0) {
            this.walkRightUp();
        }
        if (diffX > 0 && diffY < 0) {
            this.walkRightDown();
        }
        if (diffX < 0 && diffY > 0) {
            this.walkLeftUp();
        }
        if (diffX < 0 && diffY < 0) {
            this.walkLeftDown();
        }
    },

    walkLeftDown: function() {
        //左下
        if (this.direction != "leftdown") {
            this.direction = "leftdown";
            this.sprite.stopAllActions();
            var frameSeq = [];
            for (var i = 0; i < 3; i++) {
                var frame = cc.SpriteFrame.create(this.image, cc.rect(this.imgWidth * i, this.imgHeight * 0, this.imgWidth, this.imgHeight));
                frameSeq.push(frame);
            }
            this.wa = cc.Animation.create(frameSeq, 0.5);
            this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
            this.sprite.runAction(this.ra);
        }
    },

    walkRightDown: function() {
        //右下
        if (this.direction != "rightdown") {
            this.direction = "rightdown";
            this.sprite.stopAllActions();
            var frameSeq = [];
            for (var i = 0; i < 3; i++) {
                var frame = cc.SpriteFrame.create(this.image, cc.rect(this.imgWidth * i, this.imgHeight * 1, this.imgWidth, this.imgHeight));
                frameSeq.push(frame);
            }
            this.wa = cc.Animation.create(frameSeq, 0.5);
            this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
            this.sprite.runAction(this.ra);
        }
    },

    walkLeftUp: function() {
        //左上
        if (this.direction != "leftup") {
            this.direction = "leftup";
            this.sprite.stopAllActions();
            var frameSeq = [];
            for (var i = 0; i < 3; i++) {
                var frame = cc.SpriteFrame.create(this.image, cc.rect(this.imgWidth * i, this.imgHeight * 2, this.imgWidth, this.imgHeight));
                frameSeq.push(frame);
            }
            this.wa = cc.Animation.create(frameSeq, 0.5);
            this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
            this.sprite.runAction(this.ra);
        }
    },

    walkRightUp: function() {
        //右上
        if (this.direction != "rightup") {
            this.direction = "rightup";
            this.sprite.stopAllActions();
            var frameSeq = [];
            for (var i = 0; i < 3; i++) {
                var frame = cc.SpriteFrame.create(this.image, cc.rect(this.imgWidth * i, this.imgHeight * 3, this.imgWidth, this.imgHeight));
                frameSeq.push(frame);
            }
            this.wa = cc.Animation.create(frameSeq, 0.5);
            this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
            this.sprite.runAction(this.ra);
        }
    },

    walkStop: function() {
        //右上
        if (this.direction != "stop") {
            this.direction = "stop";
            this.sprite.stopAllActions();
            var frameSeq = [];
            for (var i = 0; i < 3; i++) {
                var frame = cc.SpriteFrame.create(this.image, cc.rect(this.imgWidth * i, this.imgHeight * 4, this.imgWidth, this.imgHeight));
                frameSeq.push(frame);
            }
            this.wa = cc.Animation.create(frameSeq, 0.2);
            this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
            this.sprite.runAction(this.ra);
        }
    },

    walkDead: function() {
        //右上
        if (this.direction != "dead") {
            this.direction = "dead";
            this.sprite.stopAllActions();
            var frameSeq = [];
            for (var i = 0; i < 1; i++) {
                var frame = cc.SpriteFrame.create(this.image, cc.rect(this.imgWidth * i, this.imgHeight * 5, this.imgWidth, this.imgHeight));
                frameSeq.push(frame);
            }
            this.wa = cc.Animation.create(frameSeq, 0.2);
            this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
            this.sprite.runAction(this.ra);
        }
    },

    walkSleep: function() {
        //右上
        if (this.direction != "sleep") {
            this.direction = "sleep";
            this.sprite.stopAllActions();
            var frameSeq = [];
            for (var i = 0; i < 1; i++) {
                var frame = cc.SpriteFrame.create(this.image, cc.rect(this.imgWidth * i, this.imgHeight * 6, this.imgWidth, this.imgHeight));
                frameSeq.push(frame);
            }
            this.wa = cc.Animation.create(frameSeq, 0.2);
            this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
            this.sprite.runAction(this.ra);
        }
    },
});