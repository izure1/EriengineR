module.exports = {
	cid: '{CF907B52-81BA-4B77-B678-D6802C98B1AD}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/320',
	class: '연결',
	title: '요청의 이름을 비교합니다',
	description: '위 사건의 요청의 이름이 {{요청명}}(과)와 {{방식}}할 경우 작동합니다.',
	variables: {
		'요청명': {
			text: '새로운 요청',
			type: 'value',
			sample: 'request_name'
		},
		'방식': {
			text: '일치',
			type: 'radio',
			sample: [
				{ text: '일치', value: true },
				{ text: '불일치', value: false }
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		if (e.constructor !== 'EriRequest') {
			stop();
			return;
		}
		if (e.value.name === this.요청명 === this.방식) next();
		else stop();
	}
};