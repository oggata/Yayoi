//
//  Action.js
//  Yamataikoku
//
//  Created by Fumitoshi Ogata on 01/02/16.
//  Copyright (c) 2016 http://oggata.github.io All rights reserved.
//

var Action = cc.Node.extend({

    ctor: function(game) {
        this._super();
        this.game = game;
        this.type = "destroy";
        this.targetMapChip = null;
        this.targetEnemy = null;
        this.targetBuilding = null;

        this.bgLayer = cc.LayerColor.create(new cc.Color(0, 0, 0, 255 * 0), 440, 100);
        this.addChild(this.bgLayer);

        this.messageLabel = cc.LabelTTF.create("", "Arial", 28);
        this.messageLabel.setFontFillColor(new cc.Color(0, 0, 0, 255));
        this.messageLabel.enableStroke(new cc.Color(192, 192, 192, 255), 1, false);
        this.bgLayer.addChild(this.messageLabel);
        this.messageLabel.setPosition(100, 100);

        //destroy button
        this.destroyButton = new cc.MenuItemImage(res.Button_Destroy_png, res.Button_Destroy_On_png, function() {
            this.doReset();
            playSE003_Button(this.game.storage);
        }, this);
        this.destroyButton.setPosition(100,0);
        this.destroyButtonDisable = cc.Sprite.create(res.Button_Action_Disable_png);
        this.destroyButton.addChild(this.destroyButtonDisable);
        this.destroyButtonDisable.setAnchorPoint(0,0);
        this.window_description = cc.Sprite.create(res.Window_Description_Amount_png);
        this.destroyButton.addChild(this.window_description);
        this.window_description.setPosition(50,-10);
        this.destroyMessageLabel = cc.LabelTTF.create("", "Arial", 20);
        this.destroyMessageLabel.setFontFillColor(new cc.Color(255, 255, 255, 255));
        this.window_description.addChild(this.destroyMessageLabel);
        this.destroyMessageLabel.setPosition(70, 15);

        //attack button
        this.attackButton = new cc.MenuItemImage(res.Button_Attack_png, res.Button_Attack_On_png, function() {
            this.doAttack();
            playSE003_Button(this.game.storage);
        }, this);
        this.attackButton.setPosition(200,0);
        this.attackButtonDisable = cc.Sprite.create(res.Button_Action_Disable_png);
        this.attackButton.addChild(this.attackButtonDisable);
        this.attackButtonDisable.setAnchorPoint(0,0);
        this.window_description = cc.Sprite.create(res.Window_Description_Food_png);
        this.attackButton.addChild(this.window_description);
        this.window_description.setPosition(0,-10);
        this.attackMessageLabel = cc.LabelTTF.create("", "Arial", 24);
        this.attackMessageLabel.setFontFillColor(new cc.Color(255, 255, 255, 255));
        this.window_description.addChild(this.attackMessageLabel);
        this.attackMessageLabel.setPosition(70, 15);

        this.window_description_safe = cc.Sprite.create(res.Window_Description_Safe_png);
        this.attackButton.addChild(this.window_description_safe);
        this.window_description_safe.setPosition(100,-10);
        this.safeMessageLabel = cc.LabelTTF.create("", "Arial", 24);
        this.safeMessageLabel.setFontFillColor(new cc.Color(255, 255, 255, 255));
        this.window_description_safe.addChild(this.safeMessageLabel);
        this.safeMessageLabel.setPosition(70, 15);

        //add people button
        this.addPeopleButton = new cc.MenuItemImage(res.Button_Add_People_png, res.Button_Add_People_On_png, function() {
            this.addPopulation();
            playSE003_Button(this.game.storage);
        }, this);
        this.addPeopleButton.setPosition(300,0);
        this.window_description = cc.Sprite.create(res.Window_Description_Food_png);
        this.addPeopleButton.addChild(this.window_description);
        this.window_description.setPosition(50,-10);
        this.peopleMessageLabel = cc.LabelTTF.create("", "Arial", 20);
        this.peopleMessageLabel.setFontFillColor(new cc.Color(255, 255, 255, 255));
        this.window_description.addChild(this.peopleMessageLabel);
        this.peopleMessageLabel.setPosition(70, 15);
        this.populationLabel = cc.LabelTTF.create("", "Arial", 42);
        this.populationLabel.setFontFillColor(new cc.Color(0, 0, 0, 255));
        this.addPeopleButton.addChild(this.populationLabel);
        this.populationLabel.setPosition(50, 50);
        this.populationButtonDisable = cc.Sprite.create(res.Button_Action_Disable_png);
        this.addPeopleButton.addChild(this.populationButtonDisable);
        this.populationButtonDisable.setAnchorPoint(0,0);

        this.menu = new cc.Menu(
            this.destroyButton,
            this.attackButton,
            this.addPeopleButton
        );
        this.menu.setPosition(0, 50);
        this.bgLayer.addChild(this.menu, 99999);
    },

    update: function() {
        
        if(this.game.mapManager.amount >= 20)
        {
            this.destroyButtonDisable.setVisible(false);
        }else{
            this.destroyButtonDisable.setVisible(true);
        }

        if(this.game.mapManager.food >= CONFIG.FOOD_AMOUNT_FOR_HAVE_PERSON ){
            if(this.game.mapManager.maxHouse * 2 > (this.game.mapManager.population + this.game.mapManager.waitPopulation)){
                //食料が一定以上で、居住容量があれば追加できる.
                this.populationButtonDisable.setVisible(false);
            }else{
                this.populationButtonDisable.setVisible(true);
            }
        }else{
            this.populationButtonDisable.setVisible(true);
        }

        if(this.type == "destroy")
        {
            this.destroyButton.setVisible(true);
            this.attackButton.setVisible(false);
            this.addPeopleButton.setVisible(false);
            this.destroyButton.setPosition(220,0);
            this.destroyMessageLabel.setString("x20");
        }else if(this.type == "attack")
        {
            this.destroyButton.setVisible(false);
            this.attackButton.setVisible(true);
            this.addPeopleButton.setVisible(false);
            this.attackButton.setPosition(220,0);
            this.attackMessageLabel.setString("x" + this.targetEnemy.warriorCount * CONFIG.FOOD_AMOUNT_FOR_SALLY_WARRIOR);
            this.safeMessageLabel.setString("x" + this.targetEnemy.warriorCount * CONFIG.FOOD_AMOUNT_FOR_SALLY_WARRIOR);
            if(this.game.mapManager.safePositions.length <= 0)
            {
                this.attackButtonDisable.setVisible(true);
            }else if(this.game.mapManager.safe < this.targetEnemy.warriorCount){
                this.attackButtonDisable.setVisible(true);
            }else if( Math.ceil(this.targetEnemy.warriorCount * CONFIG.FOOD_AMOUNT_FOR_SALLY_WARRIOR) > this.game.mapManager.food)
            {
                this.attackButtonDisable.setVisible(true);
            }else{
                this.attackButtonDisable.setVisible(false);
            }
        }else if(this.type == "add_population")
        {
            this.populationLabel.setString(this.game.mapManager.waitPopulation);
            this.destroyButton.setVisible(true);
            this.attackButton.setVisible(false);
            this.addPeopleButton.setVisible(true);
            this.destroyButton.setPosition(220 - 60,0);
            this.addPeopleButton.setPosition(220 + 60,0);
            this.destroyMessageLabel.setString("x20");
            this.peopleMessageLabel.setString("x" + CONFIG.FOOD_AMOUNT_FOR_HAVE_PERSON);
        }
    },

    doAttack : function()
    {
        if(this.attackButtonDisable.isVisible()) return;
        var _minDist = 99999;
        var _housePosition = null;

        if(this.targetMapChip == null) return;

        for (var h = 0; h < this.game.mapManager.safePositions.length; h++) {
            var _dist = this.game.mapManager.getDistanceTowPositions(
                this.game.mapManager.safePositions[h].mapId,
                this.targetMapChip.mapId
            );
            if(_dist < _minDist)
            {
                _minDist = _dist;
                _housePosition = this.game.mapManager.safePositions[h].mapId;
            }
        }

        this.game.addWarriorByMapChip(
            _housePosition,
            this.targetMapChip.mapId,
            10
        );
        this.game.mapManager.food -= Math.ceil(this.targetEnemy.warriorCount * CONFIG.FOOD_AMOUNT_FOR_SALLY_WARRIOR);
        this.game.mapManager.safe -= this.targetEnemy.warriorCount;

        playSE002_Button();
        this.setVisible(false);
    },

    doReset : function()
    {
        if(this.destroyButtonDisable.isVisible()) return;
        this.game.resetWindow.targetMapChip = this.targetMapChip;
        this.game.resetWindow.setVisible(true);
        this.setVisible(false);
    },

    addPopulation : function()
    {
        if(this.populationButtonDisable.isVisible()) return;
        this.game.mapManager.waitPopulation+=1;
        this.game.mapManager.food -= CONFIG.FOOD_AMOUNT_FOR_HAVE_PERSON;
    }

});