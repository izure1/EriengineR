module.exports = {
	cid: '{0F6B57A2-536B-4BF8-8D49-B78A8EFF151D}',
	version: '1.0.0',
	class: '변수/객체',
	title: '변수에 객체의 좌표값<small>(Position)</small>을 담습니다',
	description: '{{스코프}}변수 {{변수명}}에 객체 {{객체명}}의 {{좌표명}} 좌표값을 담습니다.',
	variables: {
		'스코프': {
			text: '지역',
			type: 'radio',
			sample: [{
					text: '지역',
					value: 'LOCAL'
				},
				{
					text: '전역',
					value: 'GLOBAL'
				}
			],
			skip: true
		},
		'변수명': {
			text: '객체 위치 변수',
			type: 'value',
			sample: 'variable_name',
			skip: true
		},
		'객체명': {
			text: '객체명',
			type: 'value',
			sample: 'character_name'
		},
		'좌표명': {
			text: 'ｘ',
			type: 'radio',
			sample: [
				{
					text: 'ｘ',
					value: 'left'
				},
				{
					text: 'ｙ',
					value: 'bottom'
				},
				{
					text: 'ｚ',
					value: 'perspective'
				}
			]
		}
	},
	fn: function (next, stop, e) {
		const value = lve(this.객체명).css(this.좌표명)[0];
		switch (this.스코프) {
			case 'LOCAL':
				this.session[this.변수명] = value;
				break;
			case 'GLOBAL':
				Eri.variable[this.변수명] = value;
				break;
		}
		next();
	}
};