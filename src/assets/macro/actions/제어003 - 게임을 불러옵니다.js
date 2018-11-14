module.exports = {
	cid: '{910C2212-3C06-4945-B335-3381FEC7F880}',
	version: '1.0.0',
	class: '제어',
	title: '게임을 불러옵니다',
	description: '플레이어에게 불러오기 여부를 {{불러오기여부}}, {{슬롯번호}}번 슬롯을 불러옵니다. <br>현재 게임은 저장되지 않으며, 이후의 매크로는 무시됩니다.',
	variables: {
		'불러오기여부': {
			text: '물어본 후 승낙하면',
			type: 'radio',
			sample: [
				{
					text: '물어본 후 승낙하면',
					value: true
				},
				{
					text: '물어보지 않고 강제로',
					value: false
				}
			],
			skip: true
		},
		'슬롯번호': {
			text: '1',
			type: 'value'
		}
	},
	fn: function (next, stop, e) {

		stop();

		if (this.불러오기여부 === false) Eri.process.loadGame(this.슬롯번호);
		else lve.window.dialog('잠시만요!', '정말로 게임을 불러오시겠습니까?\n현재 게임은 저장되지 않습니다.', {
			buttons: [
				{
					text: '  네  ', click: (self) => {
						Eri.process.loadGame(this.슬롯번호);
						self.close();
					}
				},
				{
					text: '  아니오  ', click: (self) => {
						self.close();
					}
				}
			]
		});
	}
};