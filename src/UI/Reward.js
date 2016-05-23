//
//  Reward.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//

var Reward = cc.Node.extend({
    ctor: function(game) {
        this._super();
        this.effectTime = 0;
        this.game = game;

        this.rewardData = game.storage.rewardData;

        this.bgLayer = cc.LayerColor.create(new cc.Color(0, 0, 0, 255 * 0.5), 640, 1400);
        this.addChild(this.bgLayer);

        var _height = this.game.viewSize.height;
        var _width = this.game.viewSize.width;
        this.tableView = new cc.TableView(this.dataSource, cc.size(_width, _height - 150));
        this.tableView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        this.tableView.setAnchorPoint(0,0);
        this.tableView.setPosition(50,0);

        this.tableView.setDelegate(this);
        this.tableView.setVerticalFillOrder(cc.TABLEVIEW_FILL_TOPDOWN);
        this.addChild(this.tableView);
        
        //configに突っ込む
        for (var i = 0; i < CONFIG.REWARD_LIST.length; i++)
        {
            CONFIG.REWARD_LIST[i]["isCleared"] = 0;
            if(this.game.isSetRewardId(CONFIG.REWARD_LIST[i]["id"]) == true)
            {
                CONFIG.REWARD_LIST[i]["isCleared"] = 1;
            }  
        }
        this.setFocus();
        this.setVisible(false);
    },

    update: function() {},

    setFocus: function() {
        this.dataSource.setSource(CONFIG.REWARD_LIST);
        this.tableView.reloadData();
    },

    dataSource: {
        source: null,

        setSource: function(source) {
            this.source = source;
        },

        getString: function(idx, col) {
            var string = "";
            var item = this.source[idx];
            string = item["title"];
            return string;
        },

        getString2: function(idx, col) {
            var string = "";
            if (col == 0) {
                string = this.source[idx]["title"];
            } else if (col == 1) {
                string = this.source[idx]["isCleared"];
            }
            return string;
        },

        numberOfCellsInTableView: function() {
            if (this.source == null) {
                return 0;
            } else {
                return this.source.length;
            }
        },

        tableCellSizeForIndex: function(table, idx) {
            return cc.size(table.width, 83);
        },

        tableCellAtIndex: function(table, idx) {
            idx = idx.toFixed(0);
            var cell = table.dequeueCell();
            if (!cell) {
                cell = new cc.TableViewCell();

                var sprite = cc.Sprite.create(res.UI_Reward_Line_png);
                sprite.setAnchorPoint(0, 0);
                sprite.setPosition(0, 0);
                cell.addChild(sprite);

                var label = new cc.LabelTTF("", CONFIG.FONT, 26);
                label.setFontFillColor(new cc.Color(0, 0, 0, 255));
                label.setAnchorPoint(0, 0.5);
                label.setPosition(100, 60/2);
                cell.addChild(label);
                label.setString(this.getString2(idx, 0));
                label.tag = 1;

                var sprite2 = cc.Sprite.create(res.Icon_Cleared_Reward_png);
                sprite2.setAnchorPoint(0, 0);
                sprite2.setPosition(0, 0);
                sprite2.tag = 10;
                cell.addChild(sprite2);
                if (this.getString2(idx, 1) == 1) {
                    sprite2.setVisible(true);
                } else {
                    sprite2.setVisible(false);
                }
            } else {
                var label = cell.getChildByTag(1);
                label.setString(this.getString2(idx, 0));

                var sprite2 = cell.getChildByTag(10);
                if (this.getString2(idx, 1) == 1) {
                    sprite2.setVisible(true);
                } else {
                    sprite2.setVisible(false);
                }
            }
            return cell;
        }
    }
});