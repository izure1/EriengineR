module.exports = {
	cid: '{2a1726d0-0477-48a9-a348-ffc788449b75}',
	version: '1.0.0',
	class: '제어',
	title: '게임을 삭제합니다',
	description: '플레이어에게 삭제여부를 {{저장여부}}, {{슬롯번호}}번 슬롯에 저장된 데이터를 삭제합니다.',
	variables: {
		'저장여부': {
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

		const deleteGame = (slot) => {
			Eri.process.deleteGame(slot);
			next();
		};

		if (this.저장여부 === false) deleteGame(this.슬롯번호);
		else lve.window.dialog('잠시만요!', `슬롯 '${this.슬롯번호}'에 저장된 게임을 삭제하시겠습니까?`, {
			buttons: [
				{
					text: '  네  ', click: (self) => {
						deleteGame(this.슬롯번호);
						self.close();
					}
				},
				{
					text: '  아니오  ', click: (self) => {
						next();
						self.close();
					}
				}
			]
		});
	}
};