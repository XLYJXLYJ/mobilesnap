// threads.js

/*
	"50", //OT_TOGET_NETID
	"51", //OT_RETRUN_NETID
	"0",  //OT_PM
	"1",  //OT_DW
	"2",  //OT_AW
	"3",  //OT_RETURN_DR
	"4",  //OT_RETURN_AR
	"5",  //OT_SVR_I
	"6",  //OT_SVR_W
	"7",  //OT_DST_I
	"8",  //OT_DST_T
	"9",  //OT_RETURN_DIST
	"10", //OT_MOTO_I
	"11", //OT_MOTO_RUN
	"12", //OT_MOTO_RUNSIMPLE
	"13", //OT_MOTO_STOP
	"14", //OT_MOTO_I_SPD
	"15", //OT_RETURN_MOTOSPD
	"16", //OT_MOTO_I_DRIVER4567
	"17", //OT_MOTO_I_DRIVER298N
	"18", //OT_MP3_INIT
	"19", //OT_MP3_PLAY
	"20", //OT_MP3_INDEX
	"21", //OT_MP3_NEXT
	"22", //OT_MP3_STOP
	"23", //OT_MP3_VOLUME
	"24", //OT_IR_INIT
	"25", //OT_IR_SEND
	"26"  //OT_RETURN_IR
	"27" //OT_HX711_I
	"28" //OT_HX711_TEST
	"29" //OT_RETURN_HX711
	"500" //OT_INTERNAL_LIGHT
	"501" //OT_LIGHT
	"502" //OT_SEGMENT
*/

// PXFrame
// has massage to tell me
Process.prototype._GetServerMessage = function (pin) {
    var sprite = this.homeContext.receiver;

	return Arduino.prototype.getURL('phoenix', "777", null);
};

// gpio
Process.prototype.pinMode = function (pin, mode) {
    var sprite = this.homeContext.receiver;
	
	if (sprite.arduino.isBoardReady()) {
		// OT_PM
        var cntStr = "0" + "," + pin + "," + mode;        
		Arduino.prototype.getURL('arduino', cntStr, null);
    }
	else {
        throw new Error(localize('PHOENIXFrame Arduino board not connected'));	
    }
};

Process.prototype.digitalWrite = function (pin, val) {
    var sprite = this.homeContext.receiver;

	if (sprite.arduino.isBoardReady()) {
		// OT_DW
		var cntStr = "1" + "," + pin + "," + val;        
		Arduino.prototype.getURL('arduino', cntStr, null);
    } 
    else {
        throw new Error(localize('PHOENIXFrame Arduino board not connected'));	
    }
};

Process.prototype.pwmWrite = function (pin, val) {
    var sprite = this.homeContext.receiver;

	if (sprite.arduino.isBoardReady()) {
		// OT_AW
		var cntStr = "2" + "," + pin + "," + val;        
		Arduino.prototype.getURL('arduino', cntStr, null);
    } 
	else {
        throw new Error(localize('PHOENIXFrame Arduino board not connected'));	
    }
};

Process.prototype.analogWrite = function (pin, val) {
    var sprite = this.homeContext.receiver;

	if (sprite.arduino.isBoardReady()) {
		// OT_AW
		var cntStr = "2" + "," + pin + "," + val;        
		Arduino.prototype.getURL('arduino', cntStr, null);
    } 
	else {
        throw new Error(localize('PHOENIXFrame Arduino board not connected'));	
    }
};

Process.prototype.digitalRead = function (pin) {
    var sprite = this.homeContext.receiver;

	if (sprite.arduino.isBoardReady()) {
		// "OT_RETURN_DR
		var cntStr = "3" + "," + pin;        
		return Arduino.prototype.getURL('arduino', cntStr, null);
    } 
	else {
        throw new Error(localize('PHOENIXFrame Arduino board not connected'));	
    }
};

Process.prototype.analogRead = function (pin) {
    var sprite = this.homeContext.receiver;

	if (sprite.arduino.isBoardReady()) {
		// OT_RETURN_AR
		var cntStr = "4" + "," + pin;        
		return Arduino.prototype.getURL('arduino', cntStr, null);
    } 
	else {
        throw new Error(localize('PHOENIXFrame Arduino board not connected'));	
    }
};

// server
Process.prototype.servoInit = function (index, pin) {
    var sprite = this.homeContext.receiver;

	if (sprite.arduino.isBoardReady()) {
		// OT_SVR_I
		var cntStr = "5" + "," + index + "," + pin;        
		Arduino.prototype.getURL('arduino', cntStr, null);
    } 
	else {
        throw new Error(localize('PHOENIXFrame Arduino board not connected'));	
    }	
};

Process.prototype.servoWrite = function (index, val) {
    var sprite = this.homeContext.receiver;
	
	if (sprite.arduino.isBoardReady()) {
		// OT_SVR_W
		var cntStr = "6" + "," + index + "," + val;        
		Arduino.prototype.getURL('arduino', cntStr, null);
    } 
	else {
        throw new Error(localize('PHOENIXFrame Arduino board not connected'));	
    }	
};

// dist
Process.prototype.ultrasonicInit = function (pin, pin1) {
    var sprite = this.homeContext.receiver;
	
	if (sprite.arduino.isBoardReady()) {
		// OT_DST_I
		var cntStr = "7" + "," + pin + "," + pin1;        
		Arduino.prototype.getURL('arduino', cntStr, null);
    } 
	else {
        throw new Error(localize('PHOENIXFrame Arduino board not connected'));	
    }	
};

Process.prototype._DistTest = function () {
    var sprite = this.homeContext.receiver;
	
	if (sprite.arduino.isBoardReady()) {
		// OT_DST_T
		var cntStr = "8";        
		Arduino.prototype.getURL('arduino', cntStr, null);
    } 
	else {
        throw new Error(localize('PHOENIXFrame Arduino board not connected'));	
    }	
};

Process.prototype.ultrasonicMeasure = function () {
    var sprite = this.homeContext.receiver;
	
	if (sprite.arduino.isBoardReady()) {
		// OT_RETURN_DIST
		var cntStr = "9";        
		return Arduino.prototype.getURL('arduino', cntStr, null);
    } 
	else {
        throw new Error(localize('PHOENIXFrame Arduino board not connected'));	
    }	
};

Process.prototype._MotoInit10111213 = function () {
    var sprite = this.homeContext.receiver;
	
	if (sprite.arduino.isBoardReady()) {
		// OT_MOTO_I
		var cntStr = "10";
		Arduino.prototype.getURL('arduino', cntStr, null);
    } 
	else {
        throw new Error(localize('PHOENIXFrame Arduino board not connected'));	
    }	
};

Process.prototype._VehicleRun = function (index, dir, speed) {
    var sprite = this.homeContext.receiver;
	
	if (sprite.arduino.isBoardReady()) {
		// OT_MOTO_RUN
		var cntStr = "11" + "," + index + "," + dir + "," + speed; 				
		Arduino.prototype.getURL('arduino', cntStr, null);
    } 
	else {
        throw new Error(localize('PHOENIXFrame Arduino board not connected'));	
    }	
};

Process.prototype._VehicleSimpleRun = function (dir, speed) {
    var sprite = this.homeContext.receiver;
	
	if (sprite.arduino.isBoardReady()) {
		// OT_MOTO_RUNSIMPLE
		var cntStr = "12" + "," + dir + "," + speed; 		      
		Arduino.prototype.getURL('arduino', cntStr, null);
    } 
	else {
        throw new Error(localize('PHOENIXFrame Arduino board not connected'));	
    }	
};

Process.prototype._VehicleStop = function () {
    var sprite = this.homeContext.receiver;
	
	if (sprite.arduino.isBoardReady()) {
		// OT_MOTO_STOP
		var cntStr = "13";        
		Arduino.prototype.getURL('arduino', cntStr, null);
    } 
	else {
        throw new Error(localize('PHOENIXFrame Arduino board not connected'));	
    }	
};

Process.prototype._VehicleSpeedEncorderInit = function (pinLA, pinLB, pinRA, pinRB)
{
	var sprite = this.homeContext.receiver;

	if (sprite.arduino.isBoardReady()) {
		// OT_MOTO_I_SPD
		var cntStr = "14" + "," + pinLA + "," + pinLB + "," + pinRA + "," + pinRB;
		Arduino.prototype.getURL('arduino', cntStr, null);
	}
	else {
		throw new Error(localize('PHOENIXFrame Arduino board not connected'));
	}
};

Process.prototype._VehicleGetSpeed = function (index)
{
	var sprite = this.homeContext.receiver;

	if (sprite.arduino.isBoardReady()) {
		// OT_RETURN_MOTOSPD
		var cntStr = "15" + "," + index;
		return Arduino.prototype.getURL('arduino', cntStr, null);
	}
	else {
		throw new Error(localize('PHOENIXFrame Arduino board not connected'));
	}
};

Process.prototype._MotoInit4567 = function () {
	var sprite = this.homeContext.receiver;

	if (sprite.arduino.isBoardReady()) {
		// OT_MOTO_I_DRIVER4567
		var cntStr = "16";
		Arduino.prototype.getURL('arduino', cntStr, null);
	}
	else {
		throw new Error(localize('PHOENIXFrame Arduino board not connected'));
	}
};

Process.prototype._VehicleInit_MotoBoard298N = function (pinL0, pinL1, pinLS, pinR0, pinR1, pinRS) {
	var sprite = this.homeContext.receiver;

	if (sprite.arduino.isBoardReady()) {
		// OT_MOTO_I_DRIVER298N
		var cntStr = "17" + "," + pinL0 + "," + pinL1 + "," + pinLS + "," + pinR0 + "," + pinR1 + "," + pinRS;    
		Arduino.prototype.getURL('arduino', cntStr, null);
	}
	else {
		throw new Error(localize('PHOENIXFrame Arduino board not connected'));
	}
};

Process.prototype._MP3Init = function (pinR, pinT) {
	var sprite = this.homeContext.receiver;

	if (sprite.arduino.isBoardReady()) {
		// OT_MP3_INIT
		var cntStr = "18" + "," + pinR + "," + pinT;    
		Arduino.prototype.getURL('arduino', cntStr, null);
	}
	else {
		throw new Error(localize('PHOENIXFrame Arduino board not connected'));
	}
};

Process.prototype._MP3Play = function () {
	var sprite = this.homeContext.receiver;

	if (sprite.arduino.isBoardReady()) {
		// OT_MP3_PLAY
		var cntStr = "19";    
		Arduino.prototype.getURL('arduino', cntStr, null);
	}
	else {
		throw new Error(localize('PHOENIXFrame Arduino board not connected'));
	}
};

Process.prototype._MP3PlayIndex = function (index) {
	var sprite = this.homeContext.receiver;

	if (sprite.arduino.isBoardReady()) {
		// OT_MP3_INDEX
		var cntStr = "20" + "," + index;
		Arduino.prototype.getURL('arduino', cntStr, null);
	}
	else {
		throw new Error(localize('PHOENIXFrame Arduino board not connected'));
	}
};

Process.prototype._MP3Next = function () {
	var sprite = this.homeContext.receiver;

	if (sprite.arduino.isBoardReady()) {
		// OT_MP3_NEXT
		var cntStr = "21";
		Arduino.prototype.getURL('arduino', cntStr, null);
	}
	else {
		throw new Error(localize('PHOENIXFrame Arduino board not connected'));
	}
};

Process.prototype._MP3PlayStop = function () {
	var sprite = this.homeContext.receiver;

	if (sprite.arduino.isBoardReady()) {
		// OT_MP3_STOP
		var cntStr = "22";
		Arduino.prototype.getURL('arduino', cntStr, null);
	}
	else {
		throw new Error(localize('PHOENIXFrame Arduino board not connected'));
	}
};

Process.prototype._MP3SetVolume = function (volume) {
	var sprite = this.homeContext.receiver;

	if (sprite.arduino.isBoardReady()) {
		// OT_MP3_STOP
		var cntStr = "23" + "," + volume;
		Arduino.prototype.getURL('arduino', cntStr, null);
	}
	else {
		throw new Error(localize('PHOENIXFrame Arduino board not connected'));
	}
};

Process.prototype._IRInit = function (pinR) {
	var sprite = this.homeContext.receiver;

	if (sprite.arduino.isBoardReady()) {
		// OT_MP3_VOLUME
		var cntStr = "24" + "," + pinR;
		Arduino.prototype.getURL('arduino', cntStr, null);
	}
	else {
		throw new Error(localize('PHOENIXFrame Arduino board not connected'));
	}
};

Process.prototype._IRSend = function (val) {
	var sprite = this.homeContext.receiver;

	if (sprite.arduino.isBoardReady()) {
		// OT_IR_INIT
		var cntStr = "25" + "," + val;
		Arduino.prototype.getURL('arduino', cntStr, null);
	}
	else {
		throw new Error(localize('PHOENIXFrame Arduino board not connected'));
	}
};

Process.prototype._WeightInit = function (i, pinOut, pinClk) {
	var sprite = this.homeContext.receiver;

	if (sprite.arduino.isBoardReady()) {
		// OT_HX711_I
		var cntStr = "27" + "," + i + "," + pinOut + "," + pinClk;
		Arduino.prototype.getURL('arduino', cntStr, null);
	}
	else {
		throw new Error(localize('PHOENIXFrame Arduino board not connected'));
	}
};


Process.prototype._WeightTest = function (i) {
	var sprite = this.homeContext.receiver;

	if (sprite.arduino.isBoardReady()) {
		// OT_HX711_TEST
		var cntStr = "28" + "," + i;
		Arduino.prototype.getURL('arduino', cntStr, null);
	}
	else {
		throw new Error(localize('PHOENIXFrame Arduino board not connected'));
	}
};

Process.prototype._GetWeight = function (i) {
	var sprite = this.homeContext.receiver;

	if (sprite.arduino.isBoardReady()) {
		// OT_RETURN_HX711
		var cntStr = "29" + "," + i;
		return Arduino.prototype.getURL('arduino', cntStr, null);
	}
	else {
		throw new Error(localize('PHOENIXFrame Arduino board not connected'));
	}
};

Process.prototype._MC_LightInternal = function (val) {
	var sprite = this.homeContext.receiver;

	if (sprite.arduino.isBoardReady()) {
		// OT_INTERNAL_LIGHT
		var cntStr = "500" + "," + val;
		Arduino.prototype.getURL('makerclock', cntStr, null);
	}
	else {
		throw new Error(localize('PHOENIXFrame Arduino board not connected'));
	}
};

Process.prototype._MC_LED = function (pin, val) {
	var sprite = this.homeContext.receiver;

	if (sprite.arduino.isBoardReady()) {
		// OT_LIGHT
		var cntStr = "501" + "," + pin + "," + val;
		Arduino.prototype.getURL('makerclock', cntStr, null);
	}
	else {
		throw new Error(localize('PHOENIXFrame Arduino board not connected'));
	}
};

Process.prototype._MC_Buzzer = function (pin, val) {
	var sprite = this.homeContext.receiver;

	if (sprite.arduino.isBoardReady()) {
		// OT_LIGHT=BUZZER
		var cntStr = "501" + "," + pin + "," + val;
		Arduino.prototype.getURL('makerclock', cntStr, null);
	}
	else {
		throw new Error(localize('PHOENIXFrame Arduino board not connected'));
	}
};

Process.prototype._MC_Segment = function (pin, val) {
	var sprite = this.homeContext.receiver;

	if (sprite.arduino.isBoardReady()) {
		// OT_SEGMENT
		var cntStr = "502" + "," + pin + "," + val;
		Arduino.prototype.getURL('makerclock', cntStr, null);
	}
	else {
		throw new Error(localize('PHOENIXFrame Arduino board not connected'));
	}
};

Process.prototype._MC_Moto = function (pin, speed){
	var sprite = this.homeContext.receiver;

	if (sprite.arduino.isBoardReady()) {
		// OT_SEGMENT
		var cntStr = "503" + "," + pin + "," + speed;
		Arduino.prototype.getURL('makerclock', cntStr, null);
	}
	else {
		throw new Error(localize('PHOENIXFrame Arduino board not connected'));
	}
}

Process.prototype._MC_DistTest = function (pin){
	var sprite = this.homeContext.receiver;

	if (sprite.arduino.isBoardReady()) {
		// OT_DISTTEST
		var cntStr = "504" + "," + pin;
		Arduino.prototype.getURL('makerclock', cntStr, null);
	}
	else {
		throw new Error(localize('PHOENIXFrame Arduino board not connected'));
	}
}

Process.prototype._MC_GetDist = function (pin){
	var sprite = this.homeContext.receiver;

	if (sprite.arduino.isBoardReady()) {
		// OT_RETURN_DIST
		var cntStr = "9";        
		return Arduino.prototype.getURL('makerclock', cntStr, null);
    } 
	else {
        throw new Error(localize('PHOENIXFrame Arduino board not connected'));	
    }	
}

// websocket -------------------------------------------------------------------
var mWebSocket = null
function webSocketConnect()
{
	mWebSocket = new WebSocket('ws://localhost:8389/websocket');

    mWebSocket.onerror = function(event) {
    }

    mWebSocket.onopen = function(event) {
	}
	
	mWebSocket.onclose = function(event){

	}

    mWebSocket.onmessage = function(ent) {
		var recvStr = ent.data;
    }
	
}

function mWebSocketDisConnect()
{
	if (null != mWebSocket)
	{
		mWebSocket.close();
		mWebSocket = null;
	}
}

function mWebSocketSend(sendStr)
{
	if (null != mWebSocket)
		mWebSocket.send(sendStr);
}
// websocket -------------------------------------------------------------------