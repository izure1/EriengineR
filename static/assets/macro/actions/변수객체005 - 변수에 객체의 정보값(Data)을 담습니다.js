module.exports = {
	cid: '{29BCD705-6779-45D4-ABA2-24906C685E3C}',
	version: '1.0.0',
	class: '변수/객체',
	title: '변수에 객체의 정보값을 담습니다',
	description: '{{스코프}}변수 {{변수명}}에 객체 {{객체명}}의 {{정보명}} 정보값을 담습니다. <br>없다면 {{대체값}}(를)을 담습니다.',
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
			text: '객체 정보 변수',
			type: 'text',
			sample: 'variable_name',
			skip: true
		},
		'객체명': {
			text: '객체명',
			type: 'text',
			sample: 'character_name'
		},
		'정보명': {
			text: '호감도',
			type: 'text',
			sample: 'data_name'
		},
		'대체값': {
			text: 'undefined',
			type: 'text',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		let value = lve(this.객체명).get(0).data(this.정보명)[0];
		if (value === undefined) {
			value = this.대체값;
		}
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