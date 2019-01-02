module.exports = {
	cid: '{AB0CE1AB-D9D7-4540-AD75-B0C93DF160E8}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/318',
	class: '사운드',
	title: '사운드의 이름을 비교합니다',
	description: '위 사건의 사운드의 이름이 {{사운드명}}(과)와 {{방식}}할 경우 작동합니다.',
	variables: {
		'사운드명': {
			text: '효과음',
			type: 'text',
			sample: 'sound_name'
		},
		'방식': {
			text: '일치',
			type: 'radio',
			sample: [
				{ text: '일치', value: true },
				{ text: '불일치', value: false }
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
		if (this.사운드명 === e.value.name === this.방식) next();
		else stop();
	}
};