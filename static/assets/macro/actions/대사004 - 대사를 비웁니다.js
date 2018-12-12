module.exports = {
	cid: '{7E11BECF-B849-4CBB-B2CE-A7B8E334F80D}',
	version: '1.0.0',
	class: '대사',
	title: '대사를 비웁니다',
	description: '현재 출력한 대사와 이름을 비웁니다. 함께 재생 중이던 음성을 {{중지여부}}.',
	variables: {
		'중지여부': {
			text: '중지합니다',
			type: 'radio',
			sample: [{
					text: '중지합니다',
					value: true
				},
				{
					text: '중지하지 않습니다',
					value: false
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		// 대사 출력을 위한 setTimeout 함수 지우기
		clearTimeout(Eri.system.dialog.interval);

		// 이름창, 대사창 비우기
		lve(Eri.game.env.system.dialog.name).attr({
			text: ''
		});
		lve(Eri.game.env.system.dialog.text).attr({
			text: ''
		});

		// 재생 중인 음성파일이 있다면 중단하기
		if (this.중지여부 === true) {
			if (Eri.system.dialog.audio instanceof Audio) {
				if (Eri.system.dialog.audio.paused === false) {
					Eri.system.dialog.audio.pause();
				}
				Eri.system.dialog.audio = null;
			}
		}

		if (typeof Eri.system.dialog.skip === 'function') {
			Eri.system.dialog.skip();
		}

		Eri.system.dialog.status = 'READY';


		/*
		 *  마지막 대사로부터 대사이벤트 만들기
		 * 
		 */

		let dialogs;
		let dialogLast;
		let dialogEventData;

		dialogs = Eri.system.dialog.log;
		dialogLast = dialogs.slice(-1)[0];


		let isMonologue;
		let isExist;
		let dialogType;

		isExist = !!dialogLast;

		if (isExist) {
			isMonologue = dialogLast.name === null;
		}

		dialogType = isMonologue ? 2 : 1;

		if (isExist) {
			dialogEventData = (function DialogEvent() {
				return {
					dialogType: dialogType,
					dialogName: dialogLast.name,
					dialogText: dialogLast.text
				};
			})();
		}

		Eri.process.emit('dialogclear', dialogEventData);
		next();
	}
};