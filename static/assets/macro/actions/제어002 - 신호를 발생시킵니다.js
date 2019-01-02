module.exports = {
	cid: '{52B9A835-8BD4-4ABE-ACDC-157F8EC7CC66}',
	version: '1.0.0',
	class: '제어',
	title: '신호를 발생시킵니다',
	description: '신호 {{신호명}}(를)을 발생시킵니다. 발생 시 같이 넘길 값은 {{값}}입니다.',
	variables: {
		'신호명': {
			text: '프롤로그 종료',
			type: 'text',
			sample: 'cue_name'
		},
		'값': {
			text: 'null',
			type: 'text',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		const cueEvent = new Eri.cue({
			name: this.신호명,
			value: this.값
		});
		Eri.process.emit('cue', cueEvent);
		next();
	}
};