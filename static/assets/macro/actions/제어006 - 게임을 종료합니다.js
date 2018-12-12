module.exports = {
	cid: '{588838CE-E623-4218-B2E5-CA0FF85E4EA3}',
	version: '1.0.0',
	class: '제어',
	title: '게임을 종료합니다',
	description: '플레이어에게 종료여부를 {{종료여부}} 게임을 종료합니다. <br>플레이어는 타이틀 화면으로 나가게 되며, 현재 게임은 저장되지 않습니다. <br>이후의 매크로는 무시됩니다.',
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

		if (this.종료여부 === false) Eri.process.endGame();
		else lve.window.dialog('잠시만요!', '정말로 타이틀 화면으로 나가시겠습니까?\n현재 게임은 저장되지 않습니다.', {
			buttons: [
				{
					text: '  네  ', click: (self) => {
						Eri.process.endGame();
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