module.exports = {
	cid: '{ba8741d4-492d-4173-9175-98a6c64eddce}',
	version: '1.0.0',
	class: '변수/수학',
	title: '탄젠트 값을 구합니다',
	description: '{{값}}의 탄젠트를 구합니다. 이 결과값을 {{스코프}}변수 {{변수명}}에 담습니다.',
	variables: {
		'값': {
			text: '0',
			type: 'value'
		},
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
			text: '탄젠트값',
			type: 'value',
			sample: 'variable_name',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		switch (this.스코프) {
			case 'LOCAL':
				this.session[this.변수명] = Math.tan(this.값);
				break;
			case 'GLOBAL':
				Eri.variable[this.변수명] = Math.tan(this.값);
				break;
		}
		next();
	}
};