module.exports = {
	cid: '{10fab02a-9448-4ceb-831f-e15730dca2e7}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/333',
	class: '변수',
	title: '배열 변수에 요소의 존재여부를 비교합니다',
	description: '{{스코프}} 배열 변수 {{변수명}}에 {{변수값}}(이)란 요소가 {{방식}} 작동합니다.',
	variables: {
		'스코프': {
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
			],
			skip: true
		},
		'변수명': {
			text: '변수명',
			type: 'text',
			sample: 'variable_name'
		},
		'변수값': {
			text: '변수값',
			type: 'text'
		},
		'방식': {
			text: '존재할 경우',
			type: 'radio',
			sample: [{
					text: '존재할 경우',
					value: 1
				},
				{
					text: '존재하지 않을 경우',
					value: 2
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		let variable = {};
		switch (this.스코프) {
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
		switch (this.방식) {
			case 1:
				{
					if (variable[this.변수명].indexOf(this.변수값) !== -1) next();
					else stop();
					break;
				}
			case 2:
				{
					if (variable[this.변수명].indexOf(this.변수값) === -1) next();
					else stop();
					break;
				}
			default:
				stop();
				break;
		}
	}
};