module.exports = {
	cid: '{302ec61d-ac3f-4f49-b159-42e48a838c30}',
	version: '1.0.0',
	class: '변수/배열',
	title: '구조체 변수의 요소를 담습니다',
	description: '{{스코프}} 구조체 변수 {{구조체변수명}}의 속성 {{속성명}}의 요소값를 {{스코프2}}변수 {{변수명}}에 담습니다. <br>요소가 없을 경우 {{대체값}}(를)을 담습니다.',
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
		'구조체변수명': {
			text: '구조체',
			type: 'value',
			sample: 'variable_name'
		},
		'속성명': {
			text: '속성명',
			type: 'value',
			sample: 'variable_object_key'
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
			type: 'value',
			sample: 'variable_name',
			skip: true
		},
		'대체값': {
			text: 'undefined',
			type: 'value',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		let targetVariable;
		switch (this.스코프) {
			case 'LOCAL':
				targetVariable = this.session[this.구조체변수명];
				break;
			case 'GLOBAL':
				targetVariable = Eri.variable[this.구조체변수명];
				break;
			case 'CLOSURE':
				if (this.구조체변수명 in this.session) targetVariable = this.session[this.구조체변수명];
				else if (this.구조체변수명 in Eri.variable) targetVariable = Eri.variable[this.구조체변수명];
				break;
		}
		let targetValue;
		if (this.속성명 in targetVariable) targetValue = targetVariable[(this.속성명 + '')];
		else targetValue = this.대체값;
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