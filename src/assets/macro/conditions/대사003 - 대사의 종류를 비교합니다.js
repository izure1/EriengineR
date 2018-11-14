module.exports = {
	cid: '{2110b2dd-55e6-4687-8e89-8d048e8f3e72}',
	version: '1.0.0',
	class: '대사',
	title: '대사의 종류를 비교합니다',
	description: '위 사건의 대사의 종류가 {{대사종류}}(이)가 {{방식}} 작동합니다.',
	variables: {
		'대사종류': {
			text: '대사',
			type: 'radio',
			sample: [
				{
					text: '대사',
					value: 1
				},
				{
					text: '독백',
					value: 2
				}
			],
			skip: true
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
		if (e.value.dialogType === this.대사종류 === this.방식) next();
		else stop();
	}
};