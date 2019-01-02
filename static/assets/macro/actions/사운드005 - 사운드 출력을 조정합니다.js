module.exports = {
	cid: '{ce6bc639-b069-47eb-9785-d7dc9be868a3}',
	version: '1.0.0',
	class: '사운드',
	title: '사운드 출력을 조정합니다',
	description: '{{사운드타입}} 타입의 사운드의 출력을 {{출력}}%로 변경합니다. 기본값은 100%입니다. <br>이는 특정 사운드 타입의 볼륨 크기를 전체 조정하는 용도로 사용합니다.',
	variables: {
		'사운드타입': {
			text: '효과음',
			type: 'text',
			sample: 'sound_type',
			skip: true
		},
		'출력': {
			text: 100,
			type: 'text',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		const scale = this.출력 / 100;
		for (const name in Eri.sound) {
			const sound = Eri.sound[name];
			if (sound.type !== this.사운드타입) {
				continue;
			}
			sound.scale = scale;
		}
		Eri.game.env.system.sound.scale[this.사운드타입] = scale;
		next();
	}
};