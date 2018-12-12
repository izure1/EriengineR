module.exports = {
	cid: '{81855dee-034c-4894-b323-0c4ff8cc596a}',
	version: '1.0.0',
	class: '대사',
	title: '대사의 내용을 비교합니다',
	description: '위 사건의 대사의 내용이 {{내용}}(이)가 {{방식}} 작동합니다.',
	variables: {
		'내용': {
			text: '안녕하세요',
			type: 'text'
		},
		'방식': {
			text: '맞을 경우',
			type: 'radio',
			sample: [{
					text: '맞을 경우',
					value: true
				},
				{
					text: '아닐 경우',
					value: false
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		if (e.constructor !== 'DialogEvent') {
			stop();
			return;
		}
		if (e.value.dialogText === this.내용 === this.방식) next();
		else stop();
	}
};