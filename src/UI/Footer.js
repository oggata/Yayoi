//
//  Footer.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//

var Footer = cc.Node.extend({
    //Lose->戻る
    ctor: function(game) {
        this._super();
        this.game = game;

        this.footerNode = cc.Node.create();
        this.footerNode.setAnchorPoint(0, 0);
        this.footerNode.setPosition(0, 0);
        this.addChild(this.footerNode);

        var button001 = new cc.MenuItemImage(res.Setting_Button_png, res.Setting_Button_On_png, function() {
            if (this.game.setBuilding.isVisible() == true) return;
            playSE_Button(this.game.storage);
            this.game.hasItemData = null;
            if (this.game.setting.isVisible()) {
                this.game.setting.setVisible(false);
            } else {
                this.game.setting.setVisible(true);
                //tutorial
                this.game.tutorial.setVisible(false);
                //level
                this.game.lvManage.setVisible(false);
                //shop
                this.game.shop.selectedItemId = null;
                this.game.hasItemCode = null;
                this.game.shop.setVisible(false);
            }
        }, this);
        button001.setAnchorPoint(0, 0);
        button001.setPosition(160 * 0, 10);

        var button002 = new cc.MenuItemImage(res.Info_Button_png, res.Info_Button_On_png, function() {
            if (this.game.setBuilding.isVisible() == true) return;
            playSE_Button(this.game.storage);
            this.game.hasItemData = null;
            if (this.game.tutorial.isVisible()) {
                this.game.tutorial.setVisible(false);
            } else {
                this.game.tutorial.setVisible(true);
                //setting
                this.game.setting.setVisible(false);
                //level
                this.game.lvManage.setVisible(false);
                //shop
                this.game.shop.selectedItemId = null;
                this.game.hasItemCode = null;
                this.game.shop.setVisible(false);
            }
        }, this);
        button002.setAnchorPoint(0, 0);
        button002.setPosition(80, 10);

        var button004 = new cc.MenuItemImage(res.Building_Button_png, res.Building_Button_On_png, function() {
            if (this.game.setBuilding.isVisible() == true) return;
            playSE_Button(this.game.storage);
            this.game.shop.selectedItemId = null;
            this.game.hasItemCode = null;
            if (this.game.shop.isVisible()) {
                this.game.shop.setVisible(false);
            } else {
                this.game.shop.setVisible(true);
                //setting
                this.game.setting.setVisible(false);
                //tutorial
                this.game.tutorial.setVisible(false);
                //level
                this.game.lvManage.setVisible(false);
            }
            this.game.hasItemData = null;
        }, this);
        button004.setAnchorPoint(0, 0);
        button004.setPosition(160 * 3, 10);

        var menu001 = new cc.Menu(button001, button002, button004);
        menu001.setPosition(25, 0);
        this.footerNode.addChild(menu001);
    },

    update: function() {

    },
});