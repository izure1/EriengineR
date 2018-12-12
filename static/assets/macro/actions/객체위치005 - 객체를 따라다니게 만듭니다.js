module.exports = {
	cid: '{f9d067e2-646f-4e59-bbab-38977e74c2c9}',
	version: '1.0.0',
	class: '객체/위치',
	title: '객체를 따라다니게 만듭니다',
	description: '객체 {{객체명}}(이)가 {{좌표}}좌표를 {{값}}의 거리를 두고 객체 {{대상객체명}}(를)을 따라다니게 만듭니다. <br>이는 주인공을 따라다니는 카메라를 구현하는데 좋습니다.',
	variables: {
		'객체명': {
			text: '카메라',
			type: 'value',
			sample: 'character_name'
		},
		'좌표': {
			text: 'ｚ',
			type: 'radio',
			sample: [{
					text: 'ｘ',
					value: 'left'
				},
				{
					text: 'ｙ',
					value: 'bottom'
				},
				{
					text: 'ｚ',
					value: 'perspective'
				}
			],
			skip: true
		},
		'값': {
			text: '100',
			type: 'value'
		},
		'대상객체명': {
			text: '주인공',
			type: 'value',
			sample: 'character_name'
		}
	},
	fn: function (next, stop, e) {
		// 팔로우 좌표 지정
		const offset = {};
		offset[this.좌표] = this.값;
		lve(this.객체명).follow(this.대상객체명, offset);
		next();
	}
};