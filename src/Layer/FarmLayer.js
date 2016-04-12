//
//  FarmLayer.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//
/*
        瑞穂の国の伝説」 卑弥呼
*/

var FarmLayer = cc.Layer.extend({
    ctor: function(storage) {
        //////////////////////////////
        // 1. super init first
        this._super();
        this.viewSize = cc.director.getVisibleSize();

        this.pushedMapId = 0;
        this.hasItemData = null;

        //cc.sys.localStorage.clear();
        this.storage = new Storage();
        try {
            var _data = cc.sys.localStorage.getItem("gameStorage");
            if (_data == null) {
                cc.log("dataはnullなので新たに作成します.");
                var _getData = this.storage.getDataFromStorage();
                cc.sys.localStorage.setItem("gameStorage", _getData);
                var _acceptData = cc.sys.localStorage.getItem("gameStorage");
                this.storage.setDataToStorage(JSON.parse(_acceptData));
            }
            if (_data != null) {
                var storageData = JSON.parse(cc.sys.localStorage.getItem("gameStorage"));
                if (storageData["saveData"] == true) {
                    cc.log("保存されたデータがあります");
                    var _acceptData = cc.sys.localStorage.getItem("gameStorage");
                    cc.log(_acceptData);
                    this.storage.setDataToStorage(JSON.parse(_acceptData));
                } else {
                    cc.log("保存されたデータはありません");
                    var _getData = this.storage.getDataFromStorage();
                    cc.sys.localStorage.setItem("gameStorage", _getData);
                    var _acceptData = cc.sys.localStorage.getItem("gameStorage");
                    this.storage.setDataToStorage(JSON.parse(_acceptData));
                }
            }
        } catch (e) {
            cc.log("例外..");
            cc.sys.localStorage.clear();
        }

        playBGM(this.storage);
        this.baseNode = cc.Node.create();
        this.addChild(this.baseNode);

        this.windowScale = 0.8;
        this.baseNode.setScale(this.windowScale, this.windowScale);

        this.firstTouchX = 0;
        this.firstTouchY = 0;
        this.lastTouchGameLayerX = this.baseNode.getPosition().x;
        this.lastTouchGameLayerY = this.baseNode.getPosition().y;

        this.cycleTime = 0;
        this.cycleTimeByTerm = 0;
        this.cycleTimeRate = 0;

        this.mapChips = [];
        this.items = [];
        this.humans = [];

        //header
        this.header = new Header(this);
        this.header.setPosition(320, this.viewSize.height - 80);
        this.header.setAnchorPoint(0.5, 0);
        this.addChild(this.header, 9999999);

        this.mapManager = new MapManager(this);
        //this.isReadyToRenderMap = true;
        this.mapManager.renderWorld();

        //経過時間の少数だけを取る
        var _pastTimeRate = this.mapManager.pastCycle - Math.floor(this.mapManager.pastCycle);

        if (this.mapManager.pastCycle >= 1) {
            this.mapManager.calcPastTime1(this.mapManager.pastCycle, "background");
        } else {
            this.mapManager.calcPastTime2();
        }

        this.cycleTimeRate = _pastTimeRate; //30 * CONFIG.CYCLE_SECOND
        this.cycleTime = 30 * CONFIG.CYCLE_SECOND * _pastTimeRate;

        this.mapManager.setPositionByMapChip(421);

        //GetTouchEvent
        cc.eventManager.addListener(cc.EventListener.create({
            event: cc.EventListener.TOUCH_ALL_AT_ONCE,
            onTouchesBegan: function(touches, event) {
                var location = touches[0].getLocation();
                event.getCurrentTarget().touchStart(touches[0].getLocation());
            },
            onTouchesMoved: function(touches, event) {
                var location = touches[0].getLocation();
                event.getCurrentTarget().touchMove(touches[0].getLocation());
            },
            onTouchesEnded: function(touches, event) {
                event.getCurrentTarget().touchFinish(touches[0].getLocation());
            }
        }), this);

        //カットインを作成
        this.cutIn = new CutIn(this);
        this.addChild(this.cutIn);

        this.shop = new Shop(this);
        this.addChild(this.shop);
        this.shop.setVisible(false);
        this.shop.setPosition(320, this.viewSize.height / 2);

        this.setting = new Setting(this);
        this.addChild(this.setting);
        this.setting.setVisible(false);
        this.setting.setPosition(320, this.viewSize.height / 2);

        this.tutorial = new Tutorial();
        this.addChild(this.tutorial);
        this.tutorial.setVisible(false);
        this.tutorial.setPosition(320, this.viewSize.height / 2);

        this.lvManage = new LevelManage();
        this.addChild(this.lvManage);
        this.lvManage.setVisible(false);

        this.footer = new Footer(this);
        this.addChild(this.footer);

        this.lastTouchGameLayerX = this.baseNode.getPosition().x;
        this.lastTouchGameLayerY = this.baseNode.getPosition().y;

        this.resetWindow = new RemoveBuilding(this);
        this.addChild(this.resetWindow);
        this.resetWindow.setPosition(320, 250);

        this.setBuilding = new SetBuilding(this);
        this.addChild(this.setBuilding);
        this.setBuilding.setPosition(320, 250);

        this.buildingInfo = new InfoBuilding();
        this.addChild(this.buildingInfo);
        this.buildingInfo.setVisible(false);

        this.mapManager.renderItems(1, 0, 0, 1);

        this.targetItem = cc.Sprite.create(res.Map_Target_Ok_png);
        this.targetItem.retain();
        this.targetItem.setAnchorPoint(0.5, 0);
        this.baseNode.addChild(this.targetItem, 9999999);

        this.targetOkSprite = cc.Sprite.create(res.Map_Target_Ok_png);
        this.targetOkSprite.retain();
        this.targetOkSprite.setAnchorPoint(0.5, 0);
        this.baseNode.addChild(this.targetOkSprite, 9999999);

        this.targetNgSprite = cc.Sprite.create(res.Map_Target_Ng_png);
        this.targetNgSprite.retain();
        this.targetNgSprite.setAnchorPoint(0.5, 0);
        this.baseNode.addChild(this.targetNgSprite, 9999999);

        this.mapInfoSprite = cc.Sprite.create(res.Info_png);
        this.baseNode.addChild(this.mapInfoSprite, 9999999);
        this.mapInfoSprite.setOpacity(255 * 0.5);

        this.mapInfo = cc.LabelTTF.create("", "Arial", 24);
        this.mapInfo.setFontFillColor(new cc.Color(0, 0, 0, 255));
        this.mapInfo.setPosition(241 / 2, 50);
        this.mapInfo.setAnchorPoint(0.5, 0);
        this.mapInfoSprite.addChild(this.mapInfo);

        this.introduction = new Introduction(this);
        this.addChild(this.introduction);
        this.introduction.setVisible(false);

        this.scheduleUpdate();
        return true;
    },

    getItemFromLibrary: function(itemId) {
        for (var i = 0; i < this.storage.itemLibraries.length; i++) {
            if (this.storage.itemLibraries[i]["id"] == itemId) {
                return this.storage.itemLibraries[i];
            }
        }
        return this.storage.itemLibraries[1];
    },

    touchStart: function(location) {
        if (
            this.setBuilding.isVisible() == true ||
            this.resetWindow.isVisible() == true ||
            this.shop.isVisible() == true ||
            this.setting.isVisible() == true ||
            this.tutorial.isVisible() == true ||
            this.introduction.isVisible() == true
        ) return;
        playSE_Button(this.storage);

        this.firstTouchX = location.x;
        this.firstTouchY = location.y;
        var touchX = location.x - this.lastTouchGameLayerX;
        var touchY = location.y - this.lastTouchGameLayerY;

        //ターゲットとhitした場合は、actionCodeを実行する
        //actionCode = 1:設置準備  2:設置
        if ((this.targetOkSprite.getPosition().x - 216 / 3) * this.windowScale < touchX && touchX < (this.targetOkSprite.getPosition().x + 216 / 3) * this.windowScale && (this.targetOkSprite.getPosition().y - 108 / 3) * this.windowScale < touchY && touchY < (this.targetOkSprite.getPosition().y + 200 / 3) * this.windowScale) {}
        for (var i = 0; i < this.mapChips.length; i++) {
            if (!this.mapChips[i]) return;

            if ((this.mapChips[i].getPosition().x - 216 / 3) * this.windowScale < touchX && touchX < (this.mapChips[i].getPosition().x + 216 / 3) * this.windowScale && (this.mapChips[i].getPosition().y - 108 / 3) * this.windowScale < touchY && touchY < (this.mapChips[i].getPosition().y + 200 / 3) * this.windowScale) {
                var _x = this.mapChips[i].getPosition().x;
                var _y = this.mapChips[i].getPosition().y;

                //ターゲットを移動させる
                this.targetOkSprite.setPosition(_x, _y);
                this.targetNgSprite.setPosition(_x, _y);
                this.targetItem.setPosition(_x, _y);
                this.mapInfoSprite.setPosition(_x, _y + 200);

                if (this.mapChips[i].itemData != null) {
                    var _txt = this.mapChips[i].itemData["name"];
                    _txt += "\n" + this.mapChips[i].itemData["description"];
                    _txt += "\nコスト：" + this.mapChips[i].itemData["cost"];
                    this.mapInfo.setString(_txt);
                    this.mapInfoSprite.setVisible(true);
                } else {
                    this.mapInfo.setString("");
                    this.mapInfoSprite.setVisible(false);
                }

                if (this.mapManager.conf[this.mapChips[i].confNumber] == 3) {
                    if (this.hasItemData != null) {
                        this.targetOkSprite.setVisible(true);
                        this.targetNgSprite.setVisible(false);
                        this.targetItem.setOpacity(0.5 * 255);
                        //<--------1個前のmapIDと押下したmapIDが同じだったら設置する-------->
                        if (this.pushedMapId == this.mapChips[i].mapId) {
                            this.mapManager.setPositionByMapChip(
                                this.mapChips[i].mapId
                            );
                            this.setBuilding.mapChip = this.mapChips[i];
                            this.setBuilding.itemData = this.hasItemData;
                            this.setBuilding.setVisible(true);
                            this.shop.selectedItemId = null;
                        }
                        //記録
                        this.pushedMapId = this.mapChips[i].mapId;
                        return;
                    } else {
                        this.targetOkSprite.setVisible(true);
                        this.targetNgSprite.setVisible(false);
                        this.targetItem.setOpacity(0 * 255);
                        this.pushedMapId = this.mapChips[i].mapId;
                        return;
                    }
                } else {
                    //<--------設置可能場所以外は警告を表示する-------->
                    if (this.hasItemData != null) {
                        this.targetOkSprite.setVisible(false);
                        this.targetNgSprite.setVisible(true);
                        this.targetItem.setOpacity(0.5 * 255);
                        this.pushedMapId = this.mapChips[i].mapId;
                        this.mapManager.setPositionByMapChip(
                            this.mapChips[i].mapId
                        );
                        return;
                    } else {
                        //itemを保持していない状態で、2回同じ場所を押したらリセットメニューを開く
                        if (this.pushedMapId == this.mapChips[i].mapId) {
                            this.resetWindow.mapChipId = this.mapChips[i].confNumber;
                            this.resetWindow.setVisible(true);
                        }
                        this.targetOkSprite.setVisible(false);
                        this.targetNgSprite.setVisible(true);
                        this.targetItem.setOpacity(0);
                        this.pushedMapId = this.mapChips[i].mapId;
                        return;
                    }
                }
            }
        }
    },

    touchMove: function(location) {
        if (
            this.setBuilding.isVisible() == true ||
            this.resetWindow.isVisible() == true ||
            this.shop.isVisible() == true ||
            this.setting.isVisible() == true ||
            this.tutorial.isVisible() == true ||
            this.introduction.isVisible() == true
        ) return;

        var scrollX = this.firstTouchX - location.x;
        var scrollY = this.firstTouchY - location.y;
        var x = this.lastTouchGameLayerX - scrollX;
        var y = this.lastTouchGameLayerY - scrollY;
        this.baseNode.setPosition(x, y);
    },

    touchFinish: function(location) {
        if (
            this.setBuilding.isVisible() == true ||
            this.resetWindow.isVisible() == true ||
            this.shop.isVisible() == true ||
            this.setting.isVisible() == true ||
            this.tutorial.isVisible() == true ||
            this.introduction.isVisible() == true
        ) return;

        this.lastTouchGameLayerX = this.baseNode.getPosition().x;
        this.lastTouchGameLayerY = this.baseNode.getPosition().y;
    },

    update: function(dt) {

        if (this.isReadyToRenderMap == true) {
            this.isReadyToRenderMap = false;
            this.mapManager.renderWorld();
        }

        this.introduction.update();
        if (this.introduction.isVisible()) return;

        this.mapManager.update();

        this.setting.update();

        this.setBuilding.update();

        this.resetWindow.update();

        if (this.hasItemData != null || this.shop.selectedItemId != null) {
            this.buildingInfo.setVisible(true);
        } else {
            this.buildingInfo.setVisible(false);
        }

        this.cycleTime += 1;
        this.cycleTimeByTerm += 1;

        this.cycleTimeRate = (this.cycleTime / (30 * CONFIG.CYCLE_SECOND));
        //サイクルを30で割った数だけ、影響を与える
        if (this.cycleTimeByTerm >= 30 * (CONFIG.CYCLE_SECOND / 10)) {
            this.cycleTimeByTerm = 0;
            var _spendCosts = this.mapManager.getSpendCosts();
            this.mapManager.food -= floatFormat(_spendCosts["food"] / 30, 2);
            this.mapManager.renderGauge();

            //foodが0以下だったら誰か死ぬ
            if (this.mapManager.food <= 0 && this.population >= 5) {
                var _rand = getRandNumberFromRange(1, this.humans.length);
                this.humans[_rand].deadCnt = 1;
                this.mapManager.setPositionByMapChip(this.humans[_rand].targetMarker.mapId);
            }
        }

        //サイクル毎(1月)に結果を算出する
        if (this.cycleTime >= 30 * CONFIG.CYCLE_SECOND) {
            this.cycleTime = 0;
            this.mapManager.foodDonePositions = [];
            //this.mapManager.renderWorld();
            this.isReadyToRenderMap = true;
            this.mapManager.calcPastTime1(1, "gaming");
        }

        var _visiblePopulation = this.mapManager.population / 3;
        if (_visiblePopulation <= CONFIG.VISIBLE_MIN_PEOPLE_CNT) {
            _visiblePopulation = CONFIG.VISIBLE_MIN_PEOPLE_CNT;
        }
        if (_visiblePopulation >= CONFIG.VISIBLE_MAX_PEOPLE_CNT) {
            _visiblePopulation = CONFIG.VISIBLE_MAX_PEOPLE_CNT;
        }

        if (this.humans.length < _visiblePopulation) {
            if (this.mapManager.housePositions.length == 0) return;
            var _rand = getRandNumberFromRange(0, this.mapManager.housePositions.length);
            var _housePosition = this.mapManager.housePositions[_rand].mapId;
            this.addHumanByMapChip(_housePosition);
        }

        for (var i = 0; i < this.humans.length; i++) {
            if (this.humans[i].update() == false) {
                if (this.humans[i].isDead() == true) {
                    this.mapManager.population -= 1;
                    this.mapManager.renderGauge();
                }
                this.baseNode.removeChild(this.humans[i]);
                this.humans.splice(i, 1);
            }
        }

        for (var i = 0; i < this.humans.length; i++) {
            this.baseNode.reorderChild(
                this.humans[i],
                Math.floor(999999 - this.humans[i].getPosition().y + 108)
            );
        }

        for (var i = 0; i < this.mapChips.length; i++) {
            if (this.mapChips[i]) {
                this.mapChips[i].update();
                this.baseNode.reorderChild(
                    this.mapChips[i],
                    Math.floor(999999 - this.mapChips[i].getPosition().y)
                );
            }
        }

        for (var i = 0; i < this.items.length; i++) {
            this.baseNode.reorderChild(
                this.items[i],
                Math.floor(9999999 - this.items[i].getPosition().y)
            );
        }

        for (var m = 0; m < this.humans.length; m++) {
            for (var n = 0; n < this.humans.length; n++) {
                if (this.humans[m] != this.humans[n]) {
                    var dX = this.humans[m].getPosition().x - this.humans[n].getPosition().x;
                    var dY = this.humans[m].getPosition().y - this.humans[n].getPosition().y;
                    var dist = Math.sqrt(dX * dX + dY * dY);
                    if (dist <= 3) {
                        this.humans[m].setPosition(this.humans[m].getPosition().x + dX / 5, this.humans[m].getPosition().y + dY / 5);
                        this.humans[n].setPosition(this.humans[n].getPosition().x - dX / 5, this.humans[n].getPosition().y - dY / 5);
                    }
                }
            }
        }

        for (var m = 0; m < this.humans.length; m++) {
            for (var n = 0; n < this.items.length; n++) {
                if (this.humans[m] != this.items[n]) {
                    if (this.humans[m]) {
                        var dX = this.humans[m].getPosition().x - this.items[n].getPosition().x;
                        var dY = this.humans[m].getPosition().y - this.items[n].getPosition().y;
                        var dist = Math.sqrt(dX * dX + dY * dY);
                        if (dist <= 50) {
                            var _itemId = this.items[n].itemId;
                            if (_itemId == "money") {
                                //お金
                                this.mapManager.amount += CONFIG.ITEM_MONEY_AMOUNT;
                                this.humans[m].setEmotion("got_money");
                                this.baseNode.removeChild(this.items[n]);
                                this.items.splice(n, 1);
                            } else if (_itemId == "food") {
                                //食べ物
                                this.mapManager.food += CONFIG.ITEM_FOOD_AMOUNT;
                                this.humans[m].setEmotion("got_food2");
                                this.baseNode.removeChild(this.items[n]);
                                this.items.splice(n, 1);
                            } else if (_itemId == "doki") {
                                //土器
                                this.mapManager.doki += CONFIG.ITEM_DOKI_AMOUNT;
                                this.humans[m].setEmotion("got_doki");
                                this.baseNode.removeChild(this.items[n]);
                                this.items.splice(n, 1);
                            } else if (_itemId == "ill") {
                                //病気
                                this.humans[m].setEmotion("got_ill");
                                this.baseNode.removeChild(this.items[n]);
                                this.items.splice(n, 1);
                                //一定の確率で死ぬ
                                var _rand = getRandNumberFromRange(1, 100);
                                if (1 <= _rand && _rand <= this.mapManager.safeRate * 100) {} else {
                                    this.humans[m].deadCnt = 1;
                                    this.mapManager.setPositionByMapChip(this.humans[m].targetMarker.mapId);
                                }
                            }
                        }
                    }
                }
            }
        }
        this.mapManager.renderGauge();
        this.cutIn.update();
    },

    addHumanByMapChip: function(mapId) {
        if (!this.mapChips[mapId - 1]) return;
        var pos = this.mapChips[mapId - 1];
        var _x = pos["x"];
        var _y = pos["y"] + 108 / 2;
        this.human = new Human(this);
        this.human.retain();
        this.baseNode.addChild(this.human, 999);
        this.human.setPosition(_x, _y);
        this.human.route = this.mapManager.getRouteIds(mapId, 3);
        this.humans.push(this.human);
    },

    addItemByMapChip: function(mapId, itemId) {
        if (!this.mapChips[mapId - 1]) return;
        var pos = this.mapChips[mapId - 1];
        if (pos) {
            var _x = pos["x"];
            var _y = pos["y"] + 108 / 2 + 25;
            this.item = new Item(this, itemId);
            this.item.retain();
            this.baseNode.addChild(this.item, 99999999);
            this.item.setPosition(_x, _y);
            this.item.itemId = itemId;
            this.items.push(this.item);
        }
    },

    getFood: function() {
        return this.mapManager.food;
    },

    //シーンの切り替え----->
    goToFarmLayer: function(pSender) {
        var scene = cc.Scene.create();
        //次のステージへいくためにstorageは必ず受けた渡す
        scene.addChild(FarmLayer.create(this.storage));
        cc.director.runScene(cc.TransitionFade.create(1.5, scene));
    },
});

FarmLayer.create = function(storage) {
    return new FarmLayer(storage);
};
var getRandNumberFromRange = function(min, max) {
    var rand = min + Math.floor(Math.random() * (max - min));
    return rand;
};

var floatFormat = function(number, n) {
    var _pow = Math.pow(10, n);
    return Math.round(number * _pow) / _pow;
};

var FarmLayerScene = cc.Scene.extend({
    onEnter: function(storage) {
        this._super();
        var layer = new FarmLayer(storage);
        this.addChild(layer);
    }
});