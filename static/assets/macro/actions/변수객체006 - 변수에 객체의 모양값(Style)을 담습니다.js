module.exports = {
	cid: '{9245552F-F667-446F-973D-663487228958}',
	version: '1.0.0',
	class: '변수/객체',
	title: '변수에 객체의 모양을 담습니다',
	description: '{{스코프}}변수 {{변수명}}에 객체 {{객체명}}의 {{스타일명}} 모양을 담습니다.',
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
			text: '객체 모양 변수',
			type: 'text',
			sample: 'variable_name',
			skip: true
		},
		'객체명': {
			text: '객체명',
			type: 'text',
			sample: 'character_name'
		},
		'스타일명': {
			text: '색상',
			type: 'radio',
			sample: [{
					text: '글자 크기',
					value: 'fontSize'
				},
				{
					text: '글꼴',
					value: 'fontFamily'
				},
				{
					text: '글씨 굵게',
					value: 'fontWeight'
				},
				{
					text: '글씨 기울게',
					value: 'fontStyle'
				},
				{
					text: '글자 정렬',
					value: 'textAlign'
				},
				{
					text: '줄높이',
					value: 'lineHeight'
				},
				{
					text: '색상',
					value: 'color'
				},
				{
					text: '넓이',
					value: 'width'
				},
				{
					text: '높이',
					value: 'height'
				},
				{
					text: '비율',
					value: 'scale'
				},
				{
					text: '투명도',
					value: 'opacity'
				},
				{
					text: '흐림도',
					value: 'blur'
				},
				{
					text: '회전',
					value: 'rotate'
				},
				{
					text: '우선순위',
					value: 'zIndex'
				},
				{
					text: '외각 두께',
					value: 'borderWidth'
				},
				{
					text: '외각 색상',
					value: 'borderColor'
				},
				{
					text: '그림자 번짐도',
					value: 'shadowBlur'
				},
				{
					text: '그림자 색상',
					value: 'shadowColor'
				},
				{
					text: '그림자 ｘ좌표',
					value: 'shadowOffsetX'
				},
				{
					text: '그림자 ｙ좌표',
					value: 'shadowOffsetY'
				}
			]
		}
	},
	fn: function (next, stop, e) {
		let value;
		const tarObj = lve(this.객체명).get(0);
		switch (this.스타일명) {
			case 'width':
				{
					value = tarObj.width();
					break;
				}
			case 'height':
				{
					value = tarObj.height();
					break;
				}
			case 'fontWeight':
				{
					value = tarObj.css('fontWeight')[0] === 'bold' ? true : false;
					break;
				}
			case 'fontStyle':
				{
					value = tarObj.css('fontStyle')[0] === 'italic' ? true : false;
					break;
				}
			default:
				{
					value = lve(this.객체명).css(this.스타일명);
					break;
				}
		}
		switch (this.스코프) {
			case 'LOCAL':
				this.session[this.변수명] = value[0];
				break;
			case 'GLOBAL':
				Eri.variable[this.변수명] = value[0];
				break;
		}
		next();
	}
};