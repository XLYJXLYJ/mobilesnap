// cloud.js
IDE_Morph.prototype.openIn = function (world) {
    var hash, myself = this, urlLanguage = null;
	$.ajax({
		type : "GET",
		url:"/res/verify",
		headers : {
			'Content-Type' : 'application/json; charset=utf-8'
		},
		dataType: "json",
		async:false,
		success:function(res){
			sessionStorage.username=res.data.username
			sessionStorage.password=res.data.password
			sessionStorage.userid=res.data.userid
			if(res.data.userid){
				myself.cloud.login(
				sessionStorage.username,
				sessionStorage.password,    
				null,
				null,
				null)
			}
		}
	});
		
    this.buildPanes();
    world.add(this);
    world.userMenu = this.userMenu;

    // override Cloud's user message with Morphic
    this.cloud.message = function (string) {
        var m = new MenuMorph(null, string),
            intervalHandle;
        m.popUpCenteredInWorld(world);
        intervalHandle = setInterval(function () {
            m.destroy();
            clearInterval(intervalHandle);
        }, 2000);
    };

    // prevent non-DialogBoxMorphs from being dropped
    // onto the World in user-mode
    world.reactToDropOf = function (morph) {
        if (!(morph instanceof DialogBoxMorph ||
        		(morph instanceof MenuMorph))) {
            if (world.hand.grabOrigin) {
                morph.slideBackTo(world.hand.grabOrigin);
            } else {
                world.hand.grab(morph);
            }
        }
    };

    this.reactToWorldResize(world.bounds);

    function getURL(url) {
        try {
            var request = new XMLHttpRequest();
            request.open('GET', url, false);
            request.send();
            if (request.status === 200) {
                return request.responseText;
            }
            throw new Error('unable to retrieve ' + url);
        } catch (err) {
            myself.showMessage('unable to retrieve project');
            return '';
        }
    }

    function applyFlags(dict) {
        if (dict.embedMode) {
            myself.setEmbedMode();
        }
        if (dict.editMode) {
            myself.toggleAppMode(false);
        } else {
            myself.toggleAppMode(true);
        }
        if (!dict.noRun) {
            myself.runScripts();
        }
        if (dict.hideControls) {
            myself.controlBar.hide();
            window.onbeforeunload = nop;
        }
        if (dict.noExitWarning) {
            window.onbeforeunload = nop;
        }
        if (dict.lang) {
            myself.setLanguage(dict.lang, null, true); // don't persist
        }
    }
    function interpretUrlAnchors() {
        var dict, idx;
            var demoxml;
            var demouser;
            myself.toggleAppMode(true);
            demoxml = location.hash.substr(36, 5);
            demouser = location.hash.substr(20, 5);
            var playerresultxml = new Promise((resolve,reject) =>{
                axios.post('/res/getfile',{
                    id:sessionStorage.demoxmlid,
                })
                .then(function(response) { 
                    resolve(response.data)
                    // console.log(response.data)
                })
            });
            playerresultxml.then(function (projectData) {
                var msg;
                // alert(projectData)
                myself.nextSteps([
                    function () {
                        msg = myself.showMessage('正在加载项目...');
                    },
                    function () {nop(); }, // yield (bug in Chrome)
                    function () {
                        if (projectData.indexOf('<snapdata') === 0) {
                            myself.rawOpenProjectString(projectData);
                        } else if (
                            projectData.indexOf('<project') === 0
                        ) {
                            myself.rawOpenProjectString(projectData);
                        }
                        // myself.hasChangedMedia = true;
                        // myself.toggleAppMode(true)
                    },
                    function () { 
                        dict = myself.cloud.parseDict(location.hash.substr(11));
                        dict.embedMode = true;
                        applyFlags(dict);
                        msg.destroy();
                        myself.togglePauseResume()
                    }
                ]);
            }
        ) 
        if (location.hash.substr(0, 6) === '#open:') {
            hash = location.hash.substr(6);
            if (hash.charAt(0) === '%'
                    || hash.search(/\%(?:[0-9a-f]{2})/i) > -1) {
                hash = decodeURIComponent(hash);
            }
            if (contains(
                    ['project', 'blocks', 'sprites', 'snapdata'].map(
                        function (each) {
                            return hash.substr(0, 8).indexOf(each);
                        }
                    ),
                    1
                )) {
                this.droppedText(hash);
            } else {
                idx = hash.indexOf("&");
                if (idx > 0) {
                    dict = myself.cloud.parseDict(hash.substr(idx));
                    dict.editMode = true;
                    hash = hash.slice(0, idx);
                    applyFlags(dict);
                }
                this.droppedText(getURL(hash));
            }
        } else if (location.hash.substr(0, 5) === '#run:') {
            hash = location.hash.substr(5);
            idx = hash.indexOf("&");
            if (idx > 0) {
                hash = hash.slice(0, idx);
            }
            if (hash.charAt(0) === '%'
                    || hash.search(/\%(?:[0-9a-f]{2})/i) > -1) {
                hash = decodeURIComponent(hash);
            }
            if (hash.substr(0, 8) === '<project>') {
                this.rawOpenProjectString(hash);
            } else {
                this.rawOpenProjectString(getURL(hash));
            }
            applyFlags(myself.cloud.parseDict(location.hash.substr(5)));
        } else if (location.hash.substr(0, 9) === '#present:') {
            this.shield = new Morph();
            this.shield.color = this.color;
            this.shield.setExtent(this.parent.extent());
            this.parent.add(this.shield);
            // myself.showMessage('Fetching project\nfrom the cloud...');
            var demoxml
            demoxml = location.hash.substr(35, 5)
            var playerresultxml = new Promise((resolve,reject) =>{
                axios.post('/res/getfile',{
                    id:demoxml,
                })
                .then(function(response) { 
                    resolve(response.data)
                    // console.log(response.data)
                })
            })
			playerresultxml.then(function (projectData) {
				var msg;
				if(!demoxml){
					projectData=' '
				}else{
					myself.nextSteps([
						function () {
						   if (
								projectData.indexOf('<project') === 0
							) {
								myself.rawOpenProjectString(projectData);
							}
							else if (
								projectData === ' '   
							) {
								myself.toggleAppMode(false)
								myself.shield.destroy();
								myself.shield = null;
								msg.destroy();
								myself.toggleAppMode(false);
							}
							myself.hasChangedMedia = true;
							myself.toggleAppMode(false);
							myself.shield.destroy();
							myself.shield = null;
							// msg.destroy();
							myself.toggleAppMode(false);
						},
						function () {
							// myself.shield.destroy();
							myself.shield = null;
							// msg.destroy();
							myself.toggleAppMode(false);
							}
						]);
					}
				}
            ) 
        } else if (sessionStorage.snapdemoid) {

			var clouddata;
			$.ajax({
				type : "POST",
				url:"/res/getfile",
				async: true,
				headers : {
					'Content-Type' : 'application/json; charset=utf-8'
				},
				data: JSON.stringify({id: sessionStorage.snapdemoid}),
				dataType: "json",
				success:function(data){
					clouddata=data.responseText;
					myself.droppedText(clouddata);
					sessionStorage.snapdemoid='';
				},
				error:function(data){
					clouddata=data.responseText;
					myself.droppedText(clouddata);
					sessionStorage.snapdemoid='';
				},
			})
        } else if (location.hash.substr(0, 7) === '#cloud:') {
            this.shield = new Morph();
            this.shield.alpha = 0;
            this.shield.setExtent(this.parent.extent());
            this.parent.add(this.shield);
            myself.showMessage('Fetching project\nfrom the cloud...');

            // make sure to lowercase the username
            dict = myself.cloud.parseDict(location.hash.substr(7));

            myself.cloud.getPublicProject(
                dict.ProjectName,
                dict.Username,
                function (projectData) {
                    var msg;
                    myself.nextSteps([
                        function () {
                            msg = myself.showMessage('Opening project...');
                        },
                        function () {nop(); }, // yield (bug in Chrome)
                        function () {
                            if (projectData.indexOf('<snapdata') === 0) {
                                myself.rawOpenCloudDataString(projectData);
                            } else if (
                                projectData.indexOf('<project') === 0
                            ) {
                                myself.rawOpenProjectString(projectData);
                            }
                            myself.hasChangedMedia = true;
                        },
                        function () {
                            myself.shield.destroy();
                            myself.shield = null;
                            msg.destroy();
                            myself.toggleAppMode(false);
                        }
                    ]);
                },
                this.cloudError()
            );
        } else if (location.hash.substr(0, 4) === '#dl:') {
            myself.showMessage('Fetching project\nfrom the cloud...');

            // make sure to lowercase the username
            dict = myself.cloud.parseDict(location.hash.substr(4));
            dict.Username = dict.Username.toLowerCase();

            myself.cloud.getPublicProject(
                dict.ProjectName,
                dict.Username,
                function (projectData) {
                	myself.saveXMLAs(projectData, dict.ProjectName);
                 	myself.showMessage(
                  	   'Saved project\n' + dict.ProjectName,
                      	2
                 	);
                },
                this.cloudError()
            );
        } else if (location.hash.substr(0, 6) === '#lang:') {
            urlLanguage = location.hash.substr(6);
            this.setLanguage(urlLanguage, null, true); // don't persist
            this.loadNewProject = true;
        } else if (location.hash.substr(0, 7) === '#signup') {
            this.createCloudAccount();
        }
    this.loadNewProject = false;
    }

    if (this.userLanguage) {
        this.loadNewProject = true;
        this.setLanguage(this.userLanguage, interpretUrlAnchors);
    } else {
        interpretUrlAnchors.call(this);
    }
};
	
	
ProjectObj = function()
{
    this.projectname = "";
    this.ispublic = false;
    this.ispublished = false;
}

Cloud.prototype.init = function () {
    this.url = this.determineCloudDomain();
    this.username = null;
    this.password = null;
    this.id = null;
};

Cloud.prototype.determineCloudDomain = function () {
    return "https://www.manykit.com/res/";
};

// Cloud.prototype.initSession = function (onSuccess) {

// };

Cloud.prototype.originalLogin = Cloud.prototype.login;
Cloud.prototype.getCurrentUser = Cloud.prototype.login;

Cloud.prototype.login = function (
    username,
    password,
    persist,
    callBack,
    errorCall
) {
    var request = new XMLHttpRequest(),
        myself = this;

    var strPath = this.url + 'snaplogin' + '?username='
        + encodeURIComponent(username) + '&password='
        + encodeURIComponent(password);

    try {
        request.open(
            "GET",
            strPath,
            true
        );
        request.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        request.withCredentials = true;
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
				var objStr = JSON.parse(request.responseText);
                if (objStr.data.id) {
					myself.username = username;
					myself.password = password;
					myself.id = objStr.data.id;
					sessionStorage.userid=objStr.data.id;
					if(callBack!==null){
						callBack.call(
						null,
						request.responseText,
						'login suc!'
						);
					}

                } else {
					
					myself.username = null;
					myself.password = null;
					myself.id = null;

					errorCall.call(
						this,
						request.responseText,
						'login failed!'
					);
                }
            }
        };
        request.send(null);
    } catch (err) {
        errorCall.call(this, err.toString(), 'Snap!Cloud');
    }
};



Cloud.prototype.reconnect = function (
    callBack,
    errorCall
) {
    if (!(this.username && this.password)) {
        this.message('You are not logged in');
        return;
    }
    this.login(
        this.username,
        this.password,
        true,
        callBack,
        errorCall
    );
};

Cloud.prototype.originalSaveProject = Cloud.prototype.saveProject;
Cloud.prototype.saveProject = function (ide,proj) {
    let formData = new FormData();
	let thumbnail = normalizeCanvas(
		ide.stage.thumbnail(
			SnapSerializer.prototype.thumbnailSize
	)).toDataURL();
	
	let filebir = ide.serializer.serialize(ide.stage)
	let filebinary = new Blob([filebir]);
	formData.append('userid',sessionStorage.userid);
	formData.append('title',ide.projectName);
	formData.append('desc',ide.projectNotes);
	formData.append('cover',thumbnail);
	formData.append('state',1);
	formData.append('files',filebinary);
	let config = {
		headers:{
			'Content-Type':'application/x-jpg'
		}
	}			
	 $.ajax({
		url: '/res/upload',
		method: 'POST',
		data: formData,
		contentType: false, // 注意这里应设为false
		processData: false,
		cache: false,
		success: function(data) {
		},
	})					
}

Cloud.prototype.originalGetProjectList = Cloud.prototype.getProjectList;
Cloud.prototype.getProjectList = function (callBack, errorCall) {
    var myself = this;
    this.reconnect(
        function () {
            myself.callService(
                'filelist',
                function (list) {
                    callBack.call(null, list);
                    myself.disconnect();
                },
                errorCall
            );
        },
        errorCall
    );
};

Cloud.prototype.originalLogout = Cloud.prototype.logout;
Cloud.prototype.logout = function (callBack, errorCall) {
    var request = new XMLHttpRequest(),
        myself = this;

    var strPath = this.url + 'logout';

    try {
        request.open(
            "GET",
            strPath,
            true
        );
        request.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
        );
        request.withCredentials = true;
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.responseText) {
                    if (request.responseText.indexOf('errmsg') === 0) {

                        myself.username = "";
                        myself.password = "";

                        errorCall.call(
                            this,
                            request.responseText,
                            'login failed!'
                        );
                    } else {
                        myself.username = "";
                        myself.password = "";
						sessionStorage.username= '';
						sessionStorage.password= '';
						if(null!==callBack){
							callBack.call(
                            null,
                            request.responseText,
                            'logout suc!'
							);
						}
                    }
                } else {
                    errorCall.call(
                        null,
                        myself.url + 'logout',
                        localize('could not connect to:')
                    );
                }
            }
        };
        request.send(null);
    } catch (err) {
        errorCall.call(this, err.toString(), 'Snap!Cloud');
    }
};

Cloud.prototype.originalDisconnect = Cloud.prototype.disconnect;
Cloud.prototype.disconnect = function () {

};

Cloud.prototype.originalCallService = Cloud.prototype.callService;
Cloud.prototype.callService = function (
    serviceName,
    callBack,
    errorCall,
    args
) {
    // both callBack and errorCall are optional two-argument functions
    var request = new XMLHttpRequest(),
        service = serviceName,
        myself = this,
        stickyUrl,
        postDict,
		getdata,
		titledata;

    if (!service) {
        errorCall.call(
            null,
            'service ' + serviceName + ' is not available',
            'API'
        );
        return;
    }
    if (args && args.length > 0) {
        postDict = args;
    }
    try {
        stickyUrl = this.url + service + '?userid='
            + this.id;
        request.open(
            "POST",
            stickyUrl,
            true
        );
        request.withCredentials = true;
        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                var responseList = [];

                var objStr = JSON.parse(request.responseText);
                if (null!=objStr.errmsg)
                {
                    errorCall.call(
                        this,
                        request.responseText,
                        localize('Service:') + ' ' + localize(serviceName)
                    );

                  //  return;
                }
                if (serviceName === 'login') 
                {
                    myself.api = myself.parseAPI(request.responseText);
                }
                if (serviceName === 'getRawProject') 
                {
                    responseList = request.responseText;
                }
                else 
                {
					var datalist={
						userid:myself.id,
					}
					$.ajax({
						type : "POST",
						url:"/res/filelist",
						headers : {
							'Content-Type' : 'application/json; charset=utf-8'
						},
						data: JSON.stringify(datalist),
						dataType: "json",
						async:false,
						success:function(res){
							getdata=res.data;
							for(var i=0;i<res.data.length;i++){
								var projectObj3 = new ProjectObj();
								projectObj3.projectname = getdata[i].title;
								projectObj3.projectid = getdata[i].id;
								projectObj3.ispublic = true;
								projectObj3.ispublished = false;
								responseList[i] = projectObj3;
							}		
						}
					});
                }
                callBack.call(null, responseList);

                responseList = null;
            }
        };
        request.send(this.encodeDict(postDict));
    } catch (err) {
        errorCall.call(this, err.toString(), service.url);
    }
};


