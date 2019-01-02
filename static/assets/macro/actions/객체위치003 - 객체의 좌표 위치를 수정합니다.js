module.exports = {
	cid: '{859BDC09-B00C-4366-90E9-01725E281BEA}',
	version: '1.0.0',
	class: '객체/위치',
	title: '객체의 좌표 위치를 수정합니다',
	description: '객체 {{객체명}}의 좌표값 {{좌표종류}}(를)을 {{시간}}초를 거쳐 {{좌표값}}(으)로 {{편의성}} 이동합니다. <br><b>+=α</b>, <b>-=α</b> 표현식을 사용해서, 현재 위치에서 가산/감산할 수 있습니다.',
	variables: {
		'객체명': {
			text: '*',
			type: 'text',
			sample: 'character_name',
			skip: true
		},
		'좌표종류': {
			text: 'ｘ',
			type: 'radio',
			sample: [
				{
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
		'시간': {
			text: '0',
			type: 'text',
			skip: true
		},
		'좌표값': {
			text: '0',
			type: 'text'
		},
		'편의성': {
			text: '점점 매우 느리게',
			type: 'radio',
			sample: [
				{
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
				},
				{
					text: '반동 받아서 점점 빠르게',
					value: 'easeInBack'
				},
				{
					text: '반동 받아서 점점 느리게',
					value: 'easeOutBack'
				},
				{
					text: '통통 거리며 점점 빠르게',
					value: 'easeInBounce'
				},
				{
					text: '통통 거리며 점점 느리게',
					value: 'easeOutBounce'
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		const styleObj = {};
		styleObj[this.좌표종류] = this.좌표값;
		lve(this.객체명).animate(styleObj, this.시간 * 1000, this.편의성);
		next();
	}
};