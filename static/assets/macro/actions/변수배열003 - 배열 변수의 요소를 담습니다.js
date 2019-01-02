module.exports = {
	cid: '{f72b636b-999b-494a-9e27-05b624600d14}',
	version: '1.0.0',
	class: '변수/배열',
	title: '배열 변수의 요소를 담습니다',
	description: '{{스코프}} 배열 변수 {{배열변수명}}의 {{인덱스}}번 째 요소를 {{스코프2}}변수 {{변수명}}에 담습니다. <br>요소가 없을 경우 {{대체값}}(를)을 담습니다.',
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
		'배열변수명': {
			text: '배열',
			type: 'text',
			sample: 'variable_name'
		},
		'인덱스': {
			text: '0',
			type: 'text'
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
			text: '요소값',
			type: 'text',
			sample: 'variable_name',
			skip: true
		},
		'대체값': {
			text: 'undefined',
			type: 'text',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		let targetVariable;
		switch (this.스코프) {
			case 'LOCAL':
				targetVariable = this.session[this.배열변수명];
				break;
			case 'GLOBAL':
				targetVariable = Eri.variable[this.배열변수명];
				break;
			case 'CLOSURE':
				if (this.배열변수명 in this.session) targetVariable = this.session[this.배열변수명];
				else if (this.배열변수명 in Eri.variable) targetVariable = Eri.variable[this.배열변수명];
				break;
		}
		let targetValue = targetVariable[this.인덱스];
		if (targetValue === undefined) targetValue = this.대체값;
			switch (this.스코프2) {
				case 'LOCAL':
					this.session[this.변수명] = targetValue;
					break;
				case 'GLOBAL':
					Eri.variable[this.변수명] = targetValue;
					break;
			}
			next();
	}
};