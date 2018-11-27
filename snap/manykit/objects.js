// objects.js

SpriteMorph.prototype.originalInit = SpriteMorph.prototype.init;
SpriteMorph.prototype.init = function(globals) {
    this.originalInit(globals);
	this.arduino = new Arduino(this);
};

SpriteMorph.prototype.categories.push('Arduino');
SpriteMorph.prototype.blockColor['Arduino'] = new Color(0, 151, 156);

SpriteMorph.prototype.categories.push('PXFrame');
SpriteMorph.prototype.blockColor['PXFrame'] = new Color(63, 72, 204);

// makerclock
//SpriteMorph.prototype.categories.push('MakerClock');
SpriteMorph.prototype.blockColor['MakerClock'] = new Color(0, 151, 200);

SpriteMorph.prototype.originalInitBlocks = SpriteMorph.prototype.initBlocks;
SpriteMorph.prototype.initArduinoBlocks = function () {
    this.blocks.pinMode =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'Arduino',
        spec: 'PinMode %_Pin as %_PinMode',
        defaults: ["2", 'OUTPUT'],
        transpilable: true
    };

    this.blocks.digitalWrite =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'Arduino',
        spec: 'DigitalWrite %_Pin as %_HighLow',
        defaults: ["2", "HIGH"],
        transpilable: true
    };

    this.blocks.pwmWrite =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'Arduino',
        spec: 'PwmWrite %_PwmPin as %n',
        defaults: ["3", 255],
        transpilable: true
    };
    
    this.blocks.digitalRead =
    {
        only: SpriteMorph,
        type: 'predicate',
        category: 'Arduino',
        spec: 'DigitalRead %_Pin',
        defaults: ["2"],
        transpilable: true
    };

    this.blocks.analogWrite =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'Arduino',
        spec: 'AnalogWrite %_AnalogPin as %n',
        defaults: ["A0", 255],
        transpilable: true
    };

    this.blocks.analogRead =
    {
        only: SpriteMorph,
        type: 'reporter',
        category: 'Arduino',
        spec: 'AnalogRead %_AnalogPin',
        defaults: ["A0"],
        transpilable: true
    };

    this.blocks.servoInit =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'Arduino',
        spec: 'Servo index %n init at pin %_Pin',
        defaults: [0, "A0"],
        transpilable: true
    };

    this.blocks.servoWrite =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'Arduino',
        spec: 'Servo index %n write value %n',
        defaults: [0, 45],
        transpilable: true
    };

    this.blocks.ultrasonicInit =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'Arduino',
        spec: 'UltrasonicInit at pinTriger %_Pin and pinEcho %_Pin',
        defaults: ["A0", "A1"],
        transpilable: true
    };

    this.blocks.ultrasonicMeasure =
    {
        only: SpriteMorph,
        type: 'reporter',
        category: 'Arduino',
        spec: 'UltrasonicMeasure',
        transpilable: true
    };
}
SpriteMorph.prototype.initPXFrameBlocks = function () {

    this.blocks._GetServerMessage =
    {
        only: SpriteMorph,
        type: 'predicate',
        category: 'PXFrame',
        spec: 'GetServerMessage',
        transpilable: false
    };

    this.blocks._MotoInit10111213 =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'PXFrame',
        spec: 'VehicleInitMotoBoard10111213',
        transpilable: false
    };

    this.blocks._MotoInit4567 =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'PXFrame',
        spec: 'VehicleInitMotoBoard4567',
        transpilable: false
    };

    this.blocks._VehicleInit_MotoBoard298N =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'PXFrame',
        spec: 'VehicleInitMotoBoard298N at pinLA %_Pin and pinLB %_Pin and pinLS %_Pin and pinRA %_Pin and pinRB %_Pin pinRS %_Pin',
        defaults: ["4", "5", "6", "7", "8", "9"],
        transpilable: false
    };

    this.blocks._VehicleRun =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'PXFrame',
        spec: 'moto %n run %_dirtype at speed %n',
        defaults: [0, "forward", 255],
        transpilable: false
    };

    this.blocks._VehicleSimpleRun =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'PXFrame',
        spec: 'moto run %_simpledirtype at speed %n',
        defaults: ["go", 255],
        transpilable: false
    };

    this.blocks._VehicleStop =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'PXFrame',
        spec: 'stop motos',
        transpilable: false
    };

    this.blocks._VehicleSpeedEncorderInit =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'PXFrame',
        spec: 'VehicleSpeedEncorderInit at pinLA %_Pin and pinLB %_Pin and pinRA %_Pin and pinRB %_Pin',
        defaults: [2, "A0", 3, "A1"],
        transpilable: false
    };

    this.blocks._VehicleGetSpeed =
    {
        only: SpriteMorph,
        type: 'reporter',
        category: 'PXFrame',
        spec: 'GetSpeed of moto %n',
        defaults: [0],
        transpilable: false
    };

    this.blocks._MP3Init =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'PXFrame',
        spec: 'MP3 init at pinR %_Pin pinT %_Pin',
        defaults: ["7", "8"],
        transpilable: false
    };

    this.blocks._MP3Play =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'PXFrame',
        spec: 'MP3 play',
        transpilable: false
    };

    this.blocks._MP3PlayIndex =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'PXFrame',
        spec: 'MP3 play at index %n',
        defaults: [1],
        transpilable: false
    };

    this.blocks._MP3PlayStop =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'PXFrame',
        spec: 'MP3 stop',
        transpilable: false
    };
    
    this.blocks._MP3SetVolume =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'PXFrame',
        spec: 'MP3 set volume at %n',
        defaults: [25],
        transpilable: false
    };

    this.blocks._MP3Next =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'PXFrame',
        spec: 'MP3 next',
        transpilable: false
    };

    this.blocks._IRInit =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'PXFrame',
        spec: 'infrared recviver init at pin %_Pin',
        defaults: ["7"],
        transpilable: false
    };

    this.blocks._IRSend =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'PXFrame',
        spec: 'infrared send value %n',
        defaults: [100],
        transpilable: false
    };
	
	this.blocks._WeightInit =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'PXFrame',
        spec: 'weight tester %n init at pinOut %_Pin pinClk %_Pin',
        defaults: [0, "7", "8"],
        transpilable: false
    };
	
	this.blocks._WeightTest =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'PXFrame',
        spec: 'test the weight of %n',
        defaults: [0],
        transpilable: false
    };
	
	this.blocks._GetWeight =
    {
        only: SpriteMorph,
        type: 'reporter',
        category: 'PXFrame',
        spec: 'get weight of %n',
		defaults: [0],
        transpilable: false
    };

    // makerclock
    this.blocks._MC_LightInternal =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'MakerClock',
        spec: 'LED internal as %b',
        defaults: [true],
        transpilable: false
    };

    this.blocks._MC_LED =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'MakerClock',
        spec: 'LED %_Pin_mc as %b',
        defaults: ["P_1", true],
        transpilable: false
    };

    this.blocks._MC_Buzzer =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'MakerClock',
        spec: 'Buzzer %_Pin_mc as %b',
        defaults: ["P_1", true],
        transpilable: false
    };

    this.blocks._MC_Segment =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'MakerClock',
        spec: 'LEDSegment %_Pin_mc as %n',
        defaults: ["P_3", 100],
        transpilable: false
    };

    this.blocks._MC_Moto =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'MakerClock',
        spec: 'Moto %_PinMoto_mc as speed %n',
        defaults: ["P_1", 100],
        transpilable: false
    };

    this.blocks._MC_DistTest =
    {
        only: SpriteMorph,
        type: 'command',
        category: 'MakerClock',
        spec: 'UltraSensor %_Pin_mc Get dist',
        defaults: ["P_1"],
        transpilable: false
    };

    this.blocks._MC_GetDist =
    {
        only: SpriteMorph,
        type: 'reporter',
        category: 'MakerClock',
        spec: 'UltraSensor getDist',
        transpilable: false
    };

    this.blocks.receiveGo.transpilable = true;
    this.blocks.receiveMessage.transpilable = true;
    this.blocks.doBroadcastAndWait.transpilable = true;
    this.blocks.doWait.transpilable = true;
    this.blocks.doWaitUntil.transpilable = true;
    this.blocks.doForever.transpilable = true;
    this.blocks.doRepeat.transpilable = true;
    this.blocks.doUntil.transpilable = true;
    this.blocks.doIf.transpilable = true;
    this.blocks.doIfElse.transpilable = true;
    this.blocks.reportSum.transpilable = true;
    this.blocks.reportDifference.transpilable = true;
    this.blocks.reportProduct.transpilable = true;
    this.blocks.reportQuotient.transpilable = true;
    this.blocks.reportModulus.transpilable = true;
    this.blocks.reportRound.transpilable = true;
    this.blocks.reportMonadic.transpilable = true;
    this.blocks.reportRandom.transpilable = true;
    this.blocks.reportLessThan.transpilable = true;
    this.blocks.reportEquals.transpilable = true;
    this.blocks.reportGreaterThan.transpilable = true;
    this.blocks.reportAnd.transpilable = true;
    this.blocks.reportOr.transpilable = true;
    this.blocks.reportNot.transpilable = true;
    this.blocks.reportBoolean.transpilable = true;
    this.blocks.doSetVar.transpilable = true;
    this.blocks.doChangeVar.transpilable = true;
    this.blocks.doDeclareVariables.transpilable = true;

    StageMorph.prototype.codeMappings['delim'] = ',';
    StageMorph.prototype.codeMappings['tempvars_delim'] = ', ';
    StageMorph.prototype.codeMappings['string'] = '"<#1>"';

    StageMorph.prototype.codeMappings['receiveGo'] = 'void setup() {';
    StageMorph.prototype.codeMappings['doBroadcastAndWait'] = '  !call!<#1>();';
    StageMorph.prototype.codeMappings['receiveMessage'] = 'void <#1>() {';

    StageMorph.prototype.codeMappings['doWait'] = '  delay(<#1> * 1000);';
    StageMorph.prototype.codeMappings['doWaitUntil'] = '  while(!<#1>){\n  }\n';
    StageMorph.prototype.codeMappings['doForever'] = '}\n\nvoid loop() {\n  <#1>\n}';
    StageMorph.prototype.codeMappings['doRepeat'] = '  for (int i = 0; i < <#1>; i++) {\n  <#2>\n  }';
    StageMorph.prototype.codeMappings['doUntil'] = '  while(!<#1>){\n  <#2>\n  }';
    StageMorph.prototype.codeMappings['doIf'] = '  if (<#1>) {\n  <#2>\n}';
    StageMorph.prototype.codeMappings['doIfElse'] = '  if (<#1>) {\n  <#2>\n} else {\n  <#3>\n}';

    StageMorph.prototype.codeMappings['reportSum'] = '(<#1> + <#2>)';
    StageMorph.prototype.codeMappings['reportDifference'] = '(<#1> - <#2>)';
    StageMorph.prototype.codeMappings['reportProduct'] = '(<#1> * <#2>)';
    StageMorph.prototype.codeMappings['reportQuotient'] = '(<#1> / <#2>)';
    StageMorph.prototype.codeMappings['reportModulus'] = '(<#1> % <#2>)';
    StageMorph.prototype.codeMappings['reportRound'] = 'round(<#1>)';
    StageMorph.prototype.codeMappings['reportMonadic'] = 'manykit.math(<#1>,<#2>)';
    StageMorph.prototype.codeMappings['reportRandom'] = 'random(<#1>, <#2>+1)';
    StageMorph.prototype.codeMappings['reportLessThan'] = '(<#1> < <#2>)';
    StageMorph.prototype.codeMappings['reportEquals'] = '(<#1> == <#2>)';
    StageMorph.prototype.codeMappings['reportGreaterThan'] = '(<#1> > <#2>)';
    StageMorph.prototype.codeMappings['reportAnd'] = '(<#1> && <#2>)';
    StageMorph.prototype.codeMappings['reportOr'] = '(<#1> || <#2>)';
    StageMorph.prototype.codeMappings['reportNot'] = '!(<#1>)';
    StageMorph.prototype.codeMappings['reportBoolean'] = '<#1>';

    StageMorph.prototype.codeMappings['doSetVar'] = '  <#1> = <#2>;';
    StageMorph.prototype.codeMappings['doChangeVar'] = '  <#1> += <#2>;';
    StageMorph.prototype.codeMappings['doDeclareVariables'] = 'int <#1> = 0;'; // How do we deal with types? Damn types...

    // Arduino
    StageMorph.prototype.codeMappings['pinMode'] = 'pinMode(<#1>, <#2>);';
    StageMorph.prototype.codeMappings['digitalWrite'] = 'digitalWrite(<#1>, <#2>);';
    StageMorph.prototype.codeMappings['pwmWrite'] = 'analogWrite(<#1>, <#2>);';
    StageMorph.prototype.codeMappings['digitalRead'] = 'digitalRead(<#1>)';

    StageMorph.prototype.codeMappings['analogWrite'] = 'analogWrite(<#1>, <#2>);';
    StageMorph.prototype.codeMappings['analogRead'] = 'analogRead(<#1>)';

    StageMorph.prototype.codeMappings['servoInit'] = 'servoInit(<#1>, <#2>);';
    StageMorph.prototype.codeMappings['servoWrite'] = 'servoWrite(<#1>, <#2>);';
    
    StageMorph.prototype.codeMappings['ultrasonicInit'] = 'ultrasonicInit(<#1>, <#2>);';
    StageMorph.prototype.codeMappings['ultrasonicMeasure'] = 'ultrasonicMeasure()';
    
    // PXFrame
    //StageMorph.prototype.codeMappings['_GetServerMessage'] = 'manykit._GetServerMessage();';
    //StageMorph.prototype.codeMappings['_DistTest'] = 'manykit._DistTest();';
    
    StageMorph.prototype.codeMappings['_MotoInit4567'] = 'manykit._MotoInit4567();';
    StageMorph.prototype.codeMappings['_MotoInit10111213'] = 'manykit._MotoInit10111213();';
	StageMorph.prototype.codeMappings['_VehicleRun'] = 'manykit._VehicleRun(<#1>, <#2>, <#3>);';
	StageMorph.prototype.codeMappings['_VehicleSimpleRun'] = 'manykit._VehicleSimpleRun(<#1>, <#2>);';
    StageMorph.prototype.codeMappings['_VehicleStop'] = 'manykit._VehicleStop();';
    StageMorph.prototype.codeMappings['_VehicleSpeedEncorderInit'] = 'manykit._VehicleSpeedEncorderInit(<#1>, <#2>, <#3>, <#4>);';
    StageMorph.prototype.codeMappings['_VehicleGetSpeed'] = 'manykit._VehicleGetSpeed(<#1>)';

    StageMorph.prototype.codeMappings['_MP3Init'] = 'manykit._MP3Init(<#1>, <#2>);';
    StageMorph.prototype.codeMappings['_MP3Play'] = 'manykit._MP3Play();';
    StageMorph.prototype.codeMappings['_MP3PlayIndex'] = 'manykit._MP3PlayIndex(<#1>);';
    StageMorph.prototype.codeMappings['_MP3PlayStop'] = 'manykit._MP3PlayStop();';
    StageMorph.prototype.codeMappings['_MP3SetVolume'] = 'manykit._MP3SetVolume(<#1>);';
    StageMorph.prototype.codeMappings['_MP3Next'] = 'manykit._MP3Next();';

    StageMorph.prototype.codeMappings['_WeightInit'] = 'manykit._WeightInit(<#1>, <#2>, <#3>);';
    StageMorph.prototype.codeMappings['_WeightTest'] = 'manykit._WeightTest(<#1>);';
	StageMorph.prototype.codeMappings['_GetWeight'] = 'manykit._GetWeight(<#1>)';

    StageMorph.prototype.codeMappings['_IRInit'] = 'manykit._IRInit(<#1>);';
    StageMorph.prototype.codeMappings['_IRSend'] = 'manykit._IRSend(<#1>);';

    StageMorph.prototype.codeMappings['_MC_LightInternal'] = 'manykit._MC_LightInternal(<#1>);';
    StageMorph.prototype.codeMappings['_MC_LED'] = 'manykit._MC_LED(<#1>, <#2>);';
    StageMorph.prototype.codeMappings['_MC_Buzzer'] = 'manykit._MC_Buzzer(<#1>, <#2>);';
    StageMorph.prototype.codeMappings['_MC_Segment'] = 'manykit._MC_Segment(<#1>, <#2>);';
    StageMorph.prototype.codeMappings['_MC_DistTest'] = 'manykit._MC_DistTest(<#1>);';
    StageMorph.prototype.codeMappings['_MC_GetDist'] = 'manykit._MC_GetDist()';
}

SpriteMorph.prototype.initBlocks =  function() {
    this.originalInitBlocks();
    this.initArduinoBlocks();
    this.initPXFrameBlocks();
};

SpriteMorph.prototype.initBlocks();

SpriteMorph.prototype.originalBlockTemplates = SpriteMorph.prototype.blockTemplates;
SpriteMorph.prototype.blockTemplates = function (category) {
    var myself = this,
        blocks = myself.originalBlockTemplates(category); 
		
	function blockBySelector (selector) {
        if (StageMorph.prototype.hiddenPrimitives[selector]) {
            return null;
        }
        var newBlock = SpriteMorph.prototype.blockForSelector(selector, true);
        newBlock.isTemplate = true;
        return newBlock;
    };

    //  Button that triggers a connection attempt 
    this.arduinoConnectPXLauncher = new PushButtonMorph(
        null,
        function () {
            myself.arduino.attemptConnectPXLauncher();
        },
        'Connect PXLauncher'
        );

    this.arduinoDisConnectPXLauncher = new PushButtonMorph(
        null,
        function () {
            myself.arduino.attemptDisConnectPXLauncher();
        },
        'DisConnect PXLauncher'
        );

    this.arduinoConnectButton = new PushButtonMorph(
            null,
            function () {
                myself.arduino.attemptConnection();
            },
            'Connect Arduino'
            );
    
    this.arduinoConnectWifiButton = new PushButtonMorph(
        null,
        function () {
            myself.arduino.attemptWifiConnection();
        },
        'Connect Arduino Wifi'
    );

    //  Button that triggers a disconnection from board
    this.arduinoDisconnectButton = new PushButtonMorph(
            null,
            function () {
                myself.arduino.disconnect();
            },
            'Disconnect Arduino'
            );
    
    if (category == 'Arduino')
    {
        blocks.push(this.arduinoConnectButton);
        blocks.push(this.arduinoConnectWifiButton);
        blocks.push(this.arduinoDisconnectButton);
        blocks.push('-'); 
        blocks.push(blockBySelector('pinMode'));
        blocks.push(blockBySelector('digitalWrite'));
        blocks.push(blockBySelector('pwmWrite'));
        blocks.push(blockBySelector('digitalRead'));
        blocks.push('-'); 
		blocks.push(blockBySelector('analogWrite'));
        blocks.push(blockBySelector('analogRead'));
        blocks.push('-'); 
        blocks.push(blockBySelector('servoInit'));
        blocks.push(blockBySelector('servoWrite'));
        blocks.push('-'); 
        blocks.push(blockBySelector('ultrasonicInit'));
        blocks.push(blockBySelector('ultrasonicMeasure'));
    }
    
    if (category === 'PXFrame') {
        //blocks.push(this.arduinoConnectPXLauncher);
        //blocks.push(this.arduinoDisConnectPXLauncher);
        //blocks.push('-'); 
        //blocks.push(blockBySelector('_GetServerMessage'));
		//blocks.push('-');
		//blocks.push(blockBySelector('_DistTest'));	
        //blocks.push('-');
        blocks.push(blockBySelector('_MotoInit4567'));
        blocks.push(blockBySelector('_MotoInit10111213'));
        blocks.push(blockBySelector('_VehicleInit_MotoBoard298N'));
		blocks.push(blockBySelector('_VehicleRun'));
		blocks.push(blockBySelector('_VehicleSimpleRun'));
        blocks.push(blockBySelector('_VehicleStop'));
        blocks.push(blockBySelector('_VehicleSpeedEncorderInit'));
        blocks.push(blockBySelector('_VehicleGetSpeed'));
        blocks.push('-');
        blocks.push(blockBySelector('_MP3Init'));
        blocks.push(blockBySelector('_MP3Play'));
        blocks.push(blockBySelector('_MP3PlayIndex'));
        blocks.push(blockBySelector('_MP3PlayStop'));
        blocks.push(blockBySelector('_MP3SetVolume'));
        blocks.push(blockBySelector('_MP3Next'));
		blocks.push('-');
		blocks.push(blockBySelector('_WeightInit'));
        blocks.push(blockBySelector('_WeightTest'));
		blocks.push(blockBySelector('_GetWeight'));
        blocks.push('-');
        blocks.push(blockBySelector('_IRInit'));
        blocks.push(blockBySelector('_IRSend'));
    }

    if (category === 'MakerClock') {
        blocks.push(this.arduinoConnectPXLauncher);
        blocks.push(this.arduinoDisConnectPXLauncher);
        blocks.push('-');
        blocks.push(this.arduinoConnectButton);
        blocks.push(this.arduinoConnectWifiButton);
        blocks.push(this.arduinoDisconnectButton);
        blocks.push('-');
        blocks.push(blockBySelector('_MC_LightInternal'));
        blocks.push(blockBySelector('_MC_LED'));
        blocks.push(blockBySelector('_MC_Buzzer'));
        blocks.push(blockBySelector('_MC_Segment'));
        blocks.push(blockBySelector('_MC_Moto'));
        blocks.push(blockBySelector('_MC_DistTest'));
        blocks.push(blockBySelector('_MC_GetDist'));   
    }

    return blocks;
};

// Removing 'other' blocks from 'variables' category
SpriteMorph.prototype.freshPalette = function (category) {
    var palette = new ScrollFrameMorph(null, null, this.sliderColor),
        unit = SyntaxElementMorph.prototype.fontSize,
        x = 0,
        y = 5,
        ry = 0,
        blocks,
        hideNextSpace = false,
        myself = this,
        stage = this.parentThatIsA(StageMorph),
        oldFlag = Morph.prototype.trackChanges,
        shade = new Color(140, 140, 140),
        searchButton,
        makeButton;

    Morph.prototype.trackChanges = false;

    palette.owner = this;
    palette.padding = unit / 2;
    palette.color = this.paletteColor;
    palette.growth = new Point(0, MorphicPreferences.scrollBarSize);

    // toolbar:
    
    palette.toolBar = new AlignmentMorph('column');

    searchButton = new PushButtonMorph(
        this,
        "searchBlocks",
        new SymbolMorph("magnifierOutline", 16)
    );
    searchButton.alpha = 0.2;
    searchButton.padding = 1;
    searchButton.hint = localize('find blocks') + '...';
    searchButton.labelShadowColor = shade;
    searchButton.drawNew();
    searchButton.fixLayout();
	palette.toolBar.add(searchButton);

    makeButton = new PushButtonMorph(
        this,
        "makeBlock",
        new SymbolMorph("cross", 16)
    );
    makeButton.alpha = 0.2;
    makeButton.padding = 1;
    makeButton.hint = localize('Make a block') + '...';
    makeButton.labelShadowColor = shade;
    makeButton.drawNew();
    makeButton.fixLayout();
    palette.toolBar.add(makeButton);

	palette.toolBar.fixLayout();
    palette.add(palette.toolBar);

    // menu:
    palette.userMenu = function () {
        var menu = new MenuMorph(),
            ide = this.parentThatIsA(IDE_Morph),
            more = {
                operators:
                    ['reifyScript', 'reifyReporter', 'reifyPredicate'],
                control:
                    ['doWarp'],
                variables:
                    [
                        'doDeclareVariables',
                        'reportNewList',
                        'reportCONS',
                        'reportListItem',
                        'reportCDR',
                        'reportListLength',
                        'reportListContainsItem',
                        'doAddToList',
                        'doDeleteFromList',
                        'doInsertInList',
                        'doReplaceInList'
                    ]
            };

        function hasHiddenPrimitives() {
            var defs = SpriteMorph.prototype.blocks,
                hiddens = StageMorph.prototype.hiddenPrimitives;
            return Object.keys(hiddens).some(function (any) {
                return !isNil(defs[any]) && (defs[any].category === category
                    || contains((more[category] || []), any));
            });
        }

        function canHidePrimitives() {
            return palette.contents.children.some(function (any) {
                return contains(
                    Object.keys(SpriteMorph.prototype.blocks),
                    any.selector
                );
            });
        }

        menu.addPair(
            [
                new SymbolMorph(
                    'magnifyingGlass',
                    MorphicPreferences.menuFontSize
                ),
                localize('find blocks') + '...'
            ],
            function () {myself.searchBlocks(); },
            '^F'
        );
        if (canHidePrimitives()) {
            menu.addItem(
                'hide primitives',
                function () {
                    var defs = SpriteMorph.prototype.blocks;
                    Object.keys(defs).forEach(function (sel) {
                        if (defs[sel].category === category) {
                            StageMorph.prototype.hiddenPrimitives[sel] = true;
                        }
                    });
                    (more[category] || []).forEach(function (sel) {
                        StageMorph.prototype.hiddenPrimitives[sel] = true;
                    });
                    ide.flushBlocksCache(category);
                    ide.refreshPalette();
                }
            );
        }
        if (hasHiddenPrimitives()) {
            menu.addItem(
                'show primitives',
                function () {
                    var hiddens = StageMorph.prototype.hiddenPrimitives,
                        defs = SpriteMorph.prototype.blocks;
                    Object.keys(hiddens).forEach(function (sel) {
                        if (defs[sel] && (defs[sel].category === category)) {
                            delete StageMorph.prototype.hiddenPrimitives[sel];
                        }
                    });
                    (more[category] || []).forEach(function (sel) {
                        delete StageMorph.prototype.hiddenPrimitives[sel];
                    });
                    ide.flushBlocksCache(category);
                    ide.refreshPalette();
                }
            );
        }
        return menu;
    };

    // primitives:

    blocks = this.blocksCache[category];
    if (!blocks) {
        blocks = this.blockTemplates(category);
        if (this.isCachingPrimitives) {
            this.blocksCache[category] = blocks;
        }
    }

    blocks.forEach(function (block) {
        if (block === null) {
            return;
        }
        if (block === '-') {
            if (hideNextSpace) {return; }
            y += unit * 0.8;
            hideNextSpace = true;
        } else if (block === '=') {
            if (hideNextSpace) {return; }
            y += unit * 1.6;
            hideNextSpace = true;
        } else if (block === '#') {
            x = 0;
            y = ry;
        } else {
            hideNextSpace = false;
            if (x === 0) {
                y += unit * 0.3;
            }
            block.setPosition(new Point(x, y));
            palette.addContents(block);
            if (block instanceof ToggleMorph
                    || (block instanceof RingMorph)) {
                x = block.right() + unit / 2;
                ry = block.bottom();
            } else {
                // if (block.fixLayout) {block.fixLayout(); }
                x = 0;
                y += block.height();
            }
        }
    });

    // global custom blocks:

    if (stage) {
        y += unit * 1.6;

        stage.globalBlocks.forEach(function (definition) {
            var block;
            if (definition.category === category ||
                    (category === 'variables'
                        && contains(
                            ['lists'],
                            definition.category
                        ))) {
                block = definition.templateInstance();
                y += unit * 0.3;
                block.setPosition(new Point(x, y));
                palette.addContents(block);
                x = 0;
                y += block.height();
            }
        });
    }

    // local custom blocks:

    y += unit * 1.6;
    this.customBlocks.forEach(function (definition) {
        var block;
        if (definition.category === category ||
                (category === 'variables'
                    && contains(
                        ['lists'],
                        definition.category
                    ))) {
            block = definition.templateInstance();
            y += unit * 0.3;
            block.setPosition(new Point(x, y));
            palette.addContents(block);
            x = 0;
            y += block.height();
        }
    });

    // inherited custom blocks:

    // y += unit * 1.6;
    if (this.exemplar) {
        this.inheritedBlocks(true).forEach(function (definition) {
            var block;
            if (definition.category === category ||
                    (category === 'variables'
                        && contains(
                            ['lists'],
                            definition.category
                        ))) {
                block = definition.templateInstance();
                y += unit * 0.3;
                block.setPosition(new Point(x, y));
                palette.addContents(block);
                block.ghost();
                x = 0;
                y += block.height();
            }
        });
    }

    //layout

    palette.scrollX(palette.padding);
    palette.scrollY(palette.padding);

    Morph.prototype.trackChanges = oldFlag;
    return palette;
};


// List exporting
WatcherMorph.prototype.originalUserMenu = WatcherMorph.prototype.userMenu;
WatcherMorph.prototype.userMenu = function () {
    var menu = this.originalUserMenu(),
        submenu;
    if (this.target instanceof VariableFrame && this.currentValue instanceof List) {
        subMenu = new MenuMorph(this.currentValue);
        if (!this.currentValue.contents.some(
                function (any) {
                    return any instanceof List;
                })) {
            subMenu.addItem('Plain text', this.valueExporter('plain'));
        }
        subMenu.addItem('JSON', this.valueExporter('json'));
        subMenu.addItem('XML', this.valueExporter('xml'));
        subMenu.addItem('CSV', this.valueExporter('csv'));
        menu.addMenu('export...', subMenu);

    }
    return menu;
};

WatcherMorph.prototype.valueExporter = function (format) {
    var myself = this,
        value = this.currentValue,
        contents,
        format = format || 'plain',
        ide = myself.parentThatIsA(IDE_Morph);

    return function () {
        switch (format) {
            case 'plain':
                contents = value instanceof List ? 
                    value.asArray().join('\n') : 
                    value.toString();
                break;
            case 'json':
                contents = JSON.stringify(value);
                break;
            case 'xml':
                contents = ide.serializer.serialize(value);
                break;
            case 'csv':
                try {
                    contents = value.toCSV();
                } catch (err) {
                    if (Process.prototype.isCatchingErrors) {
                        ide.showMessage('List cannot be converted into CSV', 2);
                    } else {
                        throw err;
                    }
                    return;
                }
                break;
        }

        ide.saveFileAs(
            contents,
            'text/' + format + ';charset=utf-8',
            myself.getter // variable name
            );
    };
};
