module.exports = {
	cid: '{75a35cfa-aab9-4950-b896-e8966f764518}',
	version: '1.0.0',
	class: '변수/수학',
	title: '코사인 값을 구합니다',
	description: '{{값}}의 코사인을 구합니다. 이 결과값을 {{스코프}}변수 {{변수명}}에 담습니다.',
	variables: {
		'값': {
			text: '0',
			type: 'text'
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
			text: '코사인값',
			type: 'text',
			sample: 'variable_name',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		switch (this.스코프) {
			case 'LOCAL':
				this.session[this.변수명] = Math.cos(this.값);
				break;
			case 'GLOBAL':
				Eri.variable[this.변수명] = Math.cos(this.값);
				break;
		}
		next();
	}
};