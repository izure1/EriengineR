module.exports = {
	cid: '{977dcfa4-9ae2-41d9-9bc4-32c937f795c9}',
	version: '1.0.0',
	class: '객체/속성',
	title: '객체의 마우스 무시여부를 설정합니다',
	description: '객체 {{객체명}}가 마우스를 {{제어여부}}. <br>무시로 설정하면, 이 객체에 마우스를 올리거나 클릭하여도 스크립트가 작동하지 않습니다. <br>이는 다른 객체를 가려서 방해하는 객체에 사용하면 좋습니다.',
	variables: {
		'객체명': {
			text: '*',
			type: 'text',
			sample: 'character_name'
		},
		'제어여부':{
			text: '무시합니다',
			type: 'radio',
			sample: [
				{
					text: '무시합니다',
					value: true
				},
				{
					text: '무시하지 않습니다',
					value: 'none'
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		lve(this['객체명']).css({
			pointerEvents: this.제어여부
		});
		next();
	}
};