module.exports = {
	cid: '{03eb3b78-dabd-48d4-b838-4f466133b6ea}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/313',
	class: '대사',
	title: '대사의 출력상태를 비교합니다',
	description: '대사가 출력상태가 {{출력상태}}(이)가 {{방식}} 작동합니다.',
	variables: {
		'출력상태':{
			text: '출력 중',
			type: 'radio',
			sample: [
				{
					text: '출력 준비',
					value: 'READY'
				},
				{
					text: '출력 중',
					value: 'RUNNING'
				},
				{
					text: '출력 대기',
					value: 'WAITING'
				}
			]
		},
		'방식': {
			text: '맞을 경우',
			type: 'radio',
			sample: [
				{ text: '맞을 경우', value: true },
				{ text: '아닐 경우', value: false }
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		if (Eri.system.dialog.status === this.방식) next();
		else stop();
	}
};