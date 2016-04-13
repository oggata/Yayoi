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

        this.housePositions = [];
        this.foodPositions = [];
        this.safePositions = [];
        this.coinPositions = [];
        this.roadPositions = [];
        this.foodDonePositions = [];

        this.mapLevel = 1;
        this.mapExp = 0;
        this.food = 0;
        this.house = 0;
        this.safe = 0;
        this.maxFood = 0;
        this.maxHouse = 0;
        this.maxSafe = 0;
        this.foodRate = 0;
        this.houseRate = 0;
        this.safeRate = 0;
        this.maxAmount = CONFIG.MAX_AMOUNT;
        this.happyRate = 0;
        this.taxPerPeople = 5;

        this.population = this.storage.population;
        this.amount = this.storage.amount;
        this.costs = 0;

        this.food = this.storage.food;
        this.safe = this.storage.safe;
        this.doki = this.storage.doki;

        this.pastSecond = this.storage.getPastSecond();
        this.pastMin = Math.floor(this.pastSecond / 60);
        this.pastHour = Math.floor(this.pastSecond / 60 * 60);
        this.pastCycle = floatFormat(this.pastSecond / CONFIG.CYCLE_BACKGROUND_SECOND, 2);
        this.sumPastCycle = this.storage.sumPastCycle;

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
        this.calcRate();

        this.renderGauge();
    },

    calcPastTime1: function(_pastCycle, type) {
        var _oldPopulation = this.population;
        var _sumCost = 0;
        var _sumTax = 0;

        for (var i = 0; i < _pastCycle; i++) {

            //バックグラウンドで動いていた場合のみコストを払う
            var _spendCosts = this.getSpendCosts();
            if (type == "background") {
                this.food -= floatFormat(_spendCosts["food"], 2);
            }
            this.amount -= _spendCosts["costs"];
            _sumCost += _spendCosts["costs"];

            //納税させる
            var _getTax = this.getTax();
            this.amount += _getTax["taxAmount"];
            this.amount += CONFIG.DEBUG_ADD_AMOUNT;
            _sumTax += _getTax["taxAmount"];

            //レート計算する
            this.calcRate();

            //住民を移住させる
            this.population += this.getAddPopulation();
            var _maxPopulation = Math.floor((this.maxHouse * 2) + 5);
            if (this.population >= _maxPopulation) {
                this.population = _maxPopulation;
            }
        }

        var _addPopulation = this.population - _oldPopulation;
        this.sumPastCycle += _pastCycle;

        //清算報告を入れる------------------------->
        var _text = " ";
        _text += this.getCycleText(this.sumPastCycle)["month"] + "月になりました....................\n\n";
        if (this.getCycleText(_pastCycle)["year"] == 0) {
            if (this.getCycleText(_pastCycle)["month"] > 1) {
                _text += "(前回から" + this.getCycleText(_pastCycle)["month"] + "ヶ月が経過しました.)\n";
            }
        } else {
            _text += "(前回から" + this.getCycleText(_pastCycle)["year"] + "年" + this.getCycleText(_pastCycle)["month"] + "月が経過しました.)\n";
        }

        if (_addPopulation == 0) {} else if (_addPopulation > 0) {
            _text += "" + _addPopulation + "人が邪馬台国に移住しました.\n";
        } else if (_addPopulation < 0) {
            _text += "" + _addPopulation * -1 + "人が邪馬台国から出て行きました.\n";
        }

        _text += "[納税]:" + _sumTax + "枚 (内訳:住民" + this.population + "人x" + this.taxPerPeople + ")\n";
        _text += "[維持]:-" + _sumCost + "枚 (内訳:建物総コスト)\n";
        _text += "-----------------------------------\n"
        _text += "[合計]:" + Math.floor(_sumTax - _sumCost) + "枚\n";
        this.messages.push(_text);

        var _rand = getRandNumberFromRange(1, 10);
        if (this.amount <= -100) {
            var _rand2 = getRandNumberFromRange(1, 3);
            if (_rand2 == 2) {
                _rand = 4;
            }
        }

        //アドバイスを入れる------------------------->
        if (Math.floor(_sumTax - _sumCost) <= -10) {
            var _txt2 =
                "今月は赤字になりましたね...\n" + "必要とされているより多くの建物の\n" + "コストが膨れ上がっています.\n" + "一度いくつかの建物を\n" + "取り壊したほうがよいかもしれません.";
            this.messages.push(_txt2);
        } else if (this.foodRate <= 0.3) {
            var _txt2 =
                "「食料」が不足しているようです.\n" + "食料が0以下になってしまうと\n" + "住人が死んでしまいます.\n" + "田を増やすか貯蔵施設を作りましょう\n" + "";
            this.messages.push(_txt2);
        } else if (this.houseRate <= 0.3) {
            var _txt2 =
                "「住居」が不足しているようです.\n" + "住居が不足していると\n" + "住んでいる人たちのストレスが上がります.\n" + "住居を増やしましょう.";
            this.messages.push(_txt2);
        } else if (this.safeRate <= 0.3) {
            var _txt2 =
                "「治安」が悪化しています.\n" + "治安が悪化していると「病気」や「外敵」\n" + "に接触した時、死亡する確率が高まります.\n" + "治安に関する建物を建てましょう.";
            this.messages.push(_txt2);
        }

        if (this.happyRate >= 0.8) {
            var _txt2 =
                "最近、住民の幸福度が高いようです.\n" + "近隣の村からの移住が期待できます.";
            this.messages.push(_txt2);
        }
        if (this.happyRate <= 0.3) {
            var _txt2 =
                "最近、住民の幸福度が低いようです.\n" + "このままでは近隣の村に移っていく\n" + "住民が増えそうです.";
            this.messages.push(_txt2);
        }

        if (_rand == 1) {
            var _txt2 =
                "今月は「豊作」です.\n" + "果物も米と同様に食料に\n" + "換算されるますよ.\n";
            this.renderItems(12, 0, 0, 0);
            this.messages.push(_txt2);
        } else if (_rand == 2) {
            var _txt2 =
                "今月は「病気」が流行しています.\n" + "病にかかると一定確率で死亡します.\n" + "「治安」が100%に近いほど\n" + "死亡する確率を減らす事ができます.";
            this.renderItems(0, 0, 0, 12);
            this.messages.push(_txt2);
        } else {
            // food / amount / doki /ill 
            var _randIll = getRandNumberFromRange(1, 4);
            var _randFood = getRandNumberFromRange(1, 4);
            this.renderItems(_randFood, 0, 0, _randIll);
        }

        //保存する
        this.saveData();

        //レンダリング
        this.renderGauge();
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
            //var _posX = this.game.mapChips[i].mapId
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

    renderItems: function(_giveFoodCnt, _giveAmountCnt, _giveDokiCnt, _giveIllCnt) {
        /*すべてのアイテムをリセット*/
        //全部一旦リセットする
        for (var i = 0; i < this.game.items.length; i++) {
            this.game.baseNode.removeChild(this.game.items[i]);
            this.game.items.splice(i, 1);
        }

        this.itemRoadPositions = [];
        this.itemRoadPositions = this.roadPositions;

        if (this.storage.tutorialNum <= 3) return;

        //食料
        for (var a = 0; a < _giveFoodCnt; a++) {
            var _rand_route_1 = getRandNumberFromRange(0, this.itemRoadPositions.length);
            this.itemRoadPositions.splice(_rand_route_1, 1);
            var _itemLoadMapNumber = this.itemRoadPositions[_rand_route_1];
            this.game.addItemByMapChip(_itemLoadMapNumber, "food");
        }

        //お金
        for (var b = 0; b < _giveAmountCnt; b++) {
            var _rand_route_1 = getRandNumberFromRange(0, this.itemRoadPositions.length);
            this.itemRoadPositions.splice(_rand_route_1, 1);
            var _itemLoadMapNumber = this.itemRoadPositions[_rand_route_1];
            this.game.addItemByMapChip(_itemLoadMapNumber, "money");
        }

        //土器
        for (var c = 0; c < _giveDokiCnt; c++) {
            var _rand_route_1 = getRandNumberFromRange(0, this.itemRoadPositions.length);
            this.itemRoadPositions.splice(_rand_route_1, 1);
            var _itemLoadMapNumber = this.itemRoadPositions[_rand_route_1];
            this.game.addItemByMapChip(_itemLoadMapNumber, "doki");
        }

        //病気
        for (var d = 0; d < _giveIllCnt; d++) {
            var _rand_route_1 = getRandNumberFromRange(0, this.itemRoadPositions.length);
            this.itemRoadPositions.splice(_rand_route_1, 1);
            var _itemLoadMapNumber = this.itemRoadPositions[_rand_route_1];
            this.game.addItemByMapChip(_itemLoadMapNumber, "ill");
        }

    },

    renderWorld: function() {
        //全部一旦リセットする
        for (var i = 0; i < this.game.mapChips.length; i++) {
            this.game.baseNode.removeChild(this.game.mapChips[i]);
            //this.game.mapChips.splice(i, 1);
        }
        this.game.mapChips = [];

        this.house = 0;
        this.safe = 0;
        this.maxFood = 0;
        this.maxHouse = 0;
        this.maxSafe = 0;
        this.foodRate = 0;
        this.houseRate = 0;
        this.safeRate = 0;
        this.costs = 0;
        this.maxAmount = CONFIG.MAX_AMOUNT;
        this.happyRate = 0;
        this.outputPositions = [];
        this.housePositions = [];
        this.foodPositions = [];
        //this.foodDonePositions = [];
        this.coinPositions = [];
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

                        if (itemData != null) {
                            //パラメーターを加算する
                            this.maxFood += itemData["maxFood"];
                            this.maxHouse += itemData["house"];
                            this.safe += itemData["safe"];
                            this.costs += itemData["cost"];
                            this.maxAmount += itemData["maxAmount"];
                            if (itemData["house"] > 0) {
                                this.housePositions.push(this.mapChip);
                            }
                            if (itemData["food"] > 0) {
                                this.foodPositions.push(this.mapChip);
                            }
                            if (itemData["safe"] > 0) {
                                this.safePositions.push(this.mapChip);
                            }
                        }
                    }

                    //if foodDonePositionsに含まれたら収穫済
                    if (this.foodDonePositions.indexOf(mapId) >= 0) {
                        this.mapChip.isFoodAvailable = false;
                        this.mapChip.sprite.setOpacity(255 * 0.5);
                        this.mapChip.setOpacity(255 * 0.5);
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
    },

    getSpendCosts: function() {
        //食料
        var _food = this.population * CONFIG.PEOPLE_EAT_FOOD_RATE;
        //建物のコスト
        var _cost = this.costs;
        return {
            "food": _food,
            "costs": _cost
        };
    },

    getTax: function() {
        this.taxPerPeople = getRandNumberFromRange(4, 8);
        if (this.population <= 20) {
            this.taxPerPeople = 12;
        }
        if (this.population <= 10) {
            this.taxPerPeople = 15;
        }
        var _amount = this.population * this.taxPerPeople;
        return {
            "taxAmount": _amount
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
        if (this.safe > 9999) {
            this.safe = 9999;
        }

        this.safeRate = (this.safe * 2 - this.population) / this.safe;
        if (this.safeRate > 1) {
            this.safeRate = 1;
        }
        if (this.safeRate < 0) {
            this.safeRate = 0;
        }

        if (this.population <= 5) {
            this.population = 5;
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

        var _sumRate = (this.foodRate + this.houseRate + this.safeRate) / 3;
        this.happyRate = _sumRate;
    },

    getAddPopulation: function() {

        var _foodRate = this.foodRate;
        if (_foodRate > 1) {
            _foodRate = 1;
        }
        var _sumRate = (_foodRate + this.houseRate + this.safeRate) / 3;
        this.happyRate = _sumRate;

        var _addPopulation = 0;
        if (_sumRate >= 0.9) {
            _addPopulation = 5;
        } else if (_sumRate >= 0.8) {
            _addPopulation = 4;
        } else if (_sumRate >= 0.7) {
            _addPopulation = 3;
        } else if (_sumRate >= 0.6) {
            _addPopulation = 2;
        } else if (_sumRate >= 0.5) {
            _addPopulation = 0;
        } else if (_sumRate >= 0.4) {
            _addPopulation = -2;
        } else if (_sumRate >= 0.3) {
            _addPopulation = -3;
        } else if (_sumRate >= 0.2) {
            _addPopulation = -4;
        } else {
            _addPopulation = -5;
        }
        return _addPopulation;
    },

    renderGauge: function() {
        this.calcRate();
        this.game.header.foodGauge.update(this.foodRate);
        this.game.header.houseGauge.update(this.houseRate);
        this.game.header.safeGauge.update(this.safeRate);
        this.game.header.foodLabel.setString(this.food + "/" + this.maxFood);
        this.game.header.houseLabel.setString(this.population + "/" + this.maxHouse);
        this.game.header.safeLabel.setString(this.population + "/" + this.safe);
        this.game.header.populationLabel.setString("x " + this.population);
        this.game.header.amountLabel.setString("x " + this.amount + " / " + this.maxAmount);
        this.game.header.cycleLabel.setString(this.getCycleText(this.sumPastCycle)["year"] + "年" + this.getCycleText(this.sumPastCycle)["month"] + "月" + Math.ceil(this.game.cycleTimeRate * 30) + "日");
        if (this.amount > 0) {
            this.game.header.amountLabel.setFontFillColor(new cc.Color(255, 255, 255, 255));
            this.game.header.amountLabel.enableStroke(new cc.Color(0, 0, 0, 255), 1, false);
        } else {
            this.game.header.amountLabel.setFontFillColor(new cc.Color(255, 0, 0, 255));
            this.game.header.amountLabel.enableStroke(new cc.Color(192, 192, 192, 255), 1, false);
        }
    },

    saveData: function() {
        this.game.storage.population = this.population;
        this.game.storage.sumPastCycle = this.sumPastCycle;
        this.game.storage.food = this.food;
        this.game.storage.safe = this.safe;
        this.game.storage.doki = this.doki;
        this.game.storage.amount = this.amount;
        this.storage.saveLastUpdateTime();
    },

    getItemFromLibrary: function(itemId) {
        for (var i = 0; i < this.storage.itemLibraries.length; i++) {
            if (this.storage.itemLibraries[i]["id"] == itemId) {
                return this.storage.itemLibraries[i];
            }
        }
        return null;
    },
});