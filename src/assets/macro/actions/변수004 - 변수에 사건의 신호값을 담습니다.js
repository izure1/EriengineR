module.exports = {
	cid: '{f47a325b-aeda-40b9-b34c-f50221e307a5}',
	version: '1.0.0',
	class: '변수',
	title: '변수에 사건의 신호값을 담습니다',
	description: '{{스코프}}변수 {{변수명}}에 위 사건의 신호의 값을 담습니다. 없다면 {{대체값}}(를)을 담습니다. <br>이 매크로는 사건이 <b>신호가 발생하면</b>일 경우에만 작동하며, 신호값으로 안녕하세요를 넘겼다면, 변수에 안녕하세요가 담깁니다.',
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
			text: '신호값',
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
		if (e.constructor !== 'EriCue') {
			stop();
			return;
		}
		const {
			value = this.대체값
		} = e.value;
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