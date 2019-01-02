module.exports = {
	cid: '{29e8d9c4-9859-4fd0-b907-93f1a1e0c97d}',
	version: '1.0.0',
	class: '변수/수학',
	title: '제곱 값을 구합니다',
	description: '{{값}}의 {{제곱}}제곱 값을 구합니다. 이 결과값을 {{스코프}}변수 {{변수명}}에 담습니다.',
	variables: {
		'값': {
			text: '2',
			type: 'text'
		},
		'제곱': {
			text: '3',
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
			text: '제곱값',
			type: 'text',
			sample: 'variable_name',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		switch (this.스코프) {
			case 'LOCAL':
				this.session[this.변수명] = Math.pow(this.값, this.제곱);
				break;
			case 'GLOBAL':
				Eri.variable[this.변수명] = Math.pow(this.값, this.제곱);
				break;
		}
		next();
	}
};