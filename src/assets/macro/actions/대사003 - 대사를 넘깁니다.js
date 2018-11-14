module.exports = {
	cid: '{2FFC0E3B-F847-4FCE-B141-31FBB664E113}',
	version: '1.0.0',
	class: '대사',
	title: '대사 및 독백을 넘깁니다',
	description: '현재 출력 중인 대사 및 독백을 넘깁니다. <br>대사가 출력 중이라면 타이핑을 끝내고, 출력이 완료된 상태라면 다음 행동으로 넘어갑니다.',
	fn: function (next, stop, e) {
		// 대사 출력을 위한 setTimeout 함수 지우기
		clearTimeout(Eri.system.dialog.interval);
		
		// 현재 대사가 타이핑 중일 때
		if (Eri.system.dialog.status === 'READY') {
			next();
			return;
		}
		if (Eri.system.dialog.status === 'RUNNING') {
			// 마지막 대사를 적용하기
			const loglen = Eri.system.dialog.log.length;
			const lastDialog = Eri.system.dialog.log[loglen - 1];
			if (lastDialog) {
				if (lastDialog.name) {
					lve(Eri.game.env.system.dialog.name).attr({
						text: lastDialog.name
					});
				}
				if (lastDialog.text) {
					const lastText = (function getJoinText(i) {
						const logs = Eri.system.dialog.log;
						const beforeLog = logs[logs.length - i];
						if (!beforeLog) return '';
						let beforeText = beforeLog.text;
						if (beforeLog.join) {
							beforeText = getJoinText(++i) + beforeText;
						}
						return beforeText;
					})(1);
					lve(Eri.game.env.system.dialog.text).attr({
						text: lastText
					});
				}
			}
			Eri.system.dialog.status = 'WAITING';
			next();
			return;
		}
		// 재생 중인 음성파일이 있다면 중단하기
		if (Eri.system.dialog.audio instanceof Audio) {
			if (Eri.system.dialog.audio.paused === false) {
				Eri.system.dialog.audio.pause();
			}
			Eri.system.dialog.audio = null;
		}
		if (typeof Eri.system.dialog.skip === 'function') {
			Eri.system.dialog.skip();
		}
		Eri.system.dialog.status = 'READY';
		next();
	}
};