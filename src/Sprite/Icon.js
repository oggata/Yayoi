var Icon = cc.Node.extend({
    ctor: function(emotionType) {
        this._super();
        //this.game = game;

        var iconImage = "res/icon_good.png";
        if (emotionType == "need_food") {
            iconImage = "res/icon_bad.png";
        }
        if (emotionType == "need_house") {
            iconImage = "res/icon_house.png";
        }
        if (emotionType == "need_safe") {
            iconImage = "res/icon_dokuro.png";
        }
        if (emotionType == "got_food") {
            iconImage = "res/icon_kome.png";
        }
        if (emotionType == "got_food2") {
            iconImage = "res/icon_apple.png";
        }
        if (emotionType == "got_money") {
            iconImage = "res/icon_money.png";
        }
        if (emotionType == "got_ill") {
            iconImage = "res/icon_dokuro.png";
        }
        if (emotionType == "got_doki") {
            iconImage = "res/icon_good.png";
        }
        if (emotionType == "good") {
            iconImage = "res/icon_good.png";
        }
        this.visibleTime = 0;
        //var iconImage = "res/good_icon.png";
        var iconFrameSeq = [];
        for (var i = 0; i < 3; i++) {
            var frame = cc.SpriteFrame.create(iconImage, cc.rect(32 * i, 30 * 0,
                32, 30));
            iconFrameSeq.push(frame);
        }
        this.iconWa = cc.Animation.create(iconFrameSeq, 0.2);
        this.iconRa = cc.RepeatForever.create(cc.Animate.create(this.iconWa));
        this.iconSprite = cc.Sprite.create(iconImage, cc.rect(0, 0, 32, 30));
        this.iconSprite.retain();
        this.iconSprite.runAction(this.iconRa);
        this.iconSprite.setPosition(0, 55);
        this.addChild(this.iconSprite);
    },

    init: function() {},

    update: function() {},


});
