module.exports = {
	cid: '{225D0959-A2E9-4F91-BE4E-CF383A02CB24}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/313',
	class: '대사',
	title: '대사의 자동재생여부를 비교합니다',
	description: '대사가 자동재생 중이 {{방식}} 작동합니다.',
	variables: {
		'방식': {
			text: '맞을 경우',
			type: 'radio',
			sample: [
				{ text: '맞을 경우', value: true },
				{ text: '아닐 경우', value: false }
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		if (Eri.game.dialog.auto === this.방식) next();
		else stop();
	}
};