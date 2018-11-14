module.exports = {
	cid: '{cea560e1-a7ba-4a2d-b559-cb00c9508f7c}',
	version: '1.0.0',
	class: '객체/속성',
	title: '객체의 유형을 수정합니다',
	description: '객체 {{객체명}}의 유형을 {{속성값}}(으)로 수정합니다.',
	variables: {
		'객체명': {
			text: '나',
			type: 'value',
			sample: 'character_name'
		},
		'속성값': {
			text: '이미지',
			type: 'radio',
			sample: [{
					text: '이미지',
					value: 'image'
				},
				{
					text: '스프라이트',
					value: 'sprite'
				},
				{
					text: '카메라',
					value: 'camera'
				},
				{
					text: '문자열',
					value: 'text'
				},
				{
					text: '비디오',
					value: 'video'
				},
				{
					text: '사각형',
					value: 'square'
				},
				{
					text: '원형',
					value: 'circle'
				}
			]
		}
	},
	fn: function (next, stop, e) {
		lve(this.객체명).attr({
			type: this.속성값
		});
		next();
	}
};