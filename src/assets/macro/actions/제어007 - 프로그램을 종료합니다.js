module.exports = {
	cid: '{42CA53EA-B75F-4596-932E-F30102D450FA}',
	version: '1.0.0',
	class: '제어',
	title: '프로그램을 종료합니다',
	description: '플레이어에게 종료여부를 {{종료여부}} 프로그램을 종료합니다. <br>현재 게임은 저장되지 않으며, 이후의 매크로는 무시됩니다.',
	variables: {
		'종료여부': {
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
		}
	},
	fn: function (next, stop, e) {

		stop();

		if (this.종료여부 === false) Eri.process.endProgram();
		else lve.window.dialog('잠시만요!', '정말로 프로그램을 종료하시겠습니까?\n현재 게임은 저장되지 않습니다.', {
			buttons: [
				{
					text: '  네  ', click: (self) => {
						Eri.process.endProgram();
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