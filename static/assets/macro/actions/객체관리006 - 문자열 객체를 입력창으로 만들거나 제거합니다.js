module.exports = {
	cid: '{4E518037-2B4F-4A75-BBD0-6C37C4D0E6F0}',
	version: '1.0.0',
	class: '객체/관리',
	title: '문자열 객체를 입력창으로 만들거나 제거합니다',
	description: '문자열 객체 {{객체명}}(를)을 입력창으로 {{방식}}. <br>엔터를 누르면 입력이 끝나며, 플레이어가 입력이 끝나기 전까지 다음 행동은 보류됩니다. <br>이 매크로는 동시에 여러 곳에서 사용될 수 없으며, 중복 시 기존 매크로는 완료됩니다.',
	variables: {
		'객체명': {
			text: '입력칸',
			type: 'text',
			sample: 'character_name'
		},
		'방식': {
			text: '만듭니다',
			type: 'radio',
			sample: [
				{
					text: '만듭니다',
					value: 1
				},
				{
					text: '만들지 않습니다',
					value: 2
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		// TODO : 로드 후에도 작동할 수 있도록 만들 것. 실수로 안만듬
		const hidden = document.querySelector('#hidden');
		const gamecanvas = document.querySelector(Eri.game.canvas);
		let userinput = document.querySelector('#userinput');

		// 만일 hidden 엘리멘트에 없으면 새롭게 생성합니다.
		if (!userinput) {
			userinput = document.createElement('div');
			userinput.setAttribute('id', 'userinput');
			hidden.appendChild(userinput);
		}

		// 이벤트를 등록합니다.
		// textarea 엘리멘트가 dataset.status 속성을 가지고 있을 경우 입력이 작동합니다.
		const pressKey = function (e) {
			if (e.keyCode === 13 && this.dataset.status === '2') {
				this.completeProcess();
				return;
			}
			// F1 ~ F12 키 무력화하기
			else if (e.keyCode >= 112 && e.keyCode <= 123) {
				e.preventDefault();
			}
			if (this.dataset.status) {
				targetObj.attr({ text: this.value });
				this.dataset.status = '2';
			}
		};

		// textarea 엘리멘트를 생성한 뒤에
		const textarea = document.createElement('textarea');
		// 이벤트를 할당합니다.
		// 이 textarea 는 입력이 종료된 후 삭제됩니다.
		textarea.addEventListener('keydown', pressKey);
		textarea.addEventListener('keyup', pressKey);
		textarea.addEventListener('change', pressKey);
		textarea.addEventListener('blur', function () {
			if (this.dataset.status) {
				this.focus();
				this.setSelectionRange(this.value.length, this.value.length);
			}
		});
		textarea.completeProcess = function () {
			userinput.removeChild(this);
			gamecanvas.focus();
			next();
		};

		const targetObj = lve(this.객체명).get(0);
		const completeBeforeTextarea = function () {
			document.querySelectorAll('#userinput > textarea').forEach((textarea) => {
				textarea.completeProcess();
			});
		};

		if (!targetObj) {
			stop();
			return;
		}

		switch (this.방식) {
			case 1: {
				completeBeforeTextarea();
				userinput.appendChild(textarea);
				textarea.value = targetObj.attr('text')[0];
				textarea.dataset.target = this.객체명;
				textarea.dataset.status = 1;
				textarea.focus();
				break;
			}
			case 2: {
				completeBeforeTextarea();
				next();
				break;
			}
		}
	}
};