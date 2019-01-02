module.exports = {
	cid: '{14496053-ec7a-4204-a6fd-5d5279a10302}',
	version: '1.0.0',
	class: '변수/객체',
	title: '변수에 객체의 장소명을 담습니다',
	description: '{{스코프}}변수 {{변수명}}에 객체 {{객체명}}의 장소명을 담습니다.',
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
			text: '장소명',
			type: 'text',
			sample: 'variable_name',
			skip: true
		},
		'객체명': {
			text: '객체명',
			type: 'text',
			sample: 'character_name'
		}
	},
	fn: function (next, stop, e) {
		let value;
		let target;

		target = lve(this.객체명).get(0);

		if (!target){
			stop();
			return;
		}

		value = target.attr('scene')[0];

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