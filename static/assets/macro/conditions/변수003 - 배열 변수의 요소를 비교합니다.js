module.exports = {
	cid: '{004e1253-bb1c-47be-b749-647fc4a2188f}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/342',
	class: '변수',
	title: '배열 변수의 요소를 비교합니다',
	description: '{{스코프}} 배열 변수 {{변수명}}의 {{인덱스}}번 째 요소가 {{변수값}}(과)와 {{방식}}(일)할 경우 작동합니다.',
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
		'인덱스':{
			text: '0',
			type: 'text'
		},
		'변수값': {
			text: 'undefined',
			type: 'text'
		},
		'방식': {
			text: '일치',
			type: 'radio',
			sample: [
				{ text: '일치', value: 1 },
				{ text: '불일치', value: 2 },
				{ text: '이하', value: 3 },
				{ text: '이상', value: 4 }
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
			case 1: {
				if (variable[this.변수명][this.인덱스] === this.변수값) next();
				else stop();
				break;
			}
			case 2: {
				if (variable[this.변수명][this.인덱스] !== this.변수값) next();
				else stop();
				break;
			}
			case 3: {
				if (variable[this.변수명][this.인덱스] <= this.변수값) next();
				else stop();
				break;
			}
			case 4: {
				if (variable[this.변수명][this.인덱스] >= this.변수값) next();
				else stop();
				break;
			}
			default: {
				stop();
				break;
			}
		}
	}
};