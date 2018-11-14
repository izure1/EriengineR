module.exports = {
	cid: '{e345c772-e128-4edd-bf2a-52c95ffcb2ad}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/326',
	class: '제어',
	title: '신호의 값을 비교합니다',
	description: '위 사건의 신호의 값이 {{값}}(과)와 {{방식}}할 경우 작동합니다.',
	variables: {
		'값': {
			text: 'null',
			type: 'value'
		},
		'방식': {
			text: '일치',
			type: 'radio',
			sample: [{
					text: '일치',
					value: 1
				},
				{
					text: '불일치',
					value: 2
				},
				{
					text: '이하',
					value: 3
				},
				{
					text: '이상',
					value: 4
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		if (e.constructor !== 'EriCue') {
			stop();
			return;
		}
		switch (this.방식) {
			case 1:
				{
					if (e.value.value === this.값) next();
					else stop();
					break;
				}
			case 2:
				{
					if (e.value.value !== this.값) next();
					else stop();
					break;
				}
			case 3:
				{
					if (e.value.value <= this.값) next();
					else stop();
					break;
				}
			case 4:
				{
					if (e.value.value >= this.값) next();
					else stop();
					break;
				}
			default:
				{
					stop();
					break;
				}
		}
	}
};