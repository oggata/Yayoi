//
//  RemoveBuilding.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//

var RemoveBuilding = cc.Node.extend(
{
    //Lose->戻る
    ctor : function (game) 
    {
        this._super();
        this.game = game;
        this.mapChipId = null;
        //建物リセット用のwindow
        this.base = cc.Sprite.create(res.Reset_png);
        this.base.setAnchorPoint(0.5, 0);
        this.addChild(this.base);
        this.setVisible(false);

        this.okButton = new cc.MenuItemImage(res.Build_Ok_Button, res.Build_Ok_Button, function() {
            this.game.storage.setMapData(3,this.mapChipId);
            this.setVisible(false);
            this.game.mapManager.amount -= 20;
            this.game.isReadyToRenderMap = true;
        }, this);
        this.okButton.setPosition(-170 + 170/2, 70);

        this.ngButton = new cc.MenuItemImage(res.Build_Ng_Button, res.Build_Ng_Button, function() {
            this.setVisible(false);
        }, this);
        this.ngButton.setPosition(0+ 170/2 , 70);

        this.messageLabel = cc.LabelTTF.create("", "Arial", 28);
        this.messageLabel.setFontFillColor(new cc.Color(0, 0, 0, 255));
        this.messageLabel.enableStroke(new cc.Color(192, 192, 192, 255), 1, false);
        this.messageLabel.setAnchorPoint(0.5,0.5);
        this.base.addChild(this.messageLabel);
        this.messageLabel.setPosition(280,200);

        var menu021 = new cc.Menu(this.okButton,this.ngButton);
        menu021.setPosition(0, 0);
        this.addChild(menu021);
    },

    update : function () 
    {
        if(this.game.mapManager.amount <= 20)
        {
            this.messageLabel.setString("この場所を更地にしますか？\n(硬貨20枚消費します)");
            this.okButton.setVisible(true);
        }else{
            this.messageLabel.setString("この場所を更地にしますか？\n(硬貨20枚消費します)");
            this.okButton.setVisible(true);
        }
    }, 
});

