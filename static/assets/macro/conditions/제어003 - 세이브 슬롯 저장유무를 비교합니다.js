module.exports = {
	cid: '{AE7D4C88-18AA-4F12-9618-2797B36D582F}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/324',
	class: '제어',
	title: '세이브 슬롯 저장 여부를 비교합니다',
	description: '세이브 슬롯 {{슬롯번호}}번에 게임이 {{방식}} 작동합니다.',
	variables: {
		'슬롯번호': {
			text: '1',
			type: 'text'
		},
		'방식': {
			text: '저장되어 있을 경우',
			type: 'radio',
			sample: [
				{
					text: '저장되어 있을 경우',
					value: true
				},
				{
					text: '저장되어 있지 않을 경우',
					value: false
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		const savename = `${Eri.game.id}_save_${this.슬롯번호}`;
		const rawSavedata = localStorage.getItem(savename);
		if (!!(rawSavedata) === this.방식) next();
		else stop();
	}
};