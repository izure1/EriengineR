module.exports = {
	cid: '{70F866A9-6986-495B-AE24-E8BF5860FCF9}',
	version: '1.0.0',
	class: '객체/모양',
	title: '문자열 객체의 정렬방식을 수정합니다',
	description: '객체 {{객체명}}의 문장을 {{정렬방식}}로 바꿉니다. <br>이는 문자열 객체에만 적용되며, <b>객체의 넓이가 문자열의 길이보다 길어야 작동합니다.</b>',
	variables: {
		'객체명': {
			text: '대사창',
			type: 'value',
			sample: 'character_name',
			skip: true
		},
		'정렬방식': {
			text: '좌측정렬',
			type: 'radio',
			sample: [
				{
					text: '좌측정렬',
					value: 'left'
				},
				{
					text: '가운데정렬',
					value: 'center'
				},
				{
					text: '우측정렬',
					value: 'right'
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		lve(this.객체명).css({ textAlign: this.정렬방식 });
		next();
	}
};