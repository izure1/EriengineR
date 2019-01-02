module.exports = {
	cid: '{f525494d-403b-4fa1-ad11-9f1f81a42a41}',
	version: '1.0.0',
	class: '변수/수학',
	title: '절대값을 구합니다',
	description: '{{스코프1}}변수 {{대상변수명}}의 절대값을 구합니다. 이 결과값을 {{스코프2}}변수 {{변수명}}에 담습니다.',
	variables: {
		'스코프1': {
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
		'대상변수명': {
			text: '결과값',
			type: 'text',
			sample: 'variable_name'
		},
		'스코프2': {
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
			text: '결과값',
			type: 'text',
			sample: 'variable_name',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		let targetVariable;
		switch (this.스코프1) {
			case 'LOCAL':
				targetVariable = this.session;
				break;
			case 'GLOBAL':
				targetVariable = Eri.variable;
				break;
		}
		const value = Math.abs(targetVariable[this.대상변수명]);
		switch (this.스코프1) {
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