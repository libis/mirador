(function($){

  var LIBISBLOB_API_ENDPOINT = '/api/jsonBlob';

  function getAPIUri(host, port, ssl, body) {

	var proto = 'http';
	port = port ? port : '80';

	if ( ssl ) {
		proto = 'https';
		port = port ? port : '443';
	}

	host = host ? host : 'jsonblob.com';

	var path = LIBISBLOB_API_ENDPOINT;

        // If the body is a string, this is a blob GET operation, 
	// otherwise it's a POST	
        if ( typeof body === 'string' || body instanceof String ){
		path += '/' + body;
	}

	return proto + '://' + host + ':' + port + path;
  }

  function initSettings(method, host, port, ssl, requestBody) {

	var ajaxSettings = {
		type: method,
		//url: 'http://libis-p-aezel-3.lnx.icts.kuleuven.be/mirador/bookmark/jsonblogFile.php/api/jsonblob',
                //url: 'http://services.libis.be/m2/bookmark/jsonblogFile.php/api/jsonBlob',
                url: $.DEFAULT_SETTINGS.bookmarkBlobUrl,
		contentType: 'application/json; charset=UTF-8',
		accept: 'application/json',
		dataType: 'json',
		processData: false
	};

	// POST The data
        if ( typeof requestBody  !== 'string' && !(requestBody instanceof String) ) {
		ajaxSettings.data = JSON.stringify(requestBody);
	} else {
            ajaxSettings.data = 'id='+requestBody;
        }


	return ajaxSettings;
  }

  function syncRequest(method, host, port, ssl, requestBody) {
	var result;
	var settings = initSettings(method, host, port, ssl, requestBody);
	settings.async = false;
	settings.success = function(data, textStatus, request) {
          result = data;
        };
	jQuery.ajax(settings);
	return result;
  }

  function asyncRequest(method, host, port, ssl, requestBody, cb) {
	var settings = initSettings(method, host, port, ssl, requestBody);
	settings.success = cb;
	jQuery.ajax(settings);
  }

  $.LibisBlobAPI = function(options) {
	this.options = options;
  };


  $.LibisBlobAPI.prototype = {
	readSync: function(blobId) {
		return syncRequest('GET', this.options.host, this.options.port, this.options.ssl, blobId);
	},
	save: function(blob) {
		var deferred = jQuery.Deferred();
		asyncRequest('POST', this.options.host, this.options.port, this.options.ssl, blob, function(data, textStatus, request) {
			var blobid = request.getResponseHeader('X-Jsonblob');
			deferred.resolve(blobid);
		});
		return deferred.promise();
	}
  };

}(Mirador));

