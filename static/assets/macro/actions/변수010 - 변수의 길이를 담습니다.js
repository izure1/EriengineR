module.exports = {
	cid: '{6bb186e7-16d4-4ae7-9ac7-778f548ed334}',
	version: '1.0.0',
	class: '변수',
	title: '변수의 길이를 담습니다',
	description: '{{스코프}}변수 {{변수명}}(를)에 {{스코프2}}변수 {{대상변수명}}의 길이를 담습니다. <br>숫자, 문자열 변수일 경우 문자의 길이, 배열형 변수일 경우 요소의 갯수, 구조체 변수일 경우 속성의 갯수가 담깁니다.',
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
			text: '숫자_변수값길이',
			type: 'value',
			sample: 'variable_name',
			skip: true
		},
		'스코프2': {
			text: '지역 또는 전역',
			type: 'radio',
			sample: [{
					text: '지역',
					value: 'LOCAL'
				},
				{
					text: '전역',
					value: 'GLOBAL'
				},
				{
					text: '지역 또는 전역',
					value: 'CLOSURE'
				}
			]
		},
		'대상변수명': {
			text: '주인공이름',
			type: 'value',
			sample: 'variable_name'
		}
	},
	fn: function (next, stop, e) {
		let variable = {};
		switch (this.스코프2) {
			case 'LOCAL':
				variable = Object.assign({}, this.session);
				break;
			case 'GLOBAL':
				variable = Object.assign({}, Eri.variable);
				break;
			case 'CLOSURE':
				// 1순위로 지역변수를 체크
				// 2순위로 전역변수를 체크. Object.assign 함수는 전역변수(Eri.variable) 위에 지역변수(this.session)을 덮어쓴다.
				variable = Object.assign({}, Eri.variable, this.session);
				break;
		}
		let length;
		try {
			length = Object.keys(variable[this.대상변수명]).length;
		} catch (e) {
			length = 0;
		};
		switch (this.스코프) {
			case 'LOCAL':
				this.session[this.변수명] = length;
				break;
			case 'GLOBAL':
				Eri.variable[this.변수명] = length;
				break;
		}
		next();
	}
};