module.exports = {
	cid: '{2674CE2F-BE37-4210-8CA4-45AACAD0E3E0}',
	version: '1.0.0',
	class: '사운드',
	title: '사운드 재생 위치를 조작합니다',
	description: '사운드 {{사운드이름}}의 재생 위치를 {{재생위치}}초로 변경합니다.',
	variables: {
		'사운드이름': {
			text: '배경음',
			type: 'text',
			sample: 'sound_name',
			skip: true
		},
		'재생위치': {
			text: 0,
			type: 'text',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		const sound = Eri.sound[this.사운드이름];
		if (sound) {
			sound.element.currentTime = this.재생위치;
		}
		next();
	}
};