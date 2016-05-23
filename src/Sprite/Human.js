//
//  Human.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//

var Human = cc.Node.extend({
    ctor: function(game,type) {
        this._super();
        this.game = game;
        this.type = type;
        this.humanId = getRandNumberFromRange(1, 9999999);
        this.icons = [];
        this.direction = "";
        this.walkingDirection = "";
        this.tmpWalkingDirection = "";
        this.walkSpeed = 1.5;
        this.route = [];
        var rand = getRandNumberFromRange(1, 3);
        this.image = res.Animal_001_png;
        this.imgWidth = 70;
        this.imgHeight = 90;
        if (rand == 2) {
            this.image = res.Animal_002_png;
            this.imgWidth = 70;
            this.imgHeight = 90;
        }
        if(this.type == 2)
        {
            this.image = res.Animal_003_png;
            this.imgWidth = 233/3;
            this.imgHeight = 700/7;
        }
        this.initializeWalkAnimation();
        this.startTime = 0;
        this.startMaxTime = getRandNumberFromRange(30, 30 * 15);
        this.isTrouble = 0;
        this.isStop = false;
        this.deadCnt = 0;
        this.stopCount = 0;
        this.iconTime = 0;
        this.iconMaxTime = getRandNumberFromRange(30, 30 * 10);
        this.setVisible(false);
        this.targetMarker = null;
    },

    init: function() {},

    update: function() {

        if(this.stopCount >= 1)
        {
            this.isStop = true;
            this.stopCount++;
            if(this.stopCount >= 30 * 2)
            {
                this.isStop = false;
                this.stopCount = 0;
            }
        }

        //死亡した場合の判定
        if (this.deadCnt >= 1) {
            this.deadCnt++;
            if (this.deadCnt >= 30 * CONFIG.PEOPLE_DEAD_SECOND) {
                return false;
            }
        }

        for (var i = 0; i < this.icons.length; i++) {
            this.icons[i].visibleTime++;
            if (this.icons[i].visibleTime >= 30 * 2) {
                this.removeChild(this.icons[i]);
                this.icons.splice(i, 1);
            }
        }

        this.startTime++;
        if (this.startTime < this.startMaxTime) {
            this.setVisible(false);
            return;
        }

        this.iconTime++;
        if (this.iconTime >= 30 * 5) {
            this.iconTime = 0;
            var _rand = getRandNumberFromRange(1, 5);
            if (this.icons.length == 0 && _rand == 3) {

                //感情アイコンを出せるのは生きている人だけ
                if (this.deadCnt == 0) {
                    if (this.game.mapManager.happyRate >= 0.8) {
                        this.setEmotion("good");
                    } else if (this.game.mapManager.happyRate >= 0.6) {
                        this.setEmotion("good");
                    } else if (this.game.mapManager.happyRate >= 0.5) {} else if (this.game.mapManager.happyRate >= 0.3) {
                        this.setEmotion("need_food");
                    } else if (this.game.mapManager.happyRate >= 0.2) {
                        this.setEmotion("need_food");
                    } else {
                        this.setEmotion("need_food");
                    }
                }
            }
        }
        this.setVisible(true);

        //ルートにぶつかったら配列から削除する
        if (this.route.length >= 1) {
            var target = null;
            if (this.game.mapChips[this.route[0] - 1]) {
                //ターゲットになるマーカーは配列の一番若い番号 Array[0]
                target = this.game.mapChips[this.route[0] - 1];
                this.targetMarker = target;
                if (this.game.mapChips[this.route[0] - 1].getPosition) {
                    var _targetX = this.game.mapChips[this.route[0] - 1].getPosition().x;
                    var _targetY = this.game.mapChips[this.route[0] - 1].getPosition().y;
                }

                //ターゲットが存在する場合は動く
                if (target != null) {
                    this.moveToTargetMarker(target);
                    var dX = target.getPosition().x - this.getPosition().x;
                    var dY = target.getPosition().y + 108 / 2 - this.getPosition().y;
                    var dist = Math.sqrt(dX * dX + dY * dY);
                    //ターゲットの中央に接近した場合の判定
                    if (dist <= 10) {
                        this.route.splice(0, 1);
                    }
                }
            }
        } else {
            return false;
        }
        return true;
    },

    remove: function() {
        this.removeChild(this.sprite);
    },

    getDirection: function() {
        return this.direction;
    },

    initializeWalkAnimation: function() {
        var frameSeq = [];
        for (var i = 0; i < 3; i++) {
            var frame = cc.SpriteFrame.create(this.image, cc.rect(this.imgWidth * i, this.imgHeight * 0,
                this.imgWidth, this.imgHeight));
            frameSeq.push(frame);
        }
        this.wa = cc.Animation.create(frameSeq, 0.2);
        this.wa.retain();
        this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
        this.ra.retain();
        this.sprite = cc.Sprite.create(this.image, cc.rect(0, 0, this.imgWidth, this.imgHeight));
        this.sprite.retain();
        this.sprite.runAction(this.ra);
        this.addChild(this.sprite);
        this.sprite.setScale(0.8, 0.8);
    },

    moveToTargetMarker: function(targetSprite) {
        if (!targetSprite) return;
        if (targetSprite == null) return;
        this.setDirection(targetSprite);

        if (this.isStop == false && this.deadCnt == 0) {

            if (targetSprite.getPosition()) {
                var dX = targetSprite.getPosition().x - this.getPosition().x;
                var dY = targetSprite.getPosition().y + 108 / 2 - this.getPosition().y;
                var rad = Math.atan2(dX, dY);
                var speedX = this.walkSpeed * Math.sin(rad);
                var speedY = this.walkSpeed * Math.cos(rad);
                this.setPosition(
                    this.getPosition().x + speedX,
                    this.getPosition().y + speedY
                );
            }
        }
    },

    isDead: function() {
        if (this.deadCnt >= 1) {
            return true;
        }
        return false;
    },

    setDirection: function(targetSprite) {
        if (!targetSprite) return;
        //横の距離が大きいとき
        var diffX = Math.floor(targetSprite.getPosition().x - this.getPosition().x);
        var diffY = Math.floor((targetSprite.getPosition().y * -1) - 108 / 2 - (this.getPosition().y * -1));

        if (this.deadCnt >= 1) {
            this.walkDead();
        } else if (this.isStop) {
            this.walkStop();
        } else {
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
        }
    },

    setEmotion: function(emotionType) {
        var icon = new Icon(emotionType);
        this.addChild(icon);
        this.icons.push(icon);
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
            this.wa = cc.Animation.create(frameSeq, 0.2);
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
            this.wa = cc.Animation.create(frameSeq, 0.2);
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
            this.wa = cc.Animation.create(frameSeq, 0.2);
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
            this.wa = cc.Animation.create(frameSeq, 0.2);
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