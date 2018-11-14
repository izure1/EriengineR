module.exports = {
	cid: '{420e3582-7e12-43fc-857f-21ba026a358c}',
	version: '1.0.0',
	class: '객체/속성',
	title: '객체의 스프라이트 속성을 수정합니다',
	description: '객체 {{객체명}}의 스프라이트 {{속성}}(를)을 {{속성값}}(으)로 수정합니다.',
	variables: {
		'객체명': {
			text: '나',
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
		},
		'속성값': {
			text: '1',
			type: 'value',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		let target;

		let spriteStage;
		let spriteObj;

		target = lve(this.객체명).get(0);

		if (!target) {
			stop();
			return;
		}

		spriteStage = target.sprite('stage')[0];

		spriteObj = {};
		spriteObj[this.속성] = this.속성값;

		if (this.속성 === 'fps') {
			spriteObj[this.속성] *= spriteStage;
		}

		target.sprite(spriteObj);
		next();
	}
};