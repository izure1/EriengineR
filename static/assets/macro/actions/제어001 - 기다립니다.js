module.exports = {
	cid: '{33CCD729-CF27-44A8-9F4B-074EEBA13ED5}',
	version: '1.0.0',
	class: '제어',
	title: '기다립니다',
	description: '{{대기시간}}초 기다립니다. 그동안 다음 행동은 보류됩니다.',
	variables: {
		'대기시간': {
			text: '0',
			type: 'value',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		Eri.setTimeout(next, this.대기시간 * 1000);
	}
};