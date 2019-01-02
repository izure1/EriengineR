module.exports = {
	cid: '{fc944805-5218-4760-a110-6736ff235767}',
	version: '1.0.0',
	class: '객체/위치',
	title: '객체를 그만 따라다니게 만듭니다',
	description: '객체 {{객체명}}(이)가 {{좌표}} 좌표를 그만 따라다니게 만듭니다.',
	variables: {
		'객체명': {
			text: '카메라',
			type: 'text',
			sample: 'character_name'
		},
		'좌표': {
			text: '모든',
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
				},
				{
					text: '모든',
					value: null
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		lve(this.객체명).unfollow(this.좌표);
		next();
	}
};