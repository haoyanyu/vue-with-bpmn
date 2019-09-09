import axios from 'axios';
import qs from 'qs'

var ignoreDuplicateOf = [
	'age', 'authorization', 'content-length', 'content-type', 'etag',
	'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
	'last-modified', 'location', 'max-forwards', 'proxy-authorization',
	'referer', 'retry-after', 'user-agent'
];
let baseUrl = '';
switch (process.env.NODE_ENV_CONFIG) {
	case 'development':
		baseUrl = 'http://192.168.8.53:41119/';
		break;
	case 'production':
		baseUrl = 'http://production';
		break;
	default:
		baseUrl = 'http://devsss';
		break;
}

let XMLCONFIG = {
	timeout: 30000,
	withCredentials: true,
}

function parseHeaders(headers) {
	var parsed = {};
	var key;
	var val;
	var i;

	if (!headers) {
		return parsed;
	}

	headers.split('\n').forEach(function parser(line) {
		i = line.indexOf(':');
		key = (line.substr(0, i)).trim().toLowerCase();
		val = (line.substr(i + 1)).trim();

		if (key) {
			if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
				return;
			}
			if (key === 'set-cookie') {
				parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
			} else {
				parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
			}
		}
	});

	return parsed;
};
// ajax请求
function deployRequest(url, formData) {
	return new Promise((resolve, reject) => {
		// document.domain = '192.168.8.53:41119'
		let request = new XMLHttpRequest();

		request.timeout = XMLCONFIG.timeout;
		request.open('post', url)

		request.onreadystatechange = function () {
			if (!request || request.readyState !== 4) {
				return;
			}
			if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
				return;
			}
			var responseData = request.response
			var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
			var response = {
				data: responseData,
				status: request.status,
				statusText: request.statusText,
				headers: responseHeaders,
				request: request
			};
			resolve(response)

		}
		request.send(formData);
	})
}
// 部署流程
const deployFlow = function (data) {
	console.log(data)
	return new Promise((resolve, reject) => {
		var url = '/flow-api/engine-rest/deployment/create';
		// var url = baseUrl + 'engine-rest/deployment/create';
		var formData = new FormData()
		for (let key in data) {
			if (data.hasOwnProperty(key)) {
				formData.append(key, data[key])
			}
		}
		deployRequest(url, formData).then(res => {
			
			resolve(Object.assign({}, JSON.parse(res.data), {
				respCode: '000000',
				respDesc: '成功',
				respData: JSON.parse(res.data).id
			}))
		}).catch(err => {
			throw (err)
		})
	})

}

export {
	baseUrl,
	deployFlow
}

// axios
// 响应时间
axios.defaults.timeout = XMLCONFIG.timeout;
// 允许跨域             
axios.defaults.withCredentials = XMLCONFIG.withCredentials

axios.interceptors.request.use((config) => {

	if (config.method === 'post' && config.data) { //降为一般请求
		let params = JSON.parse(JSON.stringify(config.data))
		config.data = qs.stringify(params)
	}
	return config
}, err => {
	return Promise.reject(err)
})

axios.interceptors.response.use(res => {
	// if (!res.data) {
	// 	return Promise.reject(res)
	// }
	// if (res.data.respCode != '00') {
	// 	return Promise.reject(res.data)
	// }
	return Promise.resolve(res.data)
}, err => {
	return Promise.reject(err)
})