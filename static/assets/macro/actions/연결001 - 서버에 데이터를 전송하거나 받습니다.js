module.exports = {
	cid: '{9fa78c57-5e2e-4de0-99fc-8891603f0e71}',
	version: '1.0.0',
	class: '연결',
	title: '서버에 데이터를 전송하거나 받습니다',
	description: '서버주소 {{서버주소}}(으)로 데이터 {{데이터}}(를)을 {{요청타입}}(으)로 전송합니다. 이 요청은 {{요청명}}(이)란 이름이며, 서버의 응답을 전역변수 {{변수명}}에 {{저장여부}}.',
	variables: {
		'서버주소': {
			text: 'http://yourserver.net',
			type: 'value',
			sample: 'request_url'
		},
		'데이터': {
			text: '전송할 데이터',
			type: 'text'
		},
		'요청타입': {
			text: "POST",
			type: 'radio',
			sample: [{
					text: 'GET',
					value: 'GET'
				},
				{
					text: 'POST',
					value: 'POST'
				}
			],
			skip: true
		},
		'요청명': {
			text: '새로운 요청',
			type: 'value',
			sample: 'request_name',
			skip: true
		},
		'변수명': {
			text: '받은 데이터',
			type: 'value',
			sample: 'variable_name',
			skip: true
		},
		'저장여부': {
			text: '저장합니다',
			type: 'radio',
			sample: [{
					text: '저장합니다',
					value: true
				},
				{
					text: '저장하지 않습니다',
					value: false
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		const request = new Eri.request({
			name: this.요청명
		});
		request.open(this.요청타입, this.서버주소).then(responseText => {
			if (this.저장여부) {
				Eri.variable[this.변수명] = responseText;
			}
		});
		request.send(this.데이터);
		next();
	}
};