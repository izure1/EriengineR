module.exports = {
	cid: '{E451D3C3-2251-4DE4-A1A4-3F136840D1BB}',
	version: '1.0.0',
	class: '변수',
	title: '변수를 삭제합니다',
	description: '{{스코프}} {{변수명}}(를)을 삭제합니다.',
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
			text: '주인공이름',
			type: 'text',
			sample: 'variable_name'
		}
	},
	fn: function (next, stop, e) {
		switch (this.스코프) {
			case 'LOCAL':
				delete this.session[this.변수명];
				break;
			case 'GLOBAL':
				delete Eri.variable[this.변수명];
				break;
		}
		next();
	}
};