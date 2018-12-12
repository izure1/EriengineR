module.exports = {
	cid: '{0EBB430A-3A3C-41D1-B82D-B21E9AD03B4A}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/325',
	class: '제어',
	title: '신호의 이름을 비교합니다',
	description: '위 사건의 신호의 이름이 {{신호명}}(과)와 {{방식}}할 경우 작동합니다.',
	variables: {
		'신호명': {
			text: '프롤로그 종료',
			type: 'value',
			sample: 'cue_name'
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
		if (e.constructor !== 'EriCue'){
			stop();
			return;
		}
		if (this.신호명 === e.value.name === this.방식) next();
		else stop();
	}
};