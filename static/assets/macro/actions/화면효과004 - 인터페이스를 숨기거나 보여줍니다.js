module.exports = {
	cid: '{0FC76806-7A8F-413E-A14E-DED2DE729954}',
	version: '1.0.0',
	class: '화면/효과',
	title: '인터페이스를 숨기거나 보여줍니다',
	description: '인터페이스를 {{페이드시간}}초를 거쳐 {{작업}}.',
	variables: {
		'페이드시간': {
			text: '0.5',
			type: 'text',
			skip: true
		},
		'작업': {
			text: '숨깁니다',
			type: 'radio',
			sample: [
				{
					text: '숨깁니다',
					value: 'none'
				},
				{
					text: '보여줍니다',
					value: 'block'
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		if (Eri.game.env.system.camera === null) return;
		let opacity;
		if (this.작업 === 'block') opacity = function (self) {
			return self.data('__opacity')[0];
		};
		else opacity = 0;
		lve('*').findClass('인터페이스').notClass('배경').notClass('캐릭터').in('(플레이)', true).animate({ opacity: opacity }, this.페이드시간 * 1000);
		next();
	}
};