module.exports = {
	cid: '{D5925374-5BA8-45AB-80F1-31B5E24B99F2}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/330',
	class: '화면/효과',
	title: '전체화면 여부를 비교합니다',
	description: '전체화면 도중이 {{방식}} 작동합니다.',
	variables: {
		'방식': {
			text: '맞을 경우',
			type: 'radio',
			sample: [{
					text: '맞을 경우',
					value: true
				},
				{
					text: '아닐 경우',
					value: false
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		const canvas = document.querySelector('#playground');
		const fullscreenState = canvas.getAttribute('data-fullscreen') || canvas.getAttribute('data-fullscreen-cordova') || false;
		if (!!JSON.parse(fullscreenState) === this.방식) {
			next();
		} else stop();
	}
};