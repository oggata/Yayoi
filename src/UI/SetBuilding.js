//
//  SetBuilding.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//

var SetBuilding = cc.Node.extend({
    //Lose->戻る
    ctor: function(game) {
        this._super();
        this.game = game;
        this.mapChip = null;
        this.itemData = null;

        this.base = cc.Sprite.create(res.Window_Reset_png);
        this.base.setAnchorPoint(0.5, 0);
        this.addChild(this.base);
        this.setVisible(false);

        var okButton = new cc.MenuItemImage(res.Button_Ok_png, res.Button_Ok_On_png, function() {
            if(this.game.hasItemData["id"] && this.game.hasItemData["amount"])
            {
                if(this.game.isExistsItemKey(this.game.hasItemData["id"]) == true
                    && this.game.hasItemData["amount"] > 0)
                {
                    this.game.mapManager.amount -= this.itemData["amount"];
                    this.game.storage.setMapData(
                        this.game.hasItemData["id"],
                        this.mapChip.confNumber
                    );
                }
            }
            this.game.hasItemData = null;
            this.game.isReadyToRenderMap = true;
            this.setVisible(false);
            playSE002_Button();
        }, this);
        okButton.setPosition(-60, 45);

        var ngButton = new cc.MenuItemImage(res.Button_Ng_png, res.Button_Ng_On_png, function() {
            this.game.hasItemData = null;
            this.game.isReadyToRenderMap = true;
            this.setVisible(false);
        }, this);
        ngButton.setPosition(60, 45);

        this.messageLabel = cc.LabelTTF.create("", "Arial", 22);
        this.messageLabel.setFontFillColor(new cc.Color(0, 0, 0, 255));
        this.messageLabel.setAnchorPoint(0.5, 0.5);
        this.base.addChild(this.messageLabel);
        this.messageLabel.setPosition(200,120);

        var menu022 = new cc.Menu(okButton, ngButton);
        menu022.setPosition(0, 0);
        this.addChild(menu022);
    },

    update: function() {
        if (this.game.hasItemData) {
            this.game.targetItem.setOpacity(0.5 * 255);
            this.messageLabel.setString("この場所に「" + this.game.hasItemData["name"] + "」\nを建設します");
        }else{
            this.game.targetItem.setOpacity(0 * 255);
        }
    },
});