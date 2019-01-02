module.exports = {
	cid: '{9BE954CF-28F9-44A2-8A12-3BCCC797BBC0}',
	version: '1.0.0',
	class: '사운드',
	title: '사운드 볼륨을 조정합니다',
	description: '사운드 {{사운드이름}}의 볼륨을 {{볼륨}}%로 {{변경기간}}초를 거쳐 변경합니다. <br>변경이 끝나고 사운드를 {{유지여부}}',
	variables: {
		'사운드이름': {
			text: '배경음',
			type: 'text',
			sample: 'sound_name',
			skip: true
		},
		'볼륨': {
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
		let hopeVolume = this.볼륨 / 100;

		if (hopeVolume > 1) hopeVolume = 1;
		else if (hopeVolume < 0) hopeVolume = 0;

		if (sound && sound.element instanceof Audio) {
			sound.animate({
				volume: hopeVolume
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