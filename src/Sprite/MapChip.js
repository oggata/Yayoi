//
//  MapChip.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//

var MapChip = cc.Node.extend({
    ctor: function(itemData, confNum) {
        this._super();
        this.confNumber = null;
        this.mapId = null;
        this.humanId = null;
        this.isFoodAvailable = false;
        this.foodCount = 0;
        this.growingCount = 0;
        this.maxGrowingCount = getRandNumberFromRange(30*20,30*40);
        this.confNum = confNum;

        if (confNum == 2) {
            this.sprite = cc.Sprite.create(res.Map_Nature_png);
            this.sprite.setAnchorPoint(0.5, 0);
            this.addChild(this.sprite);
            this.itemData = itemData;
            this.isFoodAvailable = true;
        } else if (confNum == 3) {
            this.sprite = cc.Sprite.create(res.Map_Grand_png);
            this.sprite.setAnchorPoint(0.5, 0);
            this.addChild(this.sprite);
            this.itemData = itemData;
            this.isFoodAvailable = true;
        } else if (itemData == null) {
            this.sprite = cc.Sprite.create(res.Map_Nature_png);
            this.sprite.setAnchorPoint(0.5, 0);
            this.addChild(this.sprite);
            this.itemData = itemData;
            this.isFoodAvailable = true;
        } else if (itemData["map_chip"]) {
            this.baseSprite = cc.Sprite.create(res.Food_Base_Sprite_png);
            this.baseSprite.setAnchorPoint(0.5, 0);
            this.addChild(this.baseSprite);

            this.sprite = cc.Sprite.create(itemData["map_chip"]);
            this.sprite.setAnchorPoint(0.5, 0);
            this.addChild(this.sprite);
            this.itemData = itemData;

            if(this.itemData["food"] > 0){
                this.isFoodAvailable = false;
            }else{
                this.isFoodAvailable = true;
            }
        }
/*
        this.mapIdLabel = cc.LabelTTF.create("","Arial",30);
        this.mapIdLabel.setAnchorPoint(0.5,0);
        this.addChild(this.mapIdLabel);
*/
    },

    init: function() {},

    update: function() {
        if(this.isFoodAvailable == false){
            this.growingCount++;
            if(this.growingCount >= this.maxGrowingCount)
            {
                this.isFoodAvailable = true;
                this.growingCount = 0;
            }
        }
        if (this.isFoodAvailable) {
            this.sprite.setOpacity(255 * 1);
        } else {
            this.sprite.setOpacity(255 * 0);
        }
    },
});