module.exports = {
	cid: '{0864EF34-B8C2-4845-BE73-D179B24F14E8}',
	version: '1.0.0',
	class: '사운드',
	title: '사운드를 재생합니다',
	description: '{{사운드타입}} 타입의 사운드를 재생합니다. <br>사운드 이름은 {{사운드이름}}(이)며 사운드 파일 {{사운드파일}}(를)을 재생합니다. <br>이 사운드는 {{반복여부}}되며, 중복되는 이름의 사운드가 재생되면, 기존 사운드는 정지됩니다.',
	variables: {
		'사운드타입': {
			text: '효과음',
			type: 'text',
			sample: 'sound_type',
			skip: true
		},
		'사운드이름': {
			text: '효과음',
			type: 'text',
			sample: 'sound_name',
			skip: true
		},
		'사운드파일': {
			text: 'undefined',
			type: 'file',
			sample: 'audio'
		},
		'환경설정변수': {
			text: '효과음크기비율',
			type: 'text',
			sample: 'environment_variable_name'
		},
		'반복여부': {
			text: '한 번만 재생',
			type: 'radio',
			sample: [{
					text: '한 번만 재생',
					value: false
				},
				{
					text: '반복재생',
					value: true
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		if (Eri.sound[this.사운드이름]) {
			Eri.sound[this.사운드이름].remove();
		}
		const soundEnv = Eri.game.env.system.sound;
		if (!(this.사운드타입 in soundEnv.scale)) {
			soundEnv.scale[this.사운드타입] = 1;
		}
		const soundScale = soundEnv.scale[this.사운드타입];
		const sound = new Eri.sound({
			type: this.사운드타입,
			name: this.사운드이름,
			file: this.사운드파일,
			loop: this.반복여부,
			playbackRate: 1,
			volume: 1,
			scale: soundScale
		});
		sound.play();
		Eri.sound[this.사운드이름] = sound;
		next();
	}
};