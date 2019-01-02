module.exports = {
	cid: '{26E04F0F-1DFA-4C0E-9739-E539A795F451}',
	version: '1.0.0',
	class: '제어',
	title: '게임을 저장합니다',
	description: '플레이어에게 저장여부를 {{저장여부}}, 현재 게임을 {{슬롯번호}}번 슬롯에 저장합니다. <br>기존 저장위치에 덮어쓰기 될 가능성이 있습니다.',
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
			type: 'text'
		}
	},
	fn: function (next, stop, e) {

		const saveGame = (slot) => {
			Eri.process.saveGame(slot).then(next);
		};

		if (this.저장여부 === false) saveGame(this.슬롯번호);
		else lve.window.dialog('잠시만요!', '이곳에 게임을 저장하시겠습니까?\n기존 데이터는 사라집니다.', {
			buttons: [
				{
					text: '  네  ', click: (self) => {
						saveGame(this.슬롯번호);
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