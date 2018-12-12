module.exports = {
	cid: '{cee6663c-0602-428e-8f5d-7ddb7e4f54e9}',
	version: '1.0.0',
	class: '객체/속성',
	title: '객체에 마스크 레이어 객체를 추가 또는 제거합니다',
	description: '객체 {{객체명}}(를)을 객체 {{대상객체명}}의 마스크 레이어로 {{작업}}. <br>마스크 레이어 객체란, 대상을 주체와 겹쳐진 부분만 보이게 만드는 것입니다. <br>대상 객체는 주체 객체보다 앞에 있어야 합니다.',
	variables: {
		'객체명': {
			text: '주체',
			type: 'value',
			sample: 'character_name'
		},
		'대상객체명': {
			text: '대상',
			type: 'value',
			sample: 'character_name'
		},
		'작업': {
			text: '만듭니다',
			type: 'radio',
			sample: [{
					text: '만듭니다',
					value: 1
				},
				{
					text: '만들지 않습니다',
					value: 2
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		switch (this.작업) {
			case 1:
				{
					lve(this.대상객체명).mask(this.객체명);
					break;
				}
			case 2:
				{
					lve(this.대상객체명).unmask();
					break;
				}
		}
		next();
	}
};