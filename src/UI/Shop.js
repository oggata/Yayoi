//
//  Shop.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//

var Shop = cc.Node.extend({
    ctor: function(calledLayer) {
        this._super();

        this.items = [];

        this.selectedItemId = null;

        this.pos_f = ["f_i001_lv1_a90", "f_i002_lv1_a90", "f_i003_lv1_a90", "f_i004_lv1_a90", "f_i005_lv1_a90", null, null, null, null];
        this.pos_h = ["h_i001_lv1_a90", "h_i002_lv1_a90", "h_i003_lv1_a90", null, null, null, null, null, null];
        this.pos_s = ["s_i001_lv1_a90", "s_i002_lv1_a90", "s_i003_lv1_a90", null, null, null, null, null, null];

        this.settingLayer = cc.LayerColor.create(new cc.Color(0, 0, 0, 255 * 0.8), 640, 1500);
        this.settingLayer.setPosition(-320, -1136 / 2);
        this.settingLayer.setAnchorPoint(0.5, 0.5);
        this.addChild(this.settingLayer);

        this.settingWindow = cc.Sprite.create(res.Setting_Window_png);
        this.addChild(this.settingWindow);

        var menu001Button = new cc.MenuItemImage(res.Setting_Menu_Button_001_png, res.Setting_Menu_Button_001_png, function() {
            this.refresh_items(this.pos_f, calledLayer);
        }, this);
        menu001Button.setAnchorPoint(0, 0);
        menu001Button.setPosition(10, 550);

        var menu002Button = new cc.MenuItemImage(res.Setting_Menu_Button_002_png, res.Setting_Menu_Button_002_png, function() {
            this.refresh_items(this.pos_h, calledLayer);
        }, this);
        menu002Button.setAnchorPoint(0, 0);
        menu002Button.setPosition(10 + 167 + 10, 550);

        var menu003Button = new cc.MenuItemImage(res.Setting_Menu_Button_003_png, res.Setting_Menu_Button_003_png, function() {
            this.refresh_items(this.pos_s, calledLayer);
        }, this);
        menu003Button.setAnchorPoint(0, 0);
        menu003Button.setPosition(10 + 167 + 10 + 167 + 10, 550);

        this.menuButton = new cc.Menu(
            menu001Button, menu002Button, menu003Button
        );
        this.menuButton.setPosition(0, 0);
        this.settingWindow.addChild(this.menuButton, 99999);

        this.refresh_items(this.pos_f, calledLayer);


        this.selectedTarget = cc.Sprite.create(res.Item_Select_png);
        this.settingWindow.addChild(this.selectedTarget, 999999999999);
        this.selectedTarget.setPosition(-500, -500);

        this.noMoneyTarget = cc.Sprite.create(res.Item_No_Money_png);
        this.settingWindow.addChild(this.noMoneyTarget, 999999999999);
        this.noMoneyTarget.setPosition(-500, -500);

        this.noLevelTarget = cc.Sprite.create(res.Item_No_Money_png);
        this.settingWindow.addChild(this.noLevelTarget, 999999999999);
        this.noLevelTarget.setPosition(-500, -500);
    },

    setLabels: function(game, itemData) {
        game.buildingInfo.positionNameLabel.setString(itemData["name"]);
        game.buildingInfo.positionAmountLabel.setString(itemData["amount"]);
        game.buildingInfo.positionDetailLabel.setString(
            itemData["description"] + " 運用コスト" + itemData["cost"]
        );
    },

    setSlectedItemByAmount: function(game, itemData, itemSprite) {
        //if(game.mapManager.amount >= 1)
        if (game.mapManager.amount >= itemData["amount"]) {
            if (this.selectedItemId == itemData["id"]) {
                game.targetItem.setTexture(itemData["map_chip"]);
                this.setVisible(false);
                game.hasItemData = itemData;
                return;
            }
            this.selectedTarget.setVisible(true);
            this.noMoneyTarget.setVisible(false);
            this.noLevelTarget.setVisible(false);
            this.selectedItemId = itemData["id"];
            game.hasItemData = null;
        } else {
            this.selectedTarget.setVisible(false);
            this.noMoneyTarget.setVisible(true);
            this.noLevelTarget.setVisible(false);
            this.selectedItemId = itemData["id"];
            game.hasItemData = null;
        }

        this.selectedTarget.setPosition(
            itemSprite.getPosition().x + 110,
            itemSprite.getPosition().y + 110
        );
        this.noMoneyTarget.setPosition(
            itemSprite.getPosition().x + 110,
            itemSprite.getPosition().y + 110
        );
        this.noLevelTarget.setPosition(
            itemSprite.getPosition().x + 110,
            itemSprite.getPosition().y + 110
        );
    },

    refresh_items: function(itemPrams, calledLayer) {
        //cc.log(this.items.length);
        if (this.settingWindow.length > 1) {
            for (var j = 0; j < 9; j++) {
                this.settingWindow.removeChild(this.items[j]);
                this.items.splice(j, 1);
            }
        }

        var itemData001 = calledLayer.getItemFromLibrary(itemPrams[0]);
        var item001 = new cc.MenuItemImage(res.Item_Null_Button_png, res.Item_Null_Button_png, function() {}, this);
        if (itemPrams[0] != null) {
            if (itemData001["lv"] > calledLayer.mapManager.mapLevel) {
                item001 = new cc.MenuItemImage(res.Item_None_Button_png, res.Item_None_Button_png, function() {}, this);
            } else {
                item001 = new cc.MenuItemImage(itemData001["item"], itemData001["item"], function() {
                    this.setLabels(calledLayer, itemData001);
                    this.setSlectedItemByAmount(calledLayer, itemData001, item001);
                }, this);
            }
        }
        item001.setPosition(160 * 0, 160 * 2);
        this.items.push(item001);

        var itemData002 = calledLayer.getItemFromLibrary(itemPrams[1]);
        var item002 = new cc.MenuItemImage(res.Item_Null_Button_png, res.Item_Null_Button_png, function() {}, this);
        if (itemPrams[1] != null) {
            if (itemData002["lv"] > calledLayer.mapManager.mapLevel) {
                item002 = new cc.MenuItemImage(res.Item_None_Button_png, res.Item_None_Button_png, function() {}, this);
            } else {
                item002 = new cc.MenuItemImage(itemData002["item"], itemData002["item"], function() {
                    this.setLabels(calledLayer, itemData002);
                    this.setSlectedItemByAmount(calledLayer, itemData002, item002);
                }, this);
            }
        }
        item002.setPosition(160 * 1, 160 * 2);
        this.items.push(item002);

        var itemData003 = calledLayer.getItemFromLibrary(itemPrams[2]);
        var item003 = new cc.MenuItemImage(res.Item_Null_Button_png, res.Item_Null_Button_png, function() {}, this);
        if (itemPrams[2] != null) {
            if (itemData003["lv"] > calledLayer.mapManager.mapLevel) {
                item003 = new cc.MenuItemImage(res.Item_None_Button_png, res.Item_None_Button_png, function() {}, this);
            } else {
                item003 = new cc.MenuItemImage(itemData003["item"], itemData003["item"], function() {
                    this.setLabels(calledLayer, itemData003);
                    this.setSlectedItemByAmount(calledLayer, itemData003, item003);
                }, this);
            }
        }
        item003.setPosition(160 * 2, 160 * 2);
        this.items.push(item003);

        var itemData004 = calledLayer.getItemFromLibrary(itemPrams[3]);
        var item004 = new cc.MenuItemImage(res.Item_Null_Button_png, res.Item_Null_Button_png, function() {}, this);
        if (itemPrams[3] != null) {
            if (itemData004["lv"] > calledLayer.mapManager.mapLevel) {
                item004 = new cc.MenuItemImage(res.Item_None_Button_png, res.Item_None_Button_png, function() {}, this);
            } else {
                item004 = new cc.MenuItemImage(itemData004["item"], itemData004["item"], function() {
                    this.setLabels(calledLayer, itemData004);
                    this.setSlectedItemByAmount(calledLayer, itemData004, item004);
                }, this);
            }
        }
        item004.setPosition(160 * 0, 160 * 1);
        this.items.push(item004);

        var itemData005 = calledLayer.getItemFromLibrary(itemPrams[4]);
        var item005 = new cc.MenuItemImage(res.Item_Null_Button_png, res.Item_Null_Button_png, function() {

        }, this);
        if (itemPrams[4] != null) {
            item005 = new cc.MenuItemImage(itemData005["item"], itemData005["item"], function() {
                this.setLabels(calledLayer, itemData005);
                this.setSlectedItemByAmount(calledLayer, itemData005, item005);
            }, this);
        }
        item005.setPosition(160 * 1, 160 * 1);
        this.items.push(item005);

        var itemData006 = calledLayer.getItemFromLibrary(itemPrams[5]);
        var item006 = new cc.MenuItemImage(res.Item_Null_Button_png, res.Item_Null_Button_png, function() {

        }, this);
        if (itemPrams[5] != null) {
            item006 = new cc.MenuItemImage(itemData006["item"], itemData006["item"], function() {
                this.setLabels(calledLayer, itemData006);
                this.setSlectedItemByAmount(calledLayer, itemData006, item006);
            }, this);
        }
        item006.setPosition(160 * 2, 160 * 1);
        this.items.push(item006);

        var itemData007 = calledLayer.getItemFromLibrary(itemPrams[6]);
        var item007 = new cc.MenuItemImage(res.Item_Null_Button_png, res.Item_Null_Button_png, function() {

        }, this);
        if (itemPrams[6] != null) {
            item007 = new cc.MenuItemImage(itemData007["item"], itemData007["item"], function() {
                this.setLabels(calledLayer, itemData007);
                this.setSlectedItemByAmount(calledLayer, itemData007, item007);
            }, this);
        }
        item007.setPosition(160 * 0, 160 * 0);
        this.items.push(item007);

        var itemData008 = calledLayer.getItemFromLibrary(itemPrams[7]);
        var item008 = new cc.MenuItemImage(res.Item_Null_Button_png, res.Item_Null_Button_png, function() {

        }, this);
        if (itemPrams[7] != null) {
            item008 = new cc.MenuItemImage(itemData008["item"], itemData008["item"], function() {
                this.setLabels(calledLayer, itemData008);
                this.setSlectedItemByAmount(calledLayer, itemData008, item008);
            }, this);
        }
        item008.setPosition(160 * 1, 160 * 0);
        this.items.push(item008);

        var itemData009 = calledLayer.getItemFromLibrary(itemPrams[8]);
        var item009 = new cc.MenuItemImage(res.Item_Null_Button_png, res.Item_Null_Button_png, function() {

        }, this);
        if (itemPrams[8] != null) {
            item009 = new cc.MenuItemImage(itemData009["item"], itemData009["item"], function() {
                this.setLabels(calledLayer, itemData009);
                this.setSlectedItemByAmount(calledLayer, itemData009, item009);
            }, this);
        }
        item009.setPosition(160 * 2, 160 * 0);
        this.items.push(item009);

        var menu = new cc.Menu(item001, item002, item003, item004, item005, item006, item007, item008, item009);
        menu.setAnchorPoint(0, 0);
        menu.setPosition(110, 110);
        this.settingWindow.addChild(menu, 1);
    },

    update: function() {

    },
});