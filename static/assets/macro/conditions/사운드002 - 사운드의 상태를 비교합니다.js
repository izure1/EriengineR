module.exports = {
	cid: '6c014589-a3df-4982-84cb-3c6b4dbe9fcb',
	version: '1.0.0',
	class: '사운드',
	title: '사운드의 상태를 비교합니다',
	description: '사운드 {{사운드명}}(이)가 {{상태}} 중이 {{방식}} 작동합니다.',
	variables: {
		'사운드명': {
			text: '효과음',
			type: 'text',
			sample: 'sound_name'
		},
		'상태': {
			text: '재생',
			type: 'radio',
			sample: [
				{
					text: '재생',
					value: 1
				},
				{
					text: '일시정지',
					value: 2
				},
				{
					text: '중지',
					value: 3
				}
			]
		},
		'방식': {
			text: '맞을 경우',
			type: 'radio',
			sample: [
				{ text: '맞을 경우', value: true },
				{ text: '아닐 경우', value: false }
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		const sound = Eri.sound[this.사운드명];
		if (e.constructor !== 'EriSound') {
			stop();
			return;
		}
		if (!sound.element) {
			stop();
			return;
		}
		switch(this.상태) {
			case 1:
			{
				if (!sound.element.paused === this.방식) next();
				else stop();
				break;
			}
			case 2:
			{
				if (sound.element.paused === this.방식 !== sound.element.ended) next();
				else stop();
				break;
			}
			case 3:
			{
				if (sound.element.ended === this.방식) next();
				else stop();
				break;
			}
		}
	}
};