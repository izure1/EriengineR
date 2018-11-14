module.exports = {
	cid: '{EEF2CE6C-8F75-440E-B493-C24574F9E722}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/321',
	class: '연결',
	title: '요청이 성공 여부를 비교합니다',
	description: '위 요청이 {{방식}}(으)로 완료되었을 때 작동합니다.',
	variables: {
		'방식': {
			text: '성공적',
			type: 'radio',
			sample: [
				{ text: '성공적', value: true },
				{ text: '실패', value: false }
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		if (e.constructor !== 'EriRequest') {
			stop();
			return;
		}
		const request = Eri.request[e.value.name];
		if (!request) {
			stop();
			return;
		}
		if (request.element.readyState === 4 && (request.element.status === 200 === this.방식)) next();
		else stop();
	}
};