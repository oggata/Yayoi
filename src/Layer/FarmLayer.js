//
//  FarmLayer.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//

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
        this.enemies = [];
        this.humans = [];
        this.effects = [];
        this.warriorCount = 0;

        this.header = new Header(this);
        this.header.setPosition(320, this.viewSize.height - 80);
        this.header.setAnchorPoint(0.5, 0);
        this.addChild(this.header, 9999999);

        this.mapManager = new MapManager(this);
        this.mapManager.renderWorld();

        //経過時間の少数だけを取る
        var _pastTimeRate = this.mapManager.pastCycle - Math.floor(this.mapManager.pastCycle);
        if (this.mapManager.pastCycle >= 1) {
            this.mapManager.calcPastTime1(this.mapManager.pastCycle, "background");
        } else {
            this.mapManager.calcPastTime2();
        }

        this.cycleTimeRate = _pastTimeRate;
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

        this.lastTouchGameLayerX = this.baseNode.getPosition().x;
        this.lastTouchGameLayerY = this.baseNode.getPosition().y;

        this.setInitializeUI();
        this.updateCnt = 0;

        if (this.storage.tutorialNum >= 5 || this.mapManager.population >= 15) {
            this.mapManager.renderItems(0, 0, 0, 3);
        }
        this.scheduleUpdate();
        return true;
    },

    setInitializeUI: function() {
        this.ActionWindow = new Action(this);
        this.addChild(this.ActionWindow);
        this.ActionWindow.setPosition(100, 200);
        this.ActionWindow.setVisible(false);

        this.lvManage = new LevelManage();
        this.addChild(this.lvManage);
        this.lvManage.setVisible(false);

        this.resetWindow = new RemoveBuilding(this);
        this.addChild(this.resetWindow);
        this.resetWindow.setPosition(320, 150);

        this.setBuilding = new SetBuilding(this);
        this.addChild(this.setBuilding);
        this.setBuilding.setPosition(320, 150);

        this.infoBuilding = new InfoBuilding();
        this.addChild(this.infoBuilding);
        this.infoBuilding.setVisible(false);

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

        this.introduction = new Introduction(this);
        this.addChild(this.introduction);
        this.introduction.setVisible(false);

        this.tutorial = new Tutorial();
        this.addChild(this.tutorial);
        this.tutorial.setVisible(false);
        this.tutorial.setPosition(320, this.viewSize.height / 2);

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

        this.footer = new Footer(this);
        this.addChild(this.footer);
    },

    getItemFromLibrary: function(itemId) {
        for (var i = 0; i < this.storage.itemLibraries.length; i++) {
            if (this.storage.itemLibraries[i]["id"] == itemId) {
                return this.storage.itemLibraries[i];
            }
        }
        return this.storage.itemLibraries[1];
    },

    moveTouchedMarker: function(touchX, touchY) {
        for (var i = 0; i < this.mapChips.length; i++) {
            if ((this.mapChips[i].getPosition().x - 216 / 3) * this.windowScale < touchX && touchX < (this.mapChips[i].getPosition().x + 216 / 3) * this.windowScale && (this.mapChips[i].getPosition().y - 108 / 3) * this.windowScale < touchY && touchY < (this.mapChips[i].getPosition().y + 200 / 3) * this.windowScale) {
                var _x = this.mapChips[i].getPosition().x;
                var _y = this.mapChips[i].getPosition().y;

                //ターゲットを移動させる
                this.targetOkSprite.setPosition(_x, _y);
                this.targetNgSprite.setPosition(_x, _y);
                this.targetItem.setPosition(_x, _y);
            }
        }
    },

    getTouchedEnemy: function(touchX, touchY) {
        for (var i = 0; i < this.mapChips.length; i++) {
            if (!this.mapChips[i]) return;
            if ((this.mapChips[i].getPosition().x - 216 / 3) * this.windowScale < touchX && touchX < (this.mapChips[i].getPosition().x + 216 / 3) * this.windowScale && (this.mapChips[i].getPosition().y - 108 / 3) * this.windowScale < touchY && touchY < (this.mapChips[i].getPosition().y + 200 / 3) * this.windowScale) {
                var _chkMapId = this.mapChips[i].mapId;
                for (var n = 0; n < this.enemies.length; n++) {
                    if (_chkMapId == this.enemies[n].mapId) {
                        return this.enemies[n];
                    }
                }
            }
        }
        return null;
    },

    getTouchedBuilding: function(touchX, touchY) {
        for (var i = 0; i < this.mapChips.length; i++) {
            if (!this.mapChips[i]) return;
            if ((this.mapChips[i].getPosition().x - 216 / 3) * this.windowScale < touchX && touchX < (this.mapChips[i].getPosition().x + 216 / 3) * this.windowScale && (this.mapChips[i].getPosition().y - 108 / 3) * this.windowScale < touchY && touchY < (this.mapChips[i].getPosition().y + 200 / 3) * this.windowScale) {
                var _chkMapId = this.mapChips[i].mapId;
                if (this.mapChips[i].itemData) {
                    return this.mapChips[i].itemData;
                }
            }
        }
        return null;
    },

    getTouchedMapChip: function(touchX, touchY) {
        for (var i = 0; i < this.mapChips.length; i++) {
            if (!this.mapChips[i]) return;
            if ((this.mapChips[i].getPosition().x - 216 / 3) * this.windowScale < touchX && touchX < (this.mapChips[i].getPosition().x + 216 / 3) * this.windowScale && (this.mapChips[i].getPosition().y - 108 / 3) * this.windowScale < touchY && touchY < (this.mapChips[i].getPosition().y + 200 / 3) * this.windowScale) {
                var _chkMapId = this.mapChips[i].mapId;
                if (this.mapChips[i]) {
                    return this.mapChips[i];
                }
            }
        }
        return null;
    },
    /*
        getTouchedWorld: function(touchX,touchY)
        {
            for (var i = 0; i < this.mapChips.length; i++) {
                if (!this.mapChips[i]) return;
                if ((this.mapChips[i].getPosition().x - 216 / 3) * this.windowScale < touchX && touchX < (this.mapChips[i].getPosition().x + 216 / 3) * this.windowScale && (this.mapChips[i].getPosition().y - 108 / 3) * this.windowScale < touchY && touchY < (this.mapChips[i].getPosition().y + 200 / 3) * this.windowScale) {
                    var _chkMapId = this.mapChips[i].mapId;
                    if(this.mapChips[i]){
                        return this.mapChips[i];
                    }
                }
            }
            return null;
        },
    */
    setBuildingToTouchedPosition: function(mapChip) {
        this.targetItem.setOpacity(0.5 * 255);
        //<--------1個前のmapIDと押下したmapIDが同じだったら設置する-------->
        if (this.pushedMapId == mapChip.mapId) {
            //this.mapManager.setPositionByMapChip(mapChip.mapId);
            this.setBuilding.mapChip = mapChip;
            this.setBuilding.itemData = this.hasItemData;
            this.setBuilding.setVisible(true);
            this.shop.selectedItemId = null;
        }
        //記録
        this.pushedMapId = mapChip.mapId;
        return;
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

        this.ActionWindow.setVisible(false);
        this.moveTouchedMarker(touchX, touchY);
        this.ActionWindow.targetMapChip = null;
        this.ActionWindow.targetEnemy = null;
        this.ActionWindow.targetBuilding = null;
        var mapChip = this.getTouchedMapChip(touchX, touchY);
        if (mapChip != null) {
            this.ActionWindow.type = "destroy";
            this.ActionWindow.targetMapChip = mapChip;
        }

        var enemy = this.getTouchedEnemy(touchX, touchY);
        if (enemy != null) {
            this.ActionWindow.setVisible(true);
            this.ActionWindow.type = "attack";
            this.ActionWindow.targetEnemy = enemy;
            this.infoBuilding.setInfo(enemy.name, enemy.description);
        }

        var building = this.getTouchedBuilding(touchX, touchY);
        if (building != null) {
            this.ActionWindow.setVisible(true);
            this.ActionWindow.targetBuilding = building;

            this.infoBuilding.setInfo(building.name, building.description);

            if (building["house"] > 0) {
                this.ActionWindow.type = "add_population";
            } else {
                this.ActionWindow.type = "destroy";
            }
        }

        if (this.hasItemData != null) {
            //設置可能な場所かどうか確認する
            var mapChip = this.getTouchedMapChip(touchX, touchY);
            if (mapChip != null) {
                if (mapChip.confNum) {
                    if (mapChip.confNum == 3) {
                        this.setBuildingToTouchedPosition(mapChip);
                    } else {
                        this.targetItem.setOpacity(0.5 * 255);
                    }
                }
            }
            this.ActionWindow.setVisible(false);
            this.infoBuilding.setVisible(false);
        }

        if (this.hasItemData != null || this.shop.selectedItemId != null || building != null || enemy != null) {
            this.infoBuilding.setVisible(true);
        } else {
            this.infoBuilding.setVisible(false);
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
        this.ActionWindow.setVisible(false);
        this.infoBuilding.setVisible(false);
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

    uiUpdate: function() {

        this.mapManager.update();

        this.setting.update();

        this.setBuilding.update();

        this.resetWindow.update();

        this.footer.update();

        this.ActionWindow.update();
    },

    update: function(dt) {
        if (this.isReadyToRenderMap == true) {
            this.isReadyToRenderMap = false;
            this.mapManager.renderWorld();
        }

        this.introduction.update();
        if (this.introduction.isVisible()) return;

        this.uiUpdate();

        this.cycleTime += 1;
        this.cycleTimeByTerm += 1;

        this.cycleTimeRate = (this.cycleTime / (30 * CONFIG.CYCLE_SECOND));
        //サイクルを5で割った数だけ、影響を与える
        if (this.cycleTimeByTerm >= 30 * (CONFIG.CYCLE_SECOND / 5)) {
            this.cycleTimeByTerm = 0;
            if (this.mapManager.waitPopulation >= 1) {
                this.mapManager.waitPopulation -= 1;
                this.mapManager.population += 1;
                this.mapManager.increasePopulationCount += 1;
                var _housePosArray = this.mapManager.housePositions;
                var shuffle = function() {
                    return Math.random() - .5
                };
                _housePosArray.sort(shuffle)
                this.addEffectByMapChip(_housePosArray[0].mapId, "hart");
            }
            this.mapManager.saveData();
        }

        //サイクル毎(1月)に結果を算出する
        if (this.cycleTime >= 30 * CONFIG.CYCLE_SECOND) {
            this.cycleTime = 0;
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
        if (this.mapManager.population <= 3) {
            _visiblePopulation = this.mapManager.population
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
            } else {
                this.baseNode.reorderChild(
                    this.humans[i],
                    Math.floor(999999 - this.humans[i].getPosition().y + 108)
                );
            }
        }

        for (var i = 0; i < this.effects.length; i++) {
            if (this.effects[i].update() == false) {
                this.baseNode.removeChild(this.effects[i]);
                this.effects.splice(i, 1);
            } else {
                this.baseNode.reorderChild(
                    this.effects[i],
                    Math.floor(999999 - this.effects[i].getPosition().y + 108)
                );
            }
        }

        for (var i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].update() == false) {
                this.mapManager.killedEnemyCount += 1;
                this.mapManager.amount += this.enemies[i].reward;
                this.addEffectByMapChip(this.enemies[i].mapId, "money");
                this.baseNode.removeChild(this.enemies[i]);
                this.enemies.splice(i, 1);
            } else {
                this.baseNode.reorderChild(
                    this.enemies[i],
                    Math.floor(999999 - this.enemies[i].getPosition().y + 108)
                );
            }
        }

        for (var i = 0; i < this.items.length; i++) {
            this.baseNode.reorderChild(
                this.items[i],
                Math.floor(9999999 - this.items[i].getPosition().y)
            );
        }

        //人 x 敵
        this.warriorCount = 0;
        for (var m = 0; m < this.humans.length; m++) {
            if (this.humans[m].type == 2) {
                this.warriorCount += 1;
            }
            for (var n = 0; n < this.enemies.length; n++) {
                var dX = this.humans[m].getPosition().x - this.enemies[n].getPosition().x;
                var dY = this.humans[m].getPosition().y - this.enemies[n].getPosition().y;
                var dist = Math.sqrt(dX * dX + dY * dY);
                if (dist <= 50) {
                    this.humans[m].stopCount = 1;
                    if (this.humans[m].type == 1) {
                        this.humans[m].setEmotion("got_ill");
                        if (this.humans[m].deadCnt == 0) {
                            this.humans[m].deadCnt = 1;
                            this.mapManager.setPositionByMapChip(this.humans[m].targetMarker.mapId);
                            this.mapManager.killedPopulationCount += 1;
                        }
                    } else {
                        this.humans[m].stopCount = 1;
                        this.enemies[n].hp -= 1;
                    }
                }
            }
        }

        this.updateCnt++;
        if (this.updateCnt >= 10) {
            this.updateCnt = 0;

            //人 x 人
            for (var m = 0; m < this.humans.length; m++) {
                for (var n = 0; n < this.humans.length; n++) {
                    if (this.humans[m] != this.humans[n]) {
                        var dX = this.humans[m].getPosition().x - this.humans[n].getPosition().x;
                        var dY = this.humans[m].getPosition().y - this.humans[n].getPosition().y;
                        var dist = Math.sqrt(dX * dX + dY * dY);
                        if (dist <= 12) {
                            this.humans[m].setPosition(this.humans[m].getPosition().x + dX / 5, this.humans[m].getPosition().y + dY / 5);
                            this.humans[n].setPosition(this.humans[n].getPosition().x - dX / 5, this.humans[n].getPosition().y - dY / 5);
                        }
                    }
                }
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

            //人 x 食料
            for (var m = 0; m < this.humans.length; m++) {
                for (var n = 0; n < this.mapChips.length; n++) {
                    var dX = this.humans[m].getPosition().x - this.mapChips[n].getPosition().x;
                    var dY = this.humans[m].getPosition().y - (this.mapChips[n].getPosition().y + 70);
                    var dist = Math.sqrt(dX * dX + dY * dY);
                    if (dist <= 30 && this.humans[m].type == 1) {
                        if (this.mapChips[n].itemData) {
                            if (this.mapChips[n].itemData["food"] > 0 && this.mapChips[n].isFoodAvailable == true) {
                                this.humans[m].stopCount = 1;
                                this.mapChips[n].foodCount += 1;
                                if (this.mapChips[n].foodCount >= 100 / 10) {
                                    this.mapManager.food += this.mapChips[n].itemData["food"];
                                    this.mapChips[n].isFoodAvailable = false;
                                    this.mapManager.gotFoodCount += 1;
                                }
                            }
                        }
                    }
                }
            }
        }

        //いまisFoodAvailable=trueのものだけ配列にいれて管理する
        this.mapManager.foodAvailableList = [];
        for (var n = 0; n < this.mapChips.length; n++) {
            if (this.mapChips[n].itemData) {
                if (this.mapChips[n].isFoodAvailable == true && this.mapChips[n].itemData["food"] > 0) {
                    this.mapManager.foodAvailableList.push(this.mapChips[n]);
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
        this.human = new Human(this, 1);
        this.human.retain();
        this.baseNode.addChild(this.human, 999);
        this.human.setPosition(_x, _y);
        this.human.route = this.mapManager.getRouteIds(mapId, 3);
        this.humans.push(this.human);
    },

    addWarriorByMapChip: function(mapId, distonationMapId, time) {
        if (!this.mapChips[mapId - 1]) return;
        var pos = this.mapChips[mapId - 1];
        var _x = pos["x"];
        var _y = pos["y"] + 108 / 2;
        this.human = new Human(this, 2);
        this.human.retain();
        this.baseNode.addChild(this.human, 999);
        this.human.setPosition(_x, _y);
        this.human.route = this.mapManager.getRouteIdsFromTwoPosition(
            mapId, distonationMapId, 10
        );
        this.human.startMaxTime = time;
        this.humans.push(this.human);
    },

    addItemByMapChip: function(mapId, itemId) {
        if (!this.mapChips[mapId - 1]) return;
        var pos = this.mapChips[mapId - 1];
        if (pos) {
            var _x = pos["x"];
            var _y = pos["y"] + 108 / 2 + 25;
            this.item = new Item(this, itemId);
            this.item.mapId = mapId;
            this.item.retain();
            this.baseNode.addChild(this.item, 99999999);
            this.item.setPosition(_x, _y);
            this.item.itemId = itemId;
            this.items.push(this.item);
        }
    },

    addEnemyByMapChip: function(mapId, enemyId) {
        if (!this.mapChips[mapId - 1]) return;
        var pos = this.mapChips[mapId - 1];
        if (pos) {
            var _x = pos["x"];
            var _y = pos["y"] + 108 / 2 + 25;
            this.enemy = new Enemy(this, enemyId);
            this.enemy.mapId = mapId;
            this.enemy.retain();
            this.baseNode.addChild(this.enemy, 99999999);
            this.enemy.setPosition(_x, _y);
            this.enemies.push(this.enemy);
        }
    },

    addEffectByMapChip: function(mapId, effectId) {
        if (!this.mapChips[mapId - 1]) return;
        var pos = this.mapChips[mapId - 1];
        if (pos) {
            var _x = pos["x"];
            var _y = pos["y"] + 108 / 2 + 25;
            this.effect = new Effect(this, effectId);
            this.effect.mapId = mapId;
            this.effect.retain();
            this.baseNode.addChild(this.effect, 99999999);
            this.effect.setPosition(_x, _y);
            this.effects.push(this.effect);
        }
    },

    isExistsItemKey: function(itemKey) {
        for (var i = 0; i <= this.storage.itemLibraries.length; i++) {
            if (this.storage.itemLibraries[i]["id"] == itemKey) {
                return true;
            }
            return true;
        }
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

String.prototype.format = function() {
    var formatted = this;
    for (var i = 0; i < arguments.length; i++) {
        var regexp = new RegExp('\\{' + i + '\\}', 'gi');
        formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
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