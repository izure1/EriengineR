module.exports = {
	cid: '{7b371f0e-4462-4acf-91b8-52bb6421beb6}',
	version: '1.0.0',
	class: '객체',
	title: '객체의 유형을 비교합니다',
	description: '객체 {{객체명}}의 유형이 {{속성값}}(과)와 {{방식}}(일)할 경우 작동합니다.',
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
		},
		'방식': {
			text: '일치',
			type: 'radio',
			sample: [{
					text: '일치',
					value: 1
				},
				{
					text: '불일치',
					value: 2
				},
				{
					text: '이하',
					value: 3
				},
				{
					text: '이상',
					value: 4
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		const target = lve(this.객체명).get(0);
		if (lve.instanceof(target) === false) {
			stop();
			return;
		}
		switch (this.방식) {
			case 1:
				{
					if (target.attr('type')[0] === this.속성값) next();
					else stop();
					break;
				}
			case 2:
				{
					if (target.attr('type')[0] !== this.속성값) next();
					else stop();
					break;
				}
			case 3:
				{
					if (target.attr('type')[0] <= this.속성값) next();
					else stop();
					break;
				}
			case 4:
				{
					if (target.attr('type')[0] >= this.속성값) next();
					else stop();
					break;
				}
			default:
				{
					stop();
					break;
				}
		}
	}
};