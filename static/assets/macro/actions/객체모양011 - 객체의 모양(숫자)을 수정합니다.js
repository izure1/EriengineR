module.exports = {
	cid: '{B1B9C557-D60C-4CDD-A383-C34F95C90CEE}',
	version: '1.0.0',
	class: '객체/모양',
	title: '객체의 모양(숫자)을 수정합니다',
	description: '객체 {{객체명}}에 {{스타일명}}(이)란 모양을 {{시간}}초를 거쳐 {{스타일값}}(으)로 {{편의성}} 수정합니다. <br><b>+=α</b>, <b>-=α</b> 표현식을 사용해서, 현재 값에서 가산/감산할 수 있습니다.',
	variables: {
		'객체명': {
			text: '*',
			type: 'text',
			sample: 'character_name',
			skip: true
		},
		'스타일명': {
			text: '모양',
			type: 'radio',
			sample: [{
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
					text: '외각 두께',
					value: 'borderWidth'
				},
				{
					text: '그림자 번짐도',
					value: 'shadowBlur'
				},
				{
					text: '그림자 ｘ좌표',
					value: 'shadowOffsetX'
				},
				{
					text: '그림자 ｙ좌표',
					value: 'shadowOffsetY'
				},
				{
					text: '글자 크기',
					value: 'fontSize'
				},
				{
					text: '우선순위',
					value: 'zIndex'
				}
			]
		},
		'시간': {
			text: '0',
			type: 'text',
			skip: true
		},
		'편의성': {
			text: '일정하게',
			type: 'radio',
			sample: [{
					text: '일정하게',
					value: 'linear'
				},
				{
					text: '점점 빠르게',
					value: 'easeInSine'
				},
				{
					text: '점점 느리게',
					value: 'easeOutSine'
				},
				{
					text: '점점 매우 빠르게',
					value: 'easeInExpo'
				},
				{
					text: '점점 매우 느리게',
					value: 'easeOutExpo'
				},
				{
					text: '점점 빨라졌다가 점점 느리게',
					value: 'easeInOutSine'
				},
				{
					text: '점점 매우 빨라졌다가 점점 매우 느리게',
					value: 'easeInOutExpo'
				}
			],
			skip: true
		},
		'스타일값': {
			text: '100',
			type: 'text'
		}
	},
	fn: function (next, stop, e) {
		// TODO : 투명도, 비율은 1 = 100% 으로 수정해야함
		const styleObj = {};
		const styleData = {};
		// 캐쉬값 가지기
		switch (this.스타일명) {
			case 'opacity':
				{
					this.스타일값 /= 100;
					break;
				}
			case 'scale':
				{
					this.스타일값 /= 100;
					break;
				}
		}
		styleObj[this.스타일명] = styleData[`__${this.스타일명}`] = this.스타일값;
		lve(this.객체명).animate(styleObj, this.시간 * 1000, this.편의성).data(styleData);
		next();
	}
};