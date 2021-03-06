//
//  Item.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//

var Item = cc.Node.extend({
    ctor: function(game,itemId) {
        this._super();
        this.game = game;
        this.imgWidth = 70;
        this.imgHeight = 80;
        this.mapId = null;
        if(itemId == "food")
        {
            this.image = "res/item_food.png";
            this.initializeWalkAnimation();
        }else if(itemId == "money"){
            this.image = "res/item_money.png";
            this.initializeWalkAnimation();
        }else if(itemId == "doki"){
            this.image = "res/item_doki.png";
            this.initializeWalkAnimation();
        }else if(itemId == "ill"){
            this.image = res.Effect_Enemy_png;
            this.initializeWalkAnimation3();
        }else if(itemId == "event_food"){
            this.image = "res/item_food.png";
            this.initializeWalkAnimation2();
        }else if(itemId == "event_food"){
            this.image = "res/item_food.png";
            this.initializeWalkAnimation2();
        }else if(itemId == "event_food"){
            this.image = "res/item_food.png";
            this.initializeWalkAnimation2();
        }else if(itemId == "event_food"){
            this.image = "res/item_food.png";
            this.initializeWalkAnimation2();
        }else if(itemId == "event_food"){
            this.image = "res/item_food.png";
            this.initializeWalkAnimation2();
        }
    },

    init: function() {},

    update: function() {

    },

    initializeWalkAnimation: function() {
        var frameSeq = [];
        for (var i = 0; i < 3; i++) {
            var frame = cc.SpriteFrame.create(this.image, cc.rect(this.imgWidth * i, this.imgHeight * 0,
                this.imgWidth, this.imgHeight));
            frameSeq.push(frame);
        }
        this.wa = cc.Animation.create(frameSeq, 0.2);
        this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
        this.sprite = cc.Sprite.create(this.image, cc.rect(0, 0, this.imgWidth, this.imgHeight));
        this.sprite.runAction(this.ra);
        this.addChild(this.sprite);
        this.sprite.setScale(1.5, 1.5);
    },

    initializeWalkAnimation2: function() {
        this.sprite = cc.Sprite.create(res.Map_Target_Ok_png);
        this.sprite.retain();
        this.sprite.setAnchorPoint(0.5, 0);
        this.addChild(this.sprite, 9999999);
    },

    initializeWalkAnimation3: function() {
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
        this.sprite = cc.Sprite.create(this.image, cc.rect(0, 0, this.imgWidth, this.imgHeight));
        this.sprite.runAction(this.ra);
        this.addChild(this.sprite);
        //this.sprite.setScale(1.2,1.2);
        //this.sprite.setScale.setOpacity(0.8*255);
        this.sprite.setOpacity(255 * 0.8);
    },
});