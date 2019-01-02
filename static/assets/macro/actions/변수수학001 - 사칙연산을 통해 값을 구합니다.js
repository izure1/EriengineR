module.exports = {
	cid: '{19f929dc-5e22-44cd-8ebb-87c8fbf48065}',
	version: '1.0.0',
	class: '변수/수학',
	title: '사칙연산을 통해 값을 구합니다',
	description: '{{항1}} {{부호1}} {{항2}} {{부호2}} {{항3}} {{부호3}} {{항4}} {{부호4}} {{항5}} (를)을 계산합니다. <br>이 결과값을 {{스코프}}변수 {{변수명}}에 담습니다. 이 계산은 사칙연산을 따릅니다.',
	variables: {
		'항1': {
			text: '0',
			type: 'text'
		},
		'부호1': {
			text: '＋',
			type: 'radio',
			sample: [{
					text: '＋',
					value: '+'
				},
				{
					text: '－',
					value: '-'
				},
				{
					text: '×',
					value: '*'
				},
				{
					text: '÷',
					value: '/'
				}
			]
		},
		'항2': {
			text: '0',
			type: 'text'
		},
		'부호2': {
			text: '＋',
			type: 'radio',
			sample: [{
					text: '＋',
					value: '+'
				},
				{
					text: '－',
					value: '-'
				},
				{
					text: '×',
					value: '*'
				},
				{
					text: '÷',
					value: '/'
				}
			],
			skip: true
		},
		'항3': {
			text: '0',
			type: 'text',
			skip: true
		},
		'부호3': {
			text: '＋',
			type: 'radio',
			sample: [{
					text: '＋',
					value: '+'
				},
				{
					text: '－',
					value: '-'
				},
				{
					text: '×',
					value: '*'
				},
				{
					text: '÷',
					value: '/'
				}
			],
			skip: true
		},
		'항4': {
			text: '0',
			type: 'text',
			skip: true
		},
		'부호4': {
			text: '＋',
			type: 'radio',
			sample: [{
					text: '＋',
					value: '+'
				},
				{
					text: '－',
					value: '-'
				},
				{
					text: '×',
					value: '*'
				},
				{
					text: '÷',
					value: '/'
				}
			],
			skip: true
		},
		'항5': {
			text: '0',
			type: 'text',
			skip: true
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
			text: '연산값',
			type: 'text',
			sample: 'variable_name',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		const sections = [null];
		const plusIndexs = [];
		const variable = this;
		for (let i = 1; typeof variable[`항${i}`] === 'number'; i++) {
			sections.push(variable[`항${i}`]);
		}
		for (let i = 1; variable[`부호${i}`]; i++) {
			const x = sections[i] || 0;
			const y = sections[i + 1] || 0;
			const operator = variable[`부호${i}`];
			let result = 0;
			switch (operator) {
				case '+':
				case '-':
					plusIndexs.push(operator);
					break;
				case '*':
					result = x * y;
					sections[i] = null;
					sections[i + 1] = result;
					break;
				case '/':
					result = x / y;
					sections[i] = null;
					sections[i + 1] = result;
					break;
			}
		}
		let len = sections.length;
		while (len--) {
			if (sections[len] === null) {
				sections.splice(len, 1);
			}
		}
		let result = 0;
		for (const operator of plusIndexs) {
			const x = sections.shift() || 0;
			const y = sections.shift() || 0;
			switch (operator) {
				case '+':
					result = x + y;
					break;
				case '-':
					result = x - y;
					break;
			}
			sections.unshift(result);
		}
		const value = sections[0];
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