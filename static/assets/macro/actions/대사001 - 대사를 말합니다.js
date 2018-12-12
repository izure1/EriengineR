module.exports = {
	cid: '{F456C311-21A6-4C7A-B780-92B63AE7B74D}',
	version: '1.0.0',
	class: '대사',
	title: '대사를 말합니다',
	description: '{{객체명}}(이)가 {{출력내용}}(를)을 {{출력방식}} 말합니다. 필요하다면 음성 {{음성파일}}도 재생합니다. <br>다음 행동은 대사를 넘기거나 비우기 전까지 보류됩니다. <br><hr>출력 속도: {{출력속도v2}} / 출력 대기: {{출력대기v2}}',
	variables: {
		'객체명': {
			text: '나',
			type: 'value',
			sample: 'character_name',
			skip: true
		},
		'출력내용': {
			text: '안녕하세요',
			type: 'text'
		},
		'출력방식': {
			text: '새롭게',
			type: 'radio',
			sample: [{
					text: '새롭게',
					value: 1
				},
				{
					text: '붙여서',
					value: 2
				}
			],
			skip: true
		},
		'음성파일': {
			text: 'undefined',
			type: 'file',
			sample: 'audio',
			skip: true
		},
		'출력속도v2': {
			text: '대사출력속도',
			type: 'value',
			sample: 'environment_variable_name',
			skip: true
		},
		'출력대기v2': {
			text: '대사출력대기시간',
			type: 'value',
			sample: 'environment_variable_name',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		// 대사 출력을 위한 setTimeout 함수 지우기
		clearTimeout(Eri.system.dialog.interval);

		const audioPath = Eri.process.fileManager.get(this.음성파일);
		const dialogDelay = Eri.game.env.user[this.출력대기v2];
		const dialogSpeed = Eri.game.env.user[this.출력속도v2];

		const dialogEventData = (function DialogEvent() {
			return {
				dialogType: 1,
				dialogName: this.객체명,
				dialogText: this.출력내용
			};
		})();

		try {
			lve(Eri.game.env.system.dialog.name).attr({
				text: this.객체명
			});
			lve(Eri.game.env.system.dialog.text).attr({
				text: ''
			});
		} catch (e) {};

		Eri.system.dialog.log.push({
			name: this.객체명,
			text: this.출력내용,
			audio: this.음성파일,
			join: this.출력방식 === 2
		});
		Eri.system.dialog.skip = () => {
			next();
			if (Eri.system.dialog.onskip) {
				Eri.system.dialog.onskip();
			}
		};
		Eri.system.dialog.interval = null;
		Eri.system.dialog.audio = null;
		Eri.system.dialog.status = 'RUNNING';
		Eri.system.dialog.onskip = () => {
			Eri.system.dialog.onskip = null;
			Eri.process.emit('dialogprintskip', dialogEventData);
		};

		if (audioPath) {
			Eri.system.dialog.audio = new Audio(audioPath);
			Eri.system.dialog.audio.play();
		}

		const currentDialogText = this.출력내용;
		const beforeDialogText = this.출력방식 === 1 ? '' : (function getJoinText(i) {
			const logs = Eri.system.dialog.log;
			const beforeLog = logs[logs.length - i];
			if (!beforeLog) return '';
			let beforeText = beforeLog.text;
			if (beforeLog.join) {
				beforeText = getJoinText(++i) + beforeText;
			}
			return beforeText;
		})(2) || '';


		/*
		 *  타이핑 함수
		 *  <style> 등의 태그가 등장했을 때 스킵한다.
		 * 
		 */

		function typing(i, before, current, isTag, resolve) {
			let text;
			let char;
			let interval;

			text = current.slice(0, ++i);

			lve(Eri.game.env.system.dialog.text).attr({
				text: before + text
			});

			Eri.process.emit('dialogprinting', dialogEventData);

			if (text === current) {
				Eri.system.dialog.status = 'WAITING';
				Eri.system.dialog.interval = setTimeout(resolve, dialogDelay);
				return;
			}

			char = text.slice(-1);
			if (char === '<') isTag = true;
			if (char === '>') isTag = false;

			if (isTag) {
				return typing(i, before, current, isTag, resolve);
			}

			Eri.system.dialog.interval = setTimeout(() => {
				typing(i, before, current, isTag, resolve);
			}, dialogSpeed);
		}

		Eri.process.once('skip', next);
		Eri.process.emit('dialogprintstart', dialogEventData);

		const promise_text = new Promise(textResolve => {
			typing(0, beforeDialogText, currentDialogText, false, textResolve);
		});

		const promise_audio = new Promise(audioResolve => {
			if (Eri.system.dialog.audio instanceof Audio) {
				Eri.system.dialog.audio.play();
				Eri.system.dialog.audio.addEventListener('ended', audioResolve);
			} else audioResolve();
		});

		Promise.all([promise_text, promise_audio]).then(() => {
			Eri.process.emit('dialogprintend', dialogEventData);
		});
	}
};