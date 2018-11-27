// blocks.js

SyntaxElementMorph.prototype.originalLabelPart = SyntaxElementMorph.prototype.labelPart;
SyntaxElementMorph.prototype.labelPart = function (spec) {
    var part,
        block = this;

    switch (spec) {
        case '%_Pin':
            part = new InputSlotMorph(
                null,
                false,
                {
                    '0': ['0'],
                    '1': ['1'],
                    '2': ['2'],
                    '3': ['3'],
                    '3': ['3'],
                    '4': ['4'],
                    '5': ['5'],
                    '6': ['6'],
                    '7': ['7'],
                    '8': ['8'],
                    '9': ['9'],
                    '10': ['10'],
                    '11': ['11'],
                    '12': ['12'],
                    '13': ['13'],
                    'A0': ['A0'],
                    'A1': ['A1'],
                    'A2': ['A2'],
                    'A3': ['A3'],
                    'A4': ['A4'],
                    'A5': ['A5']
                },
                true
            );
            part.originalChanged = part.changed;
            part.changed = function () { part.originalChanged(); if (block.toggle) { block.toggle.refresh(); } };
            break;
        case '%_AnalogPin':
            part = new InputSlotMorph(
                null,
                false,
                {
                    'A0': ['A0'],
                    'A1': ['A1'],
                    'A2': ['A2'],
                    'A3': ['A3'],
                    'A4': ['A4'],
                    'A5': ['A5']
                },
                true
            );
            part.originalChanged = part.changed;
            part.changed = function () { part.originalChanged(); if (block.toggle) { block.toggle.refresh(); } };
            break;
        case '%_PwmPin':
            part = new InputSlotMorph(
                null,
                false,
                {
                    '3': ['3'],
                    '5': ['5'],
                    '6': ['6'],
                    '9': ['9'],
                    '10': ['10'],
                    '11': ['11']
                },
                true
            );
            break;
        case '%_dirtype':
            part = new InputSlotMorph(
                null,
                false,
                {
                    'none': ['none'],
                    'forward': ['forward'],
                    'backward': ['backward']
                },
                true
            );
            break;
        case '%_simpledirtype':
            part = new InputSlotMorph(
                null,
                false,
                {
                    'none': ['none'],
                    'go': ['go'],
                    'back': ['back'],
                    'left': ['left'],
                    'right': ['right']
                },
                true
            );
            break;
        case '%_PinMode':
            part = new InputSlotMorph(
                null,
                false,
                {
                    'INPUT': ['INPUT'],
                    'OUTPUT': ['OUTPUT']
                },
                true
            );
            break;
        case '%_HighLow':
            part = new InputSlotMorph(
                null,
                false,
                {
                    'HIGH': ['HIGH'],
                    'LOW': ['LOW']
                },
                true
            );
            break;
        case '%_Pin_mc':
            part = new InputSlotMorph(
                null,
                true,
                {
                    'P_1': ['P_1'],
                    'P_2': ['P_2'],
                    'P_3': ['P_3'],
                    'P_3': ['P_3'],
                    'P_4': ['P_4'],
                    'P_5': ['P_5'],
                    'P_6': ['P_6'],
                    'P_7': ['P_7'],
                    'P_8': ['P_8'],
                    'P_9': ['P_9'],
                    'P_10': ['P_10']
                },
                true
            );
            part.originalChanged = part.changed;
            part.changed = function () { part.originalChanged(); if (block.toggle) { block.toggle.refresh(); } };
            break;
        case '%_PinMoto_mc':
            part = new InputSlotMorph(
                null,
                true,
                {
                    'P_1': ['P_1'],
                    'P_2': ['P_2'],
                }
            );
            part.originalChanged = part.changed;
            part.changed = function () { part.originalChanged(); if (block.toggle) { block.toggle.refresh(); } };
            break;
        default:
            part = this.originalLabelPart(spec);
            break;
    }
    return part;
};

BlockMorph.prototype.originalUserMenu = BlockMorph.prototype.userMenu;
BlockMorph.prototype.userMenu = function () {
    var menu = this.originalUserMenu();
    if (StageMorph.prototype.enableCodeMapping && this.selector == 'receiveGo') {
        menu.addLine();
        menu.addItem(
            'export as Arduino sketch...',
            'transpileToCAndSave'
        );
        menu.addLine();
        menu.addItem(
            'show Arduino code',
            'transpileToCAndShow'
        );
        try {
            console.log(process);
            menu.addItem(
                'upload Arduino code',
                'transpileToCAndUpload'
            );
        } catch (error) {
            
        }

    }
    return menu;
};

BlockMorph.prototype.transpileToCAndUpload = function () {
    try {
        console.log(process);
    } catch (error) {
        return
    }
    board_list = ['arduino:avr:uno', 'arduino:avr:mega', 'arduino:avr:nano'];
    port_list = [];
    world.Arduino.getSerialPorts((ports) => {
        Object.keys(ports).forEach((p) => {
            window.port_list.push(p)
        });
    })

    $("#dialog").removeClass('xiaoshi');
    
    var myself = this;
    $("#upload").click(function() {
        var c_code;
        try {
            c_code = myself.transpileToC()
            
            //write and upload arduino code to board
            var fs = require('fs');
            var workspace = process.cwd()
    
            fs.mkdir('Manykit', (err) => {
                // write file
                fs.writeFile(`${workspace}\\Manykit\\Manykit.ino`, c_code, function (err) {
                    if (err) {
                        alert(err);
                    } else {
                        // upload file
                        var exec = require('child_process').execFile;
                        var cmd_params = ['--upload', '--board', which_board, '--port', which_port, `${workspace}\\Manykit\\Manykit.ino`];
                        exec(`${workspace}\\Arduino\\arduino.exe`, cmd_params, (err) => {
                            if (err) {
                                alert(err);
                            } else {
                                alert('上传成功');
                            }
                        });
                    }
                });
    
            });
    
        } catch (error) {
    
        }
    })

};

BlockMorph.prototype.transpileToC = function(){
    c_code = this.world().Arduino.transpile(
        this.mappedCode(),
        this.parentThatIsA(ScriptsMorph).children.filter(
            function (each) {
                return each instanceof HatBlockMorph &&
                    each.selector == 'receiveMessage';
            }))
    c_code = c_code.replace(new RegExp('manykit.math\\(abs,', 'g'), 'abs(')
    c_code = c_code.replace(new RegExp('manykit.math\\(ceiling,', 'g'), 'ceil(')
    c_code = c_code.replace(new RegExp('manykit.math\\(floor,', 'g'), 'floor(')
    c_code = c_code.replace(new RegExp('manykit.math\\(sqrt,', 'g'), 'sqrt(')
    c_code = c_code.replace(new RegExp('manykit.math\\(sin,', 'g'), 'sin(DEG_TO_RAD * ')
    c_code = c_code.replace(new RegExp('manykit.math\\(cos,', 'g'), 'cos(DEG_TO_RAD * ')
    c_code = c_code.replace(new RegExp('manykit.math\\(tan,', 'g'), 'tan(DEG_TO_RAD * ')
    c_code = c_code.replace(new RegExp('manykit.math\\(asin,', 'g'), 'RAD_TO_DEG * asin(')
    c_code = c_code.replace(new RegExp('manykit.math\\(acos,', 'g'), 'RAD_TO_DEG * acos(')
    c_code = c_code.replace(new RegExp('manykit.math\\(atan,', 'g'), 'RAD_TO_DEG * atan(')
    c_code = c_code.replace(new RegExp('manykit.math\\(ln,', 'g'), 'log(')
    c_code = c_code.replace(new RegExp('manykit.math\\(log,', 'g'), 'log10(')
    c_code = c_code.replace(new RegExp('manykit.math\\(e\\^,', 'g'), 'exp(')
    c_code = c_code.replace(new RegExp('manykit.math\\(10\\^,', 'g'), 'pow(10,') 
    return c_code;   
}

BlockMorph.prototype.transpileToCAndShow = function () {
    try {
        c_code = this.transpileToC()
        // show c_code
        localStorage.setblock = c_code.replace(new RegExp('\n', 'g'), '<br>')
        // document.getElementById("blockdaima").innerHTML = c_code.replace(new RegExp('\n', 'g'), '<br>');
        // document.getElementById('codeiframe').contentWindow.document.getElementById('blockdaima').innerHTML = localStorage.setblock;
        // document.getElementById("blockdaima").innerHTML=c_code.replace(new RegExp('\n', 'g'), '<br>')
        $("#tab_item").removeClass('xiaoshi');
        $(".block").removeClass('xiaoshi');
        $(".move").removeClass('xiaoshi');
        localStorage.isRellyShow = 1
        document.getElementById('codeiframe').contentWindow.location.reload(true);
    } catch (error) {

    }
};

BlockMorph.prototype.transpileToCAndSave = function () {
    var ide = this.parentThatIsA(IDE_Morph),
        safeChars = {
            "á": "a", "à": "a", "ä": "a",
            "é": "e", "è": "e", "ë": "e",
            "í": "i", "ì": "i", "ï": "i",
            "ó": "o", "ò": "o", "ö": "o",
            "ú": "u", "ù": "u", "ü": "u",
            "Á": "A", "À": "A", "Ä": "A",
            "É": "E", "È": "E", "Ë": "E",
            "Í": "I", "Ì": "I", "Ï": "I",
            "Ó": "O", "Ò": "O", "Ö": "O",
            "Ú": "U", "Ù": "U", "Ü": "U",
            "ç": "c", "Ç": "C", "ñ": "n", "Ñ": "N"
        },
        fileName = ide.projectName || 'ManyKitArduinoSketch';

    fileName = fileName.replace(/[^\w ]/g, function (char) {
        return safeChars[char] || char;
    });
    fileName = fileName.replace(/ /g, '_')
    fileName = fileName.replace(/[^a-zA-Z0-9_]/g, '');

    try {
        c_code = this.transpileToC()
        ide.saveFileAs(
            c_code,
            'application/ino;chartset=utf-8',
            fileName);
    } catch (error) {
        ide.inform('Error exporting to Arduino sketch!', error.message)
    }
};