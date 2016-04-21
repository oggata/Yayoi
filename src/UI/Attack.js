//
//  SetBuilding.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//

var Attack = cc.Node.extend({
    //Lose->戻る
    ctor: function(game) {
        this._super();
        this.game = game;
        this.enemy = null;
        this.mapChip = null;
        this.itemData = null;
        this.mapId = null;
        this.isPushOk = false;

        //建物リセット用のwindow
        this.base = cc.Sprite.create(res.Attack_Window_png);
        this.base.setAnchorPoint(0.5, 0);
        this.base.setOpacity(255 * 0.6);
        this.addChild(this.base);
        this.setVisible(false);

        var okButton = new cc.MenuItemImage(res.Build_Ok_Button, res.Build_Ok_Button, function() {
            if (this.game.mapManager.safePositions.length == 0) return;
            if (this.isPushOk == false) return;
            
            var _minDist = 99999;
            var _housePosition = null;
            for (var h = 0; h < this.game.mapManager.safePositions.length; h++) {
                var _dist = this.game.mapManager.getDistanceTowPositions(
                    this.game.mapManager.safePositions[h].mapId,
                    this.mapId
                );
                if(_dist < _minDist)
                {
                    _minDist = _dist;
                    _housePosition = this.game.mapManager.safePositions[h].mapId;
                }
            }

            for (var i = 0; i < this.enemy.warriorCount; i++) {
                this.game.addWarriorByMapChip(
                    _housePosition,
                    this.mapId,
                    i*18
                );
                this.game.mapManager.food -= CONFIG.FOOD_AMOUNT_FOR_SALLY_WARRIOR ;
            }
            this.setVisible(false);
            playSE002_Button();
        }, this);
        okButton.setPosition(-170 + 170 / 2, 70);

        //建物リセット用のwindow
        this.unUseSprite = cc.Sprite.create(res.Unuse_Sprite_png);
        this.unUseSprite.setAnchorPoint(0,0);
        okButton.addChild(this.unUseSprite);

        this.messageLabel = cc.LabelTTF.create("", "Arial", 28);
        this.messageLabel.setFontFillColor(new cc.Color(0, 0, 0, 255));
        this.messageLabel.enableStroke(new cc.Color(192, 192, 192, 255), 1, false);
        this.messageLabel.setAnchorPoint(0.5, 0.5);
        this.base.addChild(this.messageLabel);
        this.messageLabel.setPosition(280, 200);

        var menu022 = new cc.Menu(okButton);
        menu022.setPosition(0, 0);
        this.addChild(menu022);
    },

    update: function() {
        if(this.enemy)
        {
            this.setPosition(this.enemy.getPosition().x,this.enemy.getPosition().y);
            this.setVisible(true);

            if(this.game.mapManager.safePositions.length == 0)
            {
                this.messageLabel.setString("監視塔が必要です");
                this.isPushOk = false;
            }else if(this.enemy.warriorCount * CONFIG.FOOD_AMOUNT_FOR_SALLY_WARRIOR <= this.game.mapManager.food)
            {
                if(this.enemy.warriorCount <= Math.ceil(this.game.mapManager.maxSafe - this.game.warriorCount)){
                    this.messageLabel.setString(this.enemy.warriorCount + "人を出撃します.\n(必要な食料:" + this.enemy.warriorCount * CONFIG.FOOD_AMOUNT_FOR_SALLY_WARRIOR  + ")\n");
                    this.isPushOk = true;
                }else{
                    this.messageLabel.setString("出撃する人数が足りません.\n(" + this.enemy.warriorCount + "人必要)");
                    this.isPushOk = false;
                }
            }else{
                this.messageLabel.setString("食料が不足しています.\n(食料が" + this.enemy.warriorCount * CONFIG.FOOD_AMOUNT_FOR_SALLY_WARRIOR  + "必要)");
                this.isPushOk = false;
            }   
        }else{
            this.setVisible(false);
        }

        if(this.isPushOk == true)
        {  
            this.unUseSprite.setVisible(false);
        }else{
            this.unUseSprite.setVisible(true);
        }

    },
});