module.exports = {
	cid: '{895b80df-d9c1-486d-b5a9-03d1beef755e}',
	version: '1.0.0',
	class: '사운드',
	title: '사운드 속도를 조정합니다',
	description: '사운드 {{사운드이름}}의 속도를 {{백분율}}%로 {{변경기간}}초를 거쳐 변경합니다. <br>변경이 끝나고 사운드를 {{유지여부}}',
	variables: {
		'사운드이름': {
			text: '배경음',
			type: 'text',
			sample: 'sound_name',
			skip: true
		},
		'백분율': {
			text: 100,
			type: 'text',
			skip: true
		},
		'변경기간': {
			text: 3,
			type: 'text',
			skip: true
		},
		'유지여부': {
			text: '유지합니다',
			type: 'radio',
			sample: [{
					text: '유지합니다',
					value: 1
				},
				{
					text: '중지합니다',
					value: 2
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		const sound = Eri.sound[this.사운드이름];
		const duration = this.변경기간 * 1000;
		let hopeSpeed = this.백분율 / 100;

		if (hopeSpeed > 1) hopeSpeed = 1;
		else if (hopeSpeed < 0) hopeSpeed = 0;

		if (sound && sound.element instanceof Audio) {
			sound.animate({
				playbackRate: hopeSpeed
			}, duration, () => {
				if (this.유지여부 === 2) sound.remove();
			});
			if (this.유지여부 === 2) {
				sound.setSavable(false);
			}
		}

		next();
	}
};