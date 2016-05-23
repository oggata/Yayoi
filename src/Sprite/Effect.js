//
//  Effect.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//

var Effect = cc.Node.extend({
    ctor: function(game,itemId) {
        this._super();
        this.game = game;
        if(itemId == "money")
        {
            this.image = res.Effect_Money_png;
            this.itemWidth = 240;
            this.itemHeight = 240;
            this.widthCount = 5;
            this.heightCount = 6;
            this.effectInterval = 0.05;
        }else if(itemId == "hart"){
            this.image = res.Effect_Hart_png;
            this.itemWidth = 240;
            this.itemHeight = 240;
            this.widthCount = 9;
            this.heightCount = 1;
            this.effectInterval = 0.08;
        }
        this.initializeWalkAnimation();
        this.effectTime = 0;
    },

    init: function() {},

    update: function() {
        this.effectTime++;
        if(this.effectTime >= 30 * 2)
        {
            this.effectTime = 0;
            return false;
        }
        return true;
    },

    initializeWalkAnimation: function() {
        var frameSeq = [];
        for (var i = 0; i < this.heightCount; i++) {
            for (var j = 0; j < this.widthCount; j++) {
                var frame = cc.SpriteFrame.create(this.image, cc.rect(this.itemWidth * j, this.itemHeight * i,this.itemWidth, this.itemHeight));
                frameSeq.push(frame);
            }
        }
        this.wa = cc.Animation.create(frameSeq, this.effectInterval);
        this.ra = cc.Repeat.create(cc.Animate.create(this.wa),1);
        //this.ra = cc.RepeatForever.create(cc.Animate.create(this.wa));
        this.sprite = cc.Sprite.create(this.image, cc.rect(0, 0, this.itemWidth, this.itemHeight));
        this.sprite.runAction(this.ra);
        this.addChild(this.sprite);
    },
});