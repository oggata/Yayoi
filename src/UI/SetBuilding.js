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

        //建物リセット用のwindow
        this.base = cc.Sprite.create(res.Reset_png);
        this.base.setAnchorPoint(0.5, 0);
        this.addChild(this.base);
        this.setVisible(false);

        var okButton = new cc.MenuItemImage(res.Build_Ok_Button, res.Build_Ok_Button, function() {
            this.game.targetOkSprite.setVisible(false);
            this.game.targetNgSprite.setVisible(false);
            this.game.targetItem.setOpacity(0 * 255);
            this.game.mapManager.amount -= this.itemData["amount"];
            this.game.storage.setMapData(
                this.game.hasItemData["id"],
                this.mapChip.confNumber
            );
            this.game.hasItemData = null;
            this.game.isReadyToRenderMap = true;
            this.setVisible(false);
            playSE002_Button();
        }, this);
        okButton.setPosition(-170 + 170 / 2, 70);

        var ngButton = new cc.MenuItemImage(res.Build_Ng_Button, res.Build_Ng_Button, function() {
            this.game.targetOkSprite.setVisible(false);
            this.game.targetNgSprite.setVisible(false);
            this.game.targetItem.setOpacity(0 * 255);
            this.game.hasItemData = 0;
            this.game.isReadyToRenderMap = true;
            this.setVisible(false);
        }, this);
        ngButton.setPosition(0 + 170 / 2, 70);

        this.messageLabel = cc.LabelTTF.create("", "Arial", 28);
        this.messageLabel.setFontFillColor(new cc.Color(0, 0, 0, 255));
        this.messageLabel.enableStroke(new cc.Color(192, 192, 192, 255), 1, false);
        this.messageLabel.setAnchorPoint(0.5, 0.5);
        this.base.addChild(this.messageLabel);
        this.messageLabel.setPosition(280, 200);

        var menu022 = new cc.Menu(okButton, ngButton);
        menu022.setPosition(0, 0);
        this.addChild(menu022);
    },

    update: function() {
        if (this.game.hasItemData) {
            this.messageLabel.setString("この場所に「" + this.game.hasItemData["name"] + "」\nを建設します");
        }
    },
});