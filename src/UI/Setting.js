//
//  Setting.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//

var Setting = cc.Node.extend({
    ctor: function(calledLayer) {
        this._super();

        this.calledLayer = calledLayer;

        this.settingLayer = cc.LayerColor.create(new cc.Color(0, 0, 0, 255 * 0.8), 640, 1136);
        this.settingLayer.setPosition(-320, -1136 / 2);
        this.addChild(this.settingLayer);

        this.settingWindow = cc.Sprite.create(res.Window_Setting_Menu_png);
        this.addChild(this.settingWindow);

        //<-----------------リセット用の画面ここから
        this.resetLayer = cc.LayerColor.create(new cc.Color(0, 0, 0, 255 * 0.8), 640, 1500);
        this.resetLayer.setPosition(-320, -1136 / 2);
        this.addChild(this.resetLayer, 999999);
        this.resetLayer.setVisible(false);

        this.boardSprite = cc.Sprite.create(res.Himiko_Message_png);
        this.resetLayer.addChild(this.boardSprite);
        this.boardSprite.setPosition(320, 600);

        this.messageLabel = cc.LabelTTF.create("データをリセットしますか?\n削除されたデータは復活できません.", "Arial", 20);
        this.messageLabel.setFontFillColor(new cc.Color(0, 0, 0, 255));
        this.messageLabel.enableStroke(new cc.Color(192, 192, 192, 255), 1, false);
        this.messageLabel.setAnchorPoint(0, 1);
        this.messageLabel.textAlign = cc.TEXT_ALIGNMENT_LEFT;
        this.boardSprite.addChild(this.messageLabel);
        this.messageLabel.setPosition(150, 220);

        var resetOkButton = new cc.MenuItemImage(res.Button_Ok_png, res.Button_Ok_On_png, function() {
            if (this.resetLayer.isVisible()) {
                cc.sys.localStorage.clear();
                var storage = new Storage();
                var _getData = storage.getDataFromStorage();
                cc.sys.localStorage.setItem("gameStorage", _getData);
                this.setVisible(false);
                calledLayer.goToFarmLayer();
            }

        }, this);
        resetOkButton.setAnchorPoint(0.5, 0.5);
        resetOkButton.setPosition(200, 100);

        var resetCancelButton = new cc.MenuItemImage(res.Button_Ng_png, res.Button_Ng_On_png, function() {
            if (this.resetLayer.isVisible()) {
                this.resetLayer.setVisible(false);
            }

        }, this);
        resetCancelButton.setAnchorPoint(0.5, 0.5);
        resetCancelButton.setPosition(350, 100);
        this.resetMenu = new cc.Menu(
            resetOkButton, resetCancelButton
        );
        this.resetMenu.setPosition(0, 0);
        this.boardSprite.addChild(this.resetMenu);
        //<-----------------リセット用の画面ここまで

        //<-----------------クレジット用の画面ここから

        this.creditLayer = cc.LayerColor.create(new cc.Color(0, 0, 0, 255 * 0.8), 640, 1500);
        this.creditLayer.setPosition(-320, -1136 / 2);
        this.addChild(this.creditLayer, 999999);
        this.creditLayer.setVisible(false);

        this.creditSprite = cc.Sprite.create(res.Credit_png);
        this.creditLayer.addChild(this.creditSprite);
        this.creditSprite.setPosition(320, 600);

        var closeButton = new cc.MenuItemImage(res.Button_Close_png, res.Button_Close_png, function() {
            if (this.creditLayer.isVisible()) {
                this.creditLayer.setVisible(false);
            }

        }, this);
        closeButton.setAnchorPoint(0.5, 0.5);
        closeButton.setPosition(320, -80);
        var resetMenu2 = new cc.Menu(
            closeButton
        );
        resetMenu2.setPosition(0, 0);
        this.creditSprite.addChild(resetMenu2);

        //<-----------------クレジット用の画面ここまで

        var resetButton = new cc.MenuItemImage(res.Button_Data_Reset_png, res.Button_Data_Reset_png, function() {
            this.resetLayer.setVisible(true);
        }, this);
        resetButton.setPosition(280, 100);

        var creditButton = new cc.MenuItemImage(res.Button_Credit_png, res.Button_Credit_png, function() {
            this.creditLayer.setVisible(true);
        }, this);
        creditButton.setPosition(280, 250);

        this.menuButton = new cc.Menu(
            resetButton, creditButton
        );
        this.menuButton.setPosition(0, 0);
        this.settingWindow.addChild(this.menuButton);

        var bgmOnButton = new cc.MenuItemImage(res.Button_Sound_On_png, res.Button_Sound_On_png, function() {
            this.setBGMVolume();
        }, this);
        bgmOnButton.setAnchorPoint(0.5, 0.5);
        bgmOnButton.setPosition(350, 500);
        this.menuBgmButtonOn = new cc.Menu(
            bgmOnButton
        );
        this.menuBgmButtonOn.setPosition(0, 0);
        this.settingWindow.addChild(this.menuBgmButtonOn, 99999);

        var seOnButton = new cc.MenuItemImage(res.Button_Sound_On_png, res.Button_Sound_On_png, function() {
            this.setSEVolume();
        }, this);
        seOnButton.setAnchorPoint(0.5, 0.5);
        seOnButton.setPosition(350, 430);
        this.menuSeButtonOn = new cc.Menu(
            seOnButton
        );
        this.menuSeButtonOn.setPosition(0, 0);
        this.settingWindow.addChild(this.menuSeButtonOn, 99999);

        var bgmOffButton = new cc.MenuItemImage(res.Button_Sound_Off_png, res.Button_Sound_Off_png, function() {
            this.setBGMVolume();
        }, this);
        bgmOffButton.setAnchorPoint(0.5, 0.5);
        bgmOffButton.setPosition(350, 500);
        this.menuBgmButtonOff = new cc.Menu(
            bgmOffButton
        );
        this.menuBgmButtonOff.setPosition(0, 0);
        this.settingWindow.addChild(this.menuBgmButtonOff, 99999);

        var seOffButton = new cc.MenuItemImage(res.Button_Sound_Off_png, res.Button_Sound_Off_png, function() {
            this.setSEVolume();
        }, this);
        seOffButton.setAnchorPoint(0.5, 0.5);
        seOffButton.setPosition(350, 430);
        this.menuSeButtonOff = new cc.Menu(
            seOffButton
        );
        this.menuSeButtonOff.setPosition(0, 0);
        this.settingWindow.addChild(this.menuSeButtonOff, 99999);
    },

    update: function() {

        if (this.calledLayer.storage.bgmVolume == 0) {
            this.menuBgmButtonOn.setVisible(false);
            this.menuBgmButtonOff.setVisible(true);
        } else {
            this.menuBgmButtonOn.setVisible(true);
            this.menuBgmButtonOff.setVisible(false);
        }

        if (this.calledLayer.storage.seVolume == 0) {
            this.menuSeButtonOn.setVisible(false);
            this.menuSeButtonOff.setVisible(true);
        } else {
            this.menuSeButtonOn.setVisible(true);
            this.menuSeButtonOff.setVisible(false);
        }
    },

    setBGMVolume: function() {
        if (this.calledLayer.storage.bgmVolume == 0) {
            this.calledLayer.storage.bgmVolume = 10;
            playBGM(this.calledLayer.storage);
        } else {
            this.calledLayer.storage.bgmVolume = 0;
            stopBGM(this.calledLayer.storage);
        }
        this.calledLayer.storage.saveCurrentData();
        this.update();
    },

    setSEVolume: function() {
        if (this.calledLayer.storage.seVolume == 0) {
            this.calledLayer.storage.seVolume = 10;
            playSE_Button(this.calledLayer.storage);
        } else {
            this.calledLayer.storage.seVolume = 0;
        }
        this.calledLayer.storage.saveCurrentData();
        this.update();
    },

    setTutorial: function() {
        this.tutorial.pageVisible();
    }
});