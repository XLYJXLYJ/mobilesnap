pxframeDict = {
    'ZERONERobot website':
    '零一机器人',

    'ManyKit website':
        '许多米科技',

    'ManyKit GitHub':
        '源代码仓库',

    'Singup From ManyKit':
        '从官网注册',

    'New Arduino translatable project':
        '新建Arduino项目',

    'Experimental feature!\nScripts written under this\nmode will be translatable\nas Arduino sketches':
        '在这个模式下，Arduino相关的代码科技转换为脚本',

    'Enter project URL':
        '输入项目的网址',

    'Connect Arduino':
        '连接到PXFrame Arduino板',

    'Disconnect Arduino':
        '断开与PXFrame Arduino的连接',

    'Connect Arduino Wifi':
        '连接到PXFrame Arduino Wifi板',

    'An board has been connected. Happy prototyping!':
        '接上PHOENIXFrame Arduino板了，祝你玩得愉快！',

    'Board was disconnected from port\n':
        '控制板已中断连接，引脚：\n',

    'Board is not connected':
        '没有连接控制板',

    'Connecting board at port\n':
        '连接控制板在端口',

    'Connecting board\n':
        '连接控制板',

    'PHOENIXFrame Arduino board not connected':
        'PHOENIXFrame Arduino 板没有连接',

    'Could not talk to board in port\n':
        '无法连接到PHOENIXFrame Arduino板端口\n',
    
    'Could not talk to board\n':
        '无法连接到PHOENIXFrame Arduino板\n',
    
    'Check if PHOENIXFrameFirewall is loaded.':
        '检测PHOENIXFrame防火墙代码是否已经加载',

    'select a port': '选择一个端口',

    'Visible stepping': '显示执行过程',
		
    'PinMode %_Pin as %_PinMode': '引脚 %_Pin 设为 %_PinMode',
    
    'INPUT': '输入',
    'OUTPUT': '输出',

    'HIGH': '高',
    'LOW': '低',

    'DigitalWrite %_Pin as %_HighLow': '引脚 %_Pin 输出 %_HighLow',
    'PwmWrite %_PwmPin as %n': '引脚 %_PwmPin PWM输出 %n',
    'DigitalRead %_Pin': '引脚 %_Pin 数字值',

    'AnalogWrite %_AnalogPin as %n': '引脚 %_AnalogPin 模拟写入 %n',    
    'AnalogRead %_AnalogPin': '引脚 %_AnalogPin 模拟值',

    'Servo index %n init at pin %_Pin' : '伺服舵机 %n 初始化在引脚 %_Pin',
    'Servo index %n write value %n': '伺服舵机 %n 写入 %n',

    'DistInit at pin0 %_Pin and pin1 %_Pin' : '超声波初始化在 触发引脚 %_Pin 和 回声引脚 %_Pin',
    'DistTest' : '超声波测试',
    'GetDist' : '获得超声波距离',

    'UltrasonicInit at pinTriger %_Pin and pinEcho %_Pin' :'超声波初始化在 触发引脚 %_Pin 和 回声引脚 %_Pin',
    'UltrasonicMeasure' : '获得超声波距离',

    'forward': '前进',
    'backward': '后退',
    'go': '前进',
    'back': '后退',
    'left': '左',
    'right': '右',

    'VehicleInitMotoBoard4567': '电机驱动板初始化4567',
    'VehicleInitMotoBoard10111213' : '电机驱动板初始化10111213',
    'VehicleInitMotoBoard298N': '电机驱动板初始化298N',

    'VehicleInitMotoBoard298N at pinLA %_Pin and pinLB %_Pin and pinLS %_Pin and pinRA %_Pin and pinRB %_Pin pinRS %_Pin': '电机驱动板298N初始化在 控制脚pinLA %_Pin 控制脚pinLB %_Pin 速度脚pinLS %_Pin 控制脚pinRA %_Pin 控制脚pinRB %_Pin 速度脚pinLS %_Pin',

    'moto %n run %_dirtype at speed %n': '电机 %n 以 %_dirtype 方向 %n 速度运行',
    'moto run %_simpledirtype at speed %n': '以 %_simpledirtype 方向 %n 速度运行',
    'stop motos': '电机停止',
    'VehicleSpeedEncorderInit at pinLA %_Pin and pinLB %_Pin and pinRA %_Pin and pinRB %_Pin':'电机速度编码器初始化在pinLA %_Pin pinLB %_Pin pinRA %_Pin pinRB %_Pin',
    'GetSpeed of moto %n': '获得 %n 的电机马达转速',

    'MP3 init at pinR %_Pin pinT %_Pin': 'MP3初始化在接收引脚 %_Pin 和 发射引脚 %_Pin',
    'MP3 play' : 'MP3 播放',
    'MP3 play at index %n': 'MP3播放第 %n 首',
    'MP3 stop': 'MP3停止',
    'MP3 set volume at %n': 'MP3设置声音大小为 %n',
    'MP3 next': 'MP3播放下一首',

    'infrared recviver init at pin %_Pin': '红外接收器初始化在端口 %_Pin',
    'infrared send value %n': '红外发射器发送 %n',
	
	'weight tester %n init at pinOut %_Pin pinClk %_Pin':'称重模块 %n 初始化在输出端口 %_Pin 和时钟端口 %_Pin',
	'test the weight of %n':'检测第 %n 称重模块的重量',
	
	'get weight of %n':'获得第 %n 称重模块的重量',
};

for (var attrname in pxframeDict) { SnapTranslator.dict.zh_CN[attrname] = pxframeDict[attrname]; }
