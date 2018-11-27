// cloud.js

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


