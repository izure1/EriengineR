module.exports = {
	cid: '{d0ba96fd-ed60-479e-b35f-833081ce4e23}',
	version: '1.0.0',
	class: '대사',
	title: '대사의 이름을 비교합니다',
	description: '위 사건의 대사를 말한 인물의 이름이 {{이름}}(과)와 {{방식}} 작동합니다.',
	variables: {
		'이름': {
			text: '나',
			type: 'value',
			sample: 'character_name'
		},
		'방식': {
			text: '맞을 경우',
			type: 'radio',
			sample: [{
					text: '맞을 경우',
					value: true
				},
				{
					text: '아닐 경우',
					value: false
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		if (e.constructor !== 'DialogEvent') {
			stop();
			return;
		}
		if (e.value.dialogName === this.이름 === this.방식) next();
		else stop();
	}
};