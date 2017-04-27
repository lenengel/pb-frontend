/**
 * rapidM2M BACKEND API for browsers
 *
 * Simple javascript codes for accessing the rapidM2M backend API
 * from js clients/browsers
 */


var resData = null;
if (typeof rm === "undefined") {
    var rm = {};

    /* ===
     setup global auth token for subsequent calls to mdnApi()
     === */
    rm.open = function (auth, host) {
        rm.__apiAuth = auth;
        rm.__apiHost = host;
    };


    /* ===
     access the api; call rm.open(...) before!
     === */
    rm.call = function (verb,                  	// 'GET', 'PUT', 'POST', 'DELETE'
                        resource,             	// incl. api version - '/1/me', '/1/customers', ...
                        json,                  	// data payload js-object or string '{ "name":"value" }'
                        onDone) {             	// function( http_status, data){...}
        // http_status <  300: data = json data of call's reply
        // http_status >= 300: data = object with extra error information
        // private http codes:
        // 900 general errors (request did not fire)
        // 901 parsererror, body is no valid json
        // 902 connection timeout
        // 903 connection abort
        // 997 invalid data parameter submitted (request did not fire)
        // 998 invalid call, for example mal formed json in <data> variable
        // 999 unkown internal error
        try {
            var url = rm.__apiHost + resource;

        if (verb == 'GET')
                data = { json: JSON.stringify( json, null, 1)};
            else if(verb == 'PUT' || verb == 'POST')
                data = JSON.stringify( json, null, 1);
            else
                data = json;

            var opt = {
                type: verb,
                dataType: 'json',
                data: data,
                timeout: 15000,
                contentType: "application/json; charset='utf-8'",
                url: url,
                cache: false,
                crossDomain: true,
                beforeSend: function (xhr) {
                    xhr.withCredentials = true;
                    if (rm.__apiAuth) xhr.setRequestHeader('Authorization', rm.__apiAuth);
                },
                success: function (data, textStatus, xhr) {
                    resData = data;
                    onDone(xhr.status, data);
                },
                error: function (xhr, textStatus /*, errorThrown */) {
                    var status;
                    var info;

                    switch (textStatus) {
                        case 'error':
                            if (xhr.status == 0) {
                                status = 900;
                                info = {error: 'E_900 general errors (request did not fire)'};
                            }
                            else {
                                if (xhr.status == 404) {
                                    console.log(xhr.responseText);
                                }
                                try {
                                    status = xhr.status;
                                    if (xhr.responseText) info = JSON.parse(xhr.responseText);
                                }
                                catch (e) {
                                    status = 901;
                                    info = {error: 'E_901 received invalid json data "' + xhr.responseText + '"'};
                                }
                            }
                            break;
                        case 'parsererror':
                            if (xhr.responseText == "") { // empty reply body may cause "parseerror" -> ignore it
                                status = xhr.status;
                                info = null;
                            }
                            else {
                                status = 901;
                                info = {error: 'E_901 received invalid json data **' + xhr.responseText + '**'};
                            }
                            break;
                        case 'timeout':
                            status = 902;
                            info = {error: 'E_902 connection timeout'};
                            break;
                        case 'abort':
                            status = 903;
                            info = {error: 'E_903 connection aborted'};
                            break;
                        default:
                            status = 999;
                            info = {error: 'E_INTERNAL unexpected status ' + xhr.status + ', "' + textStatus + '"'};
                            break; // should never happen
                    }
                    // status     textStatus + xhr.status
                    // -------------------------------------------------------
                    // 900     error + 0 ... general errors (request did not fire)
                    // 901     parsererror + 200 o.ä.  .. body is no valid json
                    // 902     timeout + 0 ... connection expired
                    // 903     abort + ?  .. connection aborted by server?
                    // 404     error + 404  = cross domain not allowed
                    // xxx     error + xxx  = any http status code != 2xx reported from server
                    onDone(status, info);
                }
            };

            if (json.hasOwnProperty('formData') && json.formData instanceof FormData)
                {
                opt.processData = false;
                opt.contentType = false;

                opt.data = json.formData;
                opt.headers = json.headers;
                }
            // execute ajax call
            $.ajax(opt);
        }
        catch (e) {
            onDone(998, {err: 'E_INTERNAL invalid call ... ' + e});
        }
    };
}
