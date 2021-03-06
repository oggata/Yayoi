//
//  MapManager.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//

var MapManager = cc.Node.extend({
    ctor: function(game) {
        this._super();
        this.game = game;
        this.storage = this.game.storage;
        this.conf = [];
        this.roadPositions = [];
        this.housePositions = [];
        this.safePositions = [];
        this.enemyPositions = [];
        this.waitPopulation = 0;
        this.buildingCount = 0;
        this.foodAvailableList = [];
        this.food = this.storage.food;
        this.house = 0;
        this.safe = this.storage.safe;
        this.maxFood = 5;
        this.maxHouse = 0;
        this.maxSafe = 0;
        this.foodRate = 0;
        this.houseRate = 0;
        this.safeRate = 0;
        this.maxAmount = CONFIG.MAX_AMOUNT;
        this.happyRate = 0;
        this.population = this.storage.population;
        this.amount = this.storage.amount;
        this.pastSecond = this.storage.getPastSecond();
        this.pastMin = Math.floor(this.pastSecond / 60);
        this.pastHour = Math.floor(this.pastSecond / 60 * 60);
        this.pastCycle = floatFormat(this.pastSecond / CONFIG.CYCLE_BACKGROUND_SECOND, 2);
        this.sumPastCycle = this.storage.sumPastCycle;
        this.killedEnemyCount = 0;
        this.gotFoodCount = 0;
        this.increasePopulationCount = 0;
        this.killedPopulationCount = 0;
        this.messages = [];
    },

    update: function() {
        if (
            this.game.setBuilding.isVisible() == true ||
            this.game.resetWindow.isVisible() == true
        ) return;

        if (this.messages.length >= 1 && this.game.cutIn.isVisible() == false) {
            this.game.cutIn.setCutInText(this.messages[0]);
            this.messages.splice(0, 1);
        }
    },

    calcPastTime2: function() {
        this.safe += 0.5;
        this.calcRate();
        this.renderGauge();
    },

    calcPastTime1: function(_pastCycle, type) {
        for (var i = 0; i < _pastCycle; i++) {
            if(type == "background")
            {
                var _rand = getRandNumberFromRange(0,2);
                this.increasePopulationCount += _rand;
                this.population += _rand;
            }
        }
        this.sumPastCycle += _pastCycle;
        this.setMessage(this.sumPastCycle);
        playSE005_Button(this.game.storage);

        var maxEnemyCnt = Math.ceil(this.population/100) + 1;
        if(this.game.storage.tutorialNum >= 7){
            this.renderItems(0, 0, 0, maxEnemyCnt);
        }

        this.safe += 0.5;
        this.saveData();
        this.renderGauge();
    },

    setMessage: function(_sumPastCycle) {
        var _reward = this.increasePopulationCount * 10 
        + this.gotFoodCount * 2
        - this.killedPopulationCount * 10 
        + this.killedEnemyCount * 10;

        this.messages.push(
            CONFIG.MONTHLY_MESSAGE.format(
                this.getCycleText(_sumPastCycle)["year"],
                this.getCycleText(_sumPastCycle)["month"],
                this.killedEnemyCount,
                this.gotFoodCount,
                this.increasePopulationCount,
                this.killedPopulationCount,
                _reward
            )
        );

        this.amount += _reward;
        this.killedEnemyCount = 0;
        this.gotFoodCount = 0;
        this.increasePopulationCount = 0;
        this.killedPopulationCount = 0;
    },

    getCycleText: function(cycle) {
        if (cycle <= 12) {
            return {
                "year": 0,
                "month": Math.floor(cycle)
            };
        }
        var _year = 0;
        var _month = 0;
        if (cycle > 12) {
            _year = Math.floor(cycle / 12);
            _month = Math.floor(cycle - (12 * _year) + 1);
        }
        return {
            "year": _year,
            "month": _month
        };
    },

    getDistanceTowPositions: function(mapId, distonationMapId) {
        var pos = this.storage.mapPosition[mapId - 1];
        var _x = Number(pos["x"]);
        var _y = Number(pos["y"]);
        var pos2 = this.storage.mapPosition[distonationMapId - 1];
        var _x2 = Number(pos2["x"]);
        var _y2 = Number(pos2["y"]);
        var dist = Math.sqrt(Math.ceil(_x - _x2) * Math.ceil(_x - _x2) + Math.ceil(_y - _y2) * Math.ceil(_y - _y2));
        return dist;
    },

    getRouteIdsFromTwoPosition: function(mapId, distonationMapId, count) {
        var route = [mapId];
        for (var i = 1; i <= count; i++) {
            var route_1_array = this.getNeighborMapId(mapId);
            var minDistance = 9999999999;
            var minRouteMapId = null;
            for (var h = 0; h < route_1_array.length; h++) {
                var dist = this.getDistanceTowPositions(route_1_array[h], distonationMapId);
                if (dist < minDistance) {
                    minDistance = dist;
                    minRouteMapId = route_1_array[h];
                }
            }
            if (minRouteMapId != null && minDistance != 0) {
                route.push(minRouteMapId);
                mapId = minRouteMapId;
            } else if (minRouteMapId != null && minDistance == 0) {
                route.push(minRouteMapId);
                var original_route = route.slice();
                var reverse_route = route.reverse().slice();
                var concat_route = original_route.concat(reverse_route);
                return concat_route;
            }
        }
        var original_route = route.slice();
        var reverse_route = route.reverse().slice();
        var concat_route = original_route.concat(reverse_route);
        return concat_route;
    },

    getRouteIdsFromTwoPosition2: function(mapId, distonationMapId, count) {
        var route = [mapId];
        for (var i = 1; i <= count; i++) {
            var route_1_array = this.getNeighborMapId(mapId);
            var minDistance = 9999999999;
            var minRouteMapId = null;
            for (var h = 0; h < route_1_array.length; h++) {
                var dist = this.getDistanceTowPositions(route_1_array[h], distonationMapId);
                if (dist < minDistance) {
                    minDistance = dist;
                    minRouteMapId = route_1_array[h];
                }
            }
            if (minRouteMapId != null && minDistance != 0) {
                route.push(minRouteMapId);
                mapId = minRouteMapId;
            } else if (minRouteMapId != null && minDistance == 0) {
                route.push(minRouteMapId);
                var original_route = route.slice();
                //var reverse_route = route.reverse().slice();
                //var concat_route = original_route;
                return original_route;
            }
        }
        var original_route = route.slice();
        return original_route;
    },

    getRouteIds: function(mapId, count) {
        var route = [mapId];
        for (var i = 1; i <= count; i++) {
            var route_1_array = this.getNeighborMapId(mapId);
            //すでにIDがroute(array)に含まれていたら除く
            var removed_route_1_array = [];
            for (var j = 0; j < route_1_array.length; j++) {
                if (route.indexOf(route_1_array[j]) >= 0) {
                    //存在する場合は何もしない
                } else {
                    //存在しない場合のみ追加する
                    removed_route_1_array.push(route_1_array[j]);
                }
            }
            var route_array = [];
            if (removed_route_1_array.length == 0) {
                route_array = route_1_array;
            } else {
                route_array = removed_route_1_array;
            }
            //ルートがなかった場合は現在まで出来上がったルートを返す
            if (route_array.length == 0) {
                var original_route = route.slice();
                var reverse_route = route.reverse().slice();
                var concat_route = original_route.concat(reverse_route);
                return concat_route;
            }
            //覗いいた後に配列の数が0になったら、戻す
            var _rand_route_1 = getRandNumberFromRange(0, route_array.length);
            var route_1 = route_array[_rand_route_1];
            route.push(route_1);
            mapId = route_1;
        }
        //javascriptは参照渡しになるので、sliceして値渡しにする
        var original_route = route.slice();
        var reverse_route = route.reverse().slice();
        var concat_route = original_route.concat(reverse_route);
        return concat_route;
    },

    getNeighborMapId: function(mapId) {
        //まずはこのmapのxとy座標を得る.
        var pos = this.storage.mapPosition[mapId - 1];
        var _x = pos["x"];
        var _y = pos["y"];
        var neighbors = [];
        for (var i = 0; i < this.storage.mapPosition.length; i++) {
            if (this.storage.mapPosition[i]["x"] == Math.floor(_x - 1) && this.storage.mapPosition[i]["y"] == _y) {
                //道である場合は通行できる
                if (this.conf[this.game.mapChips[i].confNumber] == 3) {
                    if (this.game.mapChips[i].mapId) {
                        neighbors.push(this.game.mapChips[i].mapId);
                    }
                }
                //田畑は通行できる
                var itemData = this.getItemFromLibrary(this.conf[this.game.mapChips[i].confNumber]);
                if (itemData) {
                    if (itemData["food"] > 0) {
                        if (this.game.mapChips[i].mapId) {
                            neighbors.push(this.game.mapChips[i].mapId);
                        }
                    }
                }
            }
            if (this.storage.mapPosition[i]["x"] == Math.floor(_x + 1) && this.storage.mapPosition[i]["y"] == _y) {
                if (this.conf[this.game.mapChips[i].confNumber] == 3) {
                    if (this.game.mapChips[i].mapId) {
                        neighbors.push(this.game.mapChips[i].mapId);
                    }
                }
                //田畑は通行できる
                var itemData = this.getItemFromLibrary(this.conf[this.game.mapChips[i].confNumber]);
                if (itemData) {
                    if (itemData["food"] > 0) {
                        if (this.game.mapChips[i].mapId) {
                            neighbors.push(this.game.mapChips[i].mapId);
                        }
                    }
                }
            }

            if (this.storage.mapPosition[i]["x"] == _x && this.storage.mapPosition[i]["y"] == Math.floor(_y - 1)) {
                if (this.conf[this.game.mapChips[i].confNumber] == 3) {
                    if (this.game.mapChips[i].mapId) {
                        neighbors.push(this.game.mapChips[i].mapId);
                    }
                }
                //田畑は通行できる
                var itemData = this.getItemFromLibrary(this.conf[this.game.mapChips[i].confNumber]);
                if (itemData) {
                    if (itemData["food"] > 0) {
                        if (this.game.mapChips[i].mapId) {
                            neighbors.push(this.game.mapChips[i].mapId);
                        }
                    }
                }
            }
            if (this.storage.mapPosition[i]["x"] == _x && this.storage.mapPosition[i]["y"] == Math.floor(_y + 1)) {
                if (this.conf[this.game.mapChips[i].confNumber] == 3) {
                    if (this.game.mapChips[i].mapId) {
                        neighbors.push(this.game.mapChips[i].mapId);
                    }
                }
                //田畑は通行できる
                var itemData = this.getItemFromLibrary(this.conf[this.game.mapChips[i].confNumber]);
                if (itemData) {
                    if (itemData["food"] > 0) {
                        if (this.game.mapChips[i].mapId) {
                            neighbors.push(this.game.mapChips[i].mapId);
                        }
                    }
                }
            }
        }
        return neighbors;
    },

    setPositionByMapChip: function(mapId) {
        var confNumber = null;
        for (var i = 0; i < this.game.mapChips.length; i++) {
            if (this.game.mapChips[i].mapId == mapId) {
                confNumber = this.game.mapChips[i].confNumber;
            }
        }
        var _x = 0;
        var _y = 0;
        var col = confNumber % 40;
        var row = Math.floor(confNumber / 40);
        if (row % 2 == 0) {
            this.game.baseNode.setPosition(-216 * this.game.windowScale * col + 320 * this.game.windowScale,
                108 / 2 * this.game.windowScale * row + 710 * this.game.windowScale
            );
        } else {
            this.game.baseNode.setPosition(-216 * this.game.windowScale * col + 320 * this.game.windowScale + 216 / 2 * this.game.windowScale,
                108 / 2 * this.game.windowScale * row + 710 * this.game.windowScale
            );
        }
    },

    intializeEnemy : function(){
        for (var i = 0; i < this.enemyPositions.length; i++) {
            if(this.enemyPositions[i].length > 0){
                this.game.addEnemyToMapId("enemy",this.enemyPositions[i]);
            }
        }
        this.saveData();
    },

    renderItems: function(_giveFoodCnt, _giveAmountCnt, _giveDokiCnt, _giveIllCnt) {
        //すでに存在しているものは1つ動かす
        for (var i = 0; i < this.game.enemies.length; i++) {
            this.game.enemies[i].incrementRouteId();
        }
        //足りなければたす
        if(this.game.enemies.length < _giveIllCnt)
        {
            this.game.addEnemyByMapChip("ill");
        }
        this.saveData();
    },

    renderWorld: function() {
        for (var i = 0; i < this.game.mapChips.length; i++) {
            this.game.baseNode.removeChild(this.game.mapChips[i]);
        }
        this.game.mapChips = [];
        this.house = 0;
        this.maxFood = 5;
        this.maxHouse = 0;
        this.maxSafe = 5;
        this.foodRate = 0;
        this.houseRate = 0;
        this.safeRate = 0;
        this.maxAmount = CONFIG.MAX_AMOUNT;
        this.happyRate = 0;
        this.safePositions = [];
        this.housePositions = [];
        this.enemyPositions = [];
        this.roadPositions = [];
        //レンダリング
        var confNum = 0;
        var mapId = 1;
        for (var y = 0; y < 60; y++) {
            for (var x = 0; x < 40; x++) {
                this.conf = this.storage.mapData;
                if (this.conf[confNum] == 1) {
                    //何もレンダリングしない
                } else {
                    var _mapChipNumber = this.conf[confNum];
                    if (this.conf[confNum] == 2) {
                        this.mapChip = new MapChip(null, this.conf[confNum]);
                        this.mapChip.retain();
                    } else if (this.conf[confNum] == 3) {
                        this.mapChip = new MapChip(null, this.conf[confNum]);
                        this.mapChip.retain();
                        this.roadPositions.push(mapId);
                    } else {
                        var itemData = this.getItemFromLibrary(this.conf[confNum]);
                        this.mapChip = new MapChip(itemData, this.conf[confNum]);
                        this.mapChip.retain();
                        this.mapChip.itemData = itemData;
                        if(this.population <= 15)
                        {
                            this.mapChip.maxGrowingCount = Math.ceil(getRandNumberFromRange(30*5,30*10)/10);
                        }

                        if (itemData != null) {
                            //パラメーターを加算する
                            this.buildingCount += 1;
                            this.maxFood += itemData["maxFood"];
                            this.maxHouse += itemData["house"];
                            this.maxSafe += itemData["safe"];
                            this.maxAmount += itemData["maxAmount"];
                            if (itemData["house"] > 0) {
                                this.housePositions.push(this.mapChip);
                            }
                            if (itemData["safe"] > 0) {
                                this.safePositions.push(this.mapChip);
                            }
                        }
                    }
                    this.game.mapChips.push(this.mapChip);
                    this.game.baseNode.addChild(this.mapChip);
                    this.mapChip.confNumber = confNum;
                    this.mapChip.mapId = mapId;
                    mapId += 1;
                    if (y % 2 == 0) {
                        this.mapChip.setPosition(216 * x + 216 / 2, -108 / 2 * y);
                    } else {
                        this.mapChip.setPosition(216 * x, -108 / 2 * y);
                    }
                }
                confNum++;
            }
        }
        for (var n = 0; n < this.game.mapChips.length; n++) {
            for (var m = 0; m < this.foodAvailableList.length; m++) {
                if (this.foodAvailableList[m].mapId == this.game.mapChips[n].mapId) {
                    this.game.mapChips[n].isFoodAvailable = true;
                }
            }
        }
    },

    calcRate: function() {
        this.food = floatFormat(this.food, 2);
        if (this.food < 0) {
            this.food = 0;
        }
        if (this.food > this.maxFood) {
            this.food = this.maxFood;
        }
        this.foodRate = this.food / this.maxFood;
        if (this.foodRate > 1) {
            this.foodRate = 1;
        }
        if (this.foodRate < 0) {
            this.foodRate = 0;
        }

        if (this.house <= 5) {
            this.house = 5;
        }
        if (this.house > 9999) {
            this.house = 9999;
        }

        this.houseRate = (this.maxHouse * 2 - this.population) / this.maxHouse;
        if (this.houseRate > 1) {
            this.houseRate = 1;
        }
        if (this.houseRate < 0) {
            this.houseRate = 0;
        }

        this.safe = floatFormat(this.safe, 2);
        if (this.safe < 0) {
            this.safe = 0;
        }
        if (this.safe > this.maxSafe) {
            this.safe = this.maxSafe;
        }

        this.safeRate = floatFormat(this.safe / this.maxSafe, 2);
        if (this.safeRate > 1) {
            this.safeRate = 1;
        }
        if (this.safeRate < 0) {
            this.safeRate = 0;
        }

        if (this.population <= 1) {
            this.population = 1;
        }
        if (this.population >= 9999) {
            this.population = 9999;
        }
        if (this.amount <= -9999) {
            this.amount = -9999;
        }
        if (this.amount >= 9999) {
            this.amount = 9999;
        }

        if (this.amount >= this.maxAmount) {
            this.amount = this.maxAmount;
        }

        var _sumRate = (this.foodRate + this.houseRate) / 2;
        this.happyRate = _sumRate;
    },

    renderGauge: function() {
        this.calcRate();
        this.game.header.foodGauge.update(this.foodRate);
        this.game.header.houseGauge.update(this.houseRate);
        this.game.header.safeGauge.update(this.safeRate);
        this.game.header.foodLabel.setString(this.food + "/" + this.maxFood);
        this.game.header.houseLabel.setString(this.population + "/" + this.maxHouse);
        this.game.header.safeLabel.setString(this.safe + "/" + this.maxSafe);
        this.game.header.populationLabel.setString("x " + this.population);
        this.game.header.amountLabel.setString("x " + this.amount + " / " + this.maxAmount);
        
        var _visibleDay = Math.ceil(this.game.cycleTimeRate * 30);
        if(_visibleDay >= 28)
        {
            if(this.getCycleText(this.sumPastCycle)["month"] == 2)
            {
                _visibleDay = 28;
            }
        }
        if(_visibleDay >= 30)
        {
            if(
                this.getCycleText(this.sumPastCycle)["month"] == 4
                || this.getCycleText(this.sumPastCycle)["month"] == 6
                || this.getCycleText(this.sumPastCycle)["month"] == 9
                || this.getCycleText(this.sumPastCycle)["month"] == 11
            ){
                _visibleDay = 30;
            }
        }
        this.game.header.cycleLabel.setString(this.getCycleText(this.sumPastCycle)["year"] + "年" + this.getCycleText(this.sumPastCycle)["month"] + "月" + _visibleDay + "日");
        if (this.amount > 0) {
            this.game.header.amountLabel.setFontFillColor(new cc.Color(255, 255, 255, 255));
        } else {
            this.game.header.amountLabel.setFontFillColor(new cc.Color(255, 0, 0, 255));
        }
    },

    saveData: function() {
        this.manageReward();
        this.game.storage.population = this.population;
        this.game.storage.sumPastCycle = this.sumPastCycle;
        this.game.storage.food = this.food;
        this.game.storage.amount = this.amount;
        this.game.storage.safe = this.safe;
        this.game.storage.enemyPositions = this.enemyPositions;
        //this.game.storage.killedEnemyCount += this.killedEnemyCount;
        this.storage.saveLastUpdateTime();
    },

    manageReward: function ()
    {
        if(this.population >= 30){this.game.setRewardId(1);}
        if(this.population >= 50){this.game.setRewardId(2);}
        if(this.population >= 100){this.game.setRewardId(3);}
        if(this.population >= 500){this.game.setRewardId(4);}
        if(this.population >= 1000){this.game.setRewardId(5);}

        if(this.buildingCount >= 10){this.game.setRewardId(6);}
        if(this.buildingCount >= 50){this.game.setRewardId(7);}
        if(this.buildingCount >= 100){this.game.setRewardId(8);}
        if(this.buildingCount >= 300){this.game.setRewardId(9);}

        if(this.storage.killedEnemyCount >= 10){this.game.setRewardId(10);}
        if(this.storage.killedEnemyCount >= 50){this.game.setRewardId(11);}
        if(this.storage.killedEnemyCount >= 100){this.game.setRewardId(12);}
        if(this.storage.killedEnemyCount >= 300){this.game.setRewardId(13);}
    },

    getItemFromLibrary: function(itemId) {
        for (var i = 0; i < CONFIG.SHOP_PRODUCT_ITEM_MASTER.length; i++) {
            if (CONFIG.SHOP_PRODUCT_ITEM_MASTER[i]["id"] == itemId) {
                return CONFIG.SHOP_PRODUCT_ITEM_MASTER[i];
            }
        }
        return null;
    },
});