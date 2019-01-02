module.exports = {
	cid: '{f8cba04d-5a9b-4c15-91c7-0b39b09a2ac9}',
	version: '1.0.0',
	class: '객체/모양',
	title: '객체의 수직 정렬 기준을 수정합니다',
	description: '객체 {{객체명}}의 수직 정렬 기준을 {{정렬값}}(으)로 수정합니다. <br>기준점을 위로 한다면, y좌표로부터 위로, 아래로 한다면 아래로 그려집니다. <br>기본값은 <b>위</b> 입니다.',
	variables: {
		'객체명': {
			text: '*',
			type: 'text',
			sample: 'character_name'
		},
		'정렬값': {
			text: '위',
			type: 'radio',
			sample: [{
					text: '위',
					value: 'top'
				},
				{
					text: '중앙',
					value: 'middle'
				},
				{
					text: '아래',
					value: 'bottom'
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		lve(this.객체명).css({
			verticalAlign: this.정렬값
		});
		next();
	}
};