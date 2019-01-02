module.exports = {
	cid: '{7CE77FFF-29B0-468C-9DE5-070E52F5D967}',
	version: '1.0.0',
	class: '사운드',
	title: '사운드 재생을 조작합니다',
	description: '{{사운드이름}}(이)란 이름의 사운드를 {{작업}}합니다. <br>중지된 사운드는 삭제되어 다시 재생할 수 없습니다.',
	variables: {
		'사운드이름': {
			text: '효과음',
			type: 'text',
			sample: 'sound_name',
			skip: true
		},
		'작업': {
			text: '일시정지',
			type: 'radio',
			sample: [
				{
					text: '일시정지',
					value: 1
				},
				{
					text: '다시 재생',
					value: 2
				},
				{
					text: '중지',
					value: 3
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		// 사운드가 없을 경우 건너 뛰기
		const sound = Eri.sound[this.사운드이름];
		if (sound) {
			switch (this.작업) {
				case 1: {
					sound.element.pause();
					break;
				}
				case 2: {
					sound.element.play();
					break;
				}
				case 3: {
					sound.remove();
					break;
				}
			}
		}
		next();
	}
};