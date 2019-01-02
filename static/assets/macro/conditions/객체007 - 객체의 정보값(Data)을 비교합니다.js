module.exports = {
	cid: '{C10F8AFD-C56E-469E-A733-D393B07C5FA6}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/310',
	class: '객체',
	title: '객체의 정보값를 비교합니다',
	description: '객체 {{객체명}}의 {{정보명}} 정보의 값이 {{정보값}}(과)와 {{방식}}(일)할 경우 작동합니다.',
	variables: {
		'객체명': {
			text: '나',
			type: 'text',
			sample: 'character_name'
		},
		'정보명': {
			text: '호감도',
			type: 'text',
			sample: 'data_name',
			skip: true
		},
		'정보값': {
			text: 'undefined',
			type: 'text'
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
		const target = lve(this.객체명).get(0);
		if (lve.instanceof(target) === false) {
			stop();
			return;
		}
		switch (this.방식) {
			case 1:
				{
					if (target.data(this.정보명)[0] === this.정보값) next();
					else stop();
					break;
				}
			case 2:
				{
					if (target.data(this.정보명)[0] !== this.정보값) next();
					else stop();
					break;
				}
			case 3:
				{
					if (target.data(this.정보명)[0] <= this.정보값) next();
					else stop();
					break;
				}
			case 4:
				{
					if (target.data(this.정보명)[0] >= this.정보값) next();
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