module.exports = {
	cid: '{61B094A0-4B13-4AAA-AB31-527DB6D6E640}',
	version: '1.0.0',
	class: '연결',
	title: '웹페이지를 엽니다',
	description: '새창에 웹페이지 주소 {{주소}}(를)을 엽니다.',
	variables: {
		'주소': {
			text: 'https://google.com',
			type: 'value',
			sample: 'request_url'
		}
	},
	fn: function (next, stop, e) {
		window.open(this.주소, '_blank');
		next();
	}
};