// arduino.js

unique = function (anArray) {
    return anArray.filter(function (elem, pos) { 
        return anArray.indexOf(elem) == pos; 
    });
};

WorldMorph.prototype.Arduino = Arduino;

// Arduino prototype
function Arduino (owner) {
    this.owner = owner;
    this.board = undefined;
    this.connecting = false;
    this.disconnecting = false;
    this.justConnected = false;
    this.keepAliveIntervalID = null;
};

// This should belong to the IDE
Arduino.prototype.showMessage = function (msg) {
    if (!this.message) { this.message = new DialogBoxMorph() };

    var txt = new TextMorph(
            msg,
            this.fontSize,
            this.fontStyle,
            true,
            false,
            'center',
            null,
            null,
            MorphicPreferences.isFlat ? null : new Point(1, 1),
            new Color(255, 255, 255)
            );

    if (!this.message.key) { this.message.key = 'message' + this.owner.name + msg };

    this.message.labelString = this.owner.name;
    this.message.createLabel();
    if (msg) { this.message.addBody(txt) };
    this.message.drawNew();
    this.message.fixLayout();
    this.message.popUp(world);
    this.message.show();
};

Arduino.prototype.hideMessage = function () {
    if (this.message) {
        this.message.cancel();
        this.message = null;
    }
};

Arduino.prototype.attemptConnectPXLauncher = function()
{
}

Arduino.prototype.attemptDisConnectPXLauncher = function()
{
}

Arduino.prototype.attemptConnection = function () {
    var myself = this;

    if (this.justConnected) {
        this.justConnected = undefined;
        return;
    }

    if (!this.connecting) {
        if (this.board === undefined) 
        {
            // Get list of ports (Arduino compatible)
            var ports = world.Arduino.getSerialPorts(function (ports)
            {
                var portMenu = new MenuMorph(this, 'select a port');
                if (Object.keys(ports).length >= 1)
                {
                    Object.keys(ports).forEach(function (each) {
                        portMenu.addItem(each, function () {
                            myself.connect(each);
                        })
                    });
                }
                portMenu.popUpAtHand(world);
            });
        }
         else 
        {
            ide.inform(myself.name, localize('There is already a board connected to this sprite'));
        }
    }
};

Arduino.prototype.attemptWifiConnection = function () {
    var myself = this;

    if (this.justConnected) {
        this.justConnected = undefined;
        return;
    }

    if (!this.connecting) {
        if (this.board === undefined) {
            myself.connectWifi();
        }
        else {
            ide.inform(myself.name, localize('There is already a board connected to this sprite'));
        }
    }
};

Arduino.prototype.closeHandler = function (silent) {

    var portName = 'unknown';

    clearInterval(this.keepAliveIntervalID);

    if (this.board) 
    {
        portName = this.board.sp.path;

        this.board.sp.removeAllListeners();
        this.board.sp = undefined;

        this.board = undefined;
    };

    Arduino.unlockPort(this.port);
    this.connecting = false;
    this.disconnecting = false;
    this.justConnected = false;

    if (this.gotUnplugged & !silent) {
        ide.inform(
                this.owner.name,
                localize('Board was disconnected from port\n') 
                + portName 
                + '\n\nIt seems that someone pulled the cable!');
        this.gotUnplugged = false;
    } else if (!silent) {
        ide.inform(this.owner.name, localize('Board was disconnected from port\n') + portName);
    }
};

Arduino.prototype.connect = function (port) {
    var myself = this;
    this.disconnect();

    this.showMessage(localize('Connecting board at port\n') + port);
    this.connecting = true;

    var cntStr = "connect_" + port;
    Arduino.prototype.getURL('device', cntStr, function (ret) 
    {
        if ("suc" == ret)
        {
            world.Arduino.lockPort(port);
            myself.port = port;
            myself.connecting = false;
            myself.justConnected = true;

            myself.hideMessage();
            ide.inform(myself.owner.name, localize('An board has been connected. Happy prototyping!'));
        }
        else if ("failed" == ret)
        {     
            //myself.board = null;
            myself.connecting = false;
            myself.hideMessage();
            ide.inform(
                    myself.owner.name,
                    localize('Could not talk to board in port\n')
                    + port + '\n\n' + localize('Check if PHOENIXFrameFirewall is loaded.')
                    );
        }
    });
};

Arduino.prototype.connectWifi = function () {
    var myself = this;
    this.disconnect();

    this.showMessage(localize('Connecting board\n'));
    this.connecting = true;

    var cntStr = "connectwifi_";
    Arduino.prototype.getURL('device', cntStr, function (ret) {
        if ("suc" == ret) {
            world.Arduino.lockPort(1);
            myself.port = 1;
            myself.connecting = false;
            myself.justConnected = true;

            myself.hideMessage();
            ide.inform(myself.owner.name, localize('An board has been connected. Happy prototyping!'));
        }
        else if ("failed" == ret) {
            //myself.board = null;
            myself.connecting = false;
            myself.hideMessage();
            ide.inform(
                myself.owner.name,
                localize('Could not talk to board\n') + localize('Check if PHOENIXFrameFirewall is loaded.')
            );
        }
    }); 
};

Arduino.prototype.disconnect = function () 
{
    var myself = this;
    if (!myself.justConnected)
    {
        Arduino.unlockAllPort();
        //Arduino.unlockPort(myself.port);
        myself.connecting = false;
        myself.disconnecting = false;
        myself.justConnected = false;

        return;
    }

    var cntStr = "disconnect";
    Arduino.prototype.getURL('device', cntStr, function (ret) 
    {
        if ("suc" == ret)
        {
			Arduino.unlockAllPort();
            //Arduino.unlockPort(myself.port);
            myself.connecting = false;
            myself.disconnecting = false;
            myself.justConnected = false;
        }
        else if ("failed" == ret)
        {     
        }
    });
};

Arduino.prototype.isBoardReady = function () {
    var myself = this;
    return myself.justConnected;
};

Arduino.prototype.pinsSettableToMode = function (aMode) {
    // Retrieve a list of pins that support a particular mode
    var myself = this,
        pinNumbers = {};

    this.board.pins.forEach(
        function (each) { 
            if (each.supportedModes.indexOf(aMode) > -1) { 
                var number = myself.board.pins.indexOf(each).toString(); 
                pinNumbers[number] = number;
            }
        }
    );

    return pinNumbers;
};

Arduino.portList = [];
Arduino.usedPorts = [];

Arduino.lockPort = function (port) {
    var usedPorts = this.usedPorts;

    if (usedPorts.indexOf(port) === -1) {
        usedPorts.push(port);
    }
};

Arduino.unlockPort = function (port) {
    var usedPorts = this.usedPorts;

    if (usedPorts.indexOf(port) > -1) {
        usedPorts.splice(usedPorts.indexOf(port));
    }
};

Arduino.unlockAllPort = function () {
    this.usedPorts = [];
};

Arduino.isPortLocked = function (port) {
    return (this.usedPorts.indexOf(port) > -1);
};

Arduino.getSerialPorts = function (callback) {
    /*
    var myself = this,
        portList = [],
        portcheck = /usb|DevB|rfcomm|acm|^com/i; // Not sure about rfcomm! We must dig further how bluetooth works in Gnu/Linux

    chrome.serial.getDevices(function (devices) { 
        if (devices) { 
            devices.forEach(function (device) { 
                if (!myself.isPortLocked(device.path) && portcheck.test(device.path)) {
                    portList[device.path] = device.path; 
                }
            });
        }
        callback(portList);
    })
    */
    
    var myself = this,
    portList = [],
    portcheck = /usb|DevB|rfcomm|acm|^com/i;

    Arduino.prototype.getURL('device', "list", function (txt) 
    {
        var textStr = txt
        var strs = new Array(); //定义一数组 
        strs = textStr.split("_");

        strs.forEach(function (device){ 
         if (!myself.isPortLocked(device) && portcheck.test(device)) {
               portList[device] = device; 
            }
        });

        callback(portList);
    });
    
};

Arduino.prototype.getURL = function (cmd, code, callback) {
    var url = "http://127.0.0.1:8389/";
    var method = "GET";
    var myself = this;

    // You REALLY want async = true.
    // Otherwise, it'll block ALL execution waiting for server response.
    var async = false;

    var request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState != 4) {
            return;
        }

        var status = parseInt(request.status); // HTTP response status, e.g., 200 for "200 OK"
        var errorInfo = null;
        switch (status) {
            case 200:
                if (null != callback) {
                    callback.call(myself, request.responseText);
                }
                break;
            case 0:
                errorInfo = "code 0\n\nCould not connect to server at " + url + ".  Is the local web server running?";
                break;
            case 400:
                errorInfo = "code 400\n\nBuild failed - probably due to invalid source code.  Make sure that there are no missing connections in the blocks.";
                break;
            case 500:
                errorInfo = "code 500\n\nUpload failed.  Is the Arduino connected to USB port?";
                break;
            case 501:
                errorInfo = "code 501\n\nUpload failed.  Is 'ino' installed and in your path?  This only works on Mac OS X and Linux at this time.";
                break;
            default:
                errorInfo = "code " + status + "\n\nUnknown error.";
                break;
        };
    };

    request.open(method, url + "?" + BASE64.encode(cmd + "$" + code), async);
    request.send();

    if (!async) {
        if (request.status === 200) {
            return request.responseText;
        }
        throw new Error('unable to retrieve ' + url);
    }
}

Arduino.headerMessage =
    '/*arduino manykit */'
    + '\n'
    + '#include <Servo.h>\n'
    + '#define NUMSERVOS 6\n'
    + 'Servo servos[NUMSERVOS];\n'
    + 'int trig, echo;\n';

Arduino.processBroadcasts = function (hatBlocks) {
    var myself = this,
        fullCode = '\n';
    
    hatBlocks.forEach(function (each) {
        fullCode += myself.processBroadcast(each);
    });

    return fullCode;
};

Arduino.processBroadcast = function (hatBlock, body) {
    var code = hatBlock.mappedCode().replace(/void "(.*)"\(\) {/g, 'void $1() {') + '\n}\n\n';
    return code;
};

Arduino.transpile = function (body, hatBlocks) {
    var header = '',
        setupHeader = '',
        broadcasts = '',
        assignments = '';

    // First of all, let's deal with possible broadcasts
    if (body.indexOf('!call!') > 0) {
        // Message names are now function names, not strings
        body = body.replace(/!call!"(.*)"/g, '$1');
        broadcasts = this.processBroadcasts(hatBlocks, body);
        broadcasts = this.replaceStr(broadcasts);
    }

    header += '\n';

    varLines = body.match(/int .* = 0;\n/g) || [];
    body = body.replace(/int .* = 0;\n/g, '');
    varLines.forEach(function (each) {
        assignments += each + '\n';
    });

    body = assignments + '\n' + body;

    // adding setupHeader right after "void setup() {"
    setupHeader += '\n'
    + ' Serial.begin(9600);\n'

    body = body.replace('void setup() {', '$&' + setupHeader);
    body = this.replaceStr(body);

    // If there's no loop function, we need to add an empty one
    if (body.indexOf('void loop()') < 0) {
        body += '\n}\n\nvoid loop() {}\n';
    }

    return this.headerMessage + header + this.ManyKitfunctions + body + broadcasts;
};

Arduino.replaceStr = function (str) {
    // str = str.replace('OUTPUT', 'OUTPUT');
    // str = str.replace('INPUT', 'INPUT');
    // str = str.replace('HIGH', 'HIGH');
    // str = str.replace('LOW', 'LOW');

    // str = str.replace('manykit.pinMode', 'pinMode');
    // str = str.replace('manykit.digitalWrite', 'digitalWrite');
    // str = str.replace('manykit.pwmWrite', 'pwmWrite');
    // str = str.replace('manykit.analogWrite', 'analogWrite');
    // str = str.replace('manykit.digitalRead', 'digitalRead');
    // str = str.replace('manykit.analogRead', 'analogRead');
    // str = str.replace('manykit.servoInit', 'servoInit');
    // str = str.replace('manykit.servoWrite', 'servoWrite');
    // str = str.replace('manykit.ultrasonicInit', 'ultrasonicInit');
    // str = str.replace('manykit.ultrasonicMeasure', 'ultrasonicMeasure');

    return str;
}

Arduino.ManyKitfunctions =
'void servoInit(int i, int pin) {\n'
+ '  if (0 <= i && i < NUMSERVOS)\n'
+ '    servos[i].attach(pin);\n'
+ '}\n'
+ 'void servoWrite(int i, int val) {\n'
+ '  if (0 <= i && i < NUMSERVOS)\n'
+ '    servos[i].write(val);\n'
+ '}\n'
+ 'void ultrasonicInit(int trig_pin, int echo_pin){\n'
+ '  trig = trig_pin;\n'
+ '  echo = echo_pin;\n'
+ '  pinMode(trig, OUTPUT);\n'
+ '  pinMode(echo, INPUT);\n'
+ '}\n'
+ 'int ultrasonicMeasure(){\n'
+ '  double speed = 0.034;\n'
+ '  digitalWrite(trig, LOW);\n'
+ '  delayMicroseconds(2);\n'
+ '  digitalWrite(trig, HIGH);\n'
+ '  delayMicroseconds(10);\n'
+ '  digitalWrite(trig, LOW);\n'
+ '  return speed * pulseIn(echo, HIGH) / 2;\n'
+ '}\n'
+ '\n';