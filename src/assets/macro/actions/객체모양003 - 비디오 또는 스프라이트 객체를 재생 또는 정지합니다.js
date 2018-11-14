module.exports = {
	cid: '{96E79FDF-6FB7-42BD-B8CB-FA0F679D334E}',
	version: '1.0.0',
	class: '객체/모양',
	title: '비디오 또는 스프라이트 객체를 재생 또는 정지합니다',
	description: '객체 {{객체명}}(를)을 {{작업}}합니다.',
	variables: {
		'객체명': {
			text: '*',
			type: 'value',
			sample: 'character_name'
		},
		'작업': {
			text: '재생',
			type: 'radio',
			sample: [
				{
					text: '재생',
					value: 'play'
				},
				{
					text: '일시정지',
					value: 'pause'
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		switch (this.작업) {
			case 'play': {
				lve(this.객체명).play();
				break;
			}
			case 'pause': {
				lve(this.객체명).pause();
				break;
			}
		}
		next();
	}
};