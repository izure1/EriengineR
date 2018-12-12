module.exports = {
	cid: '{5f565686-5c53-4275-a76e-4aae1ec60582}',
	version: '1.0.0',
	class: '변수/객체',
	title: '변수에 객체의 스프라이트 속성값을 담습니다',
	description: '{{스코프}}변수 {{변수명}}에 객체 {{객체명}}의 스프라이트 {{속성}}(를)을 담습니다.',
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
			text: '객체 속성 변수',
			type: 'value',
			sample: 'variable_name',
			skip: true
		},
		'객체명': {
			text: '객체명',
			type: 'value',
			sample: 'character_name'
		},
		'속성': {
			text: '모션 개수',
			type: 'radio',
			sample: [{
					text: '모션 개수',
					value: 'stage'
				},
				{
					text: '초당 반복 횟수',
					value: 'fps'
				}
			]
		}
	},
	fn: function (next, stop, e) {
		let value;
		let target;

		target = lve(this.객체명).get(0);

		if (!target) {
			stop();
			return;
		}

		value = target.sprite(this.속성)[0];

		if (value === undefined) {
			value = null;
		}

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