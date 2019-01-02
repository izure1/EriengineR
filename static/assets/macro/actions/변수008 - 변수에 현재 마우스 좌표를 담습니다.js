module.exports = {
	cid: '{9DDA67C8-2350-4998-AD4D-EB90C35AD576}',
	version: '1.0.0',
	class: '변수',
	title: '변수에 현재 마우스 좌표를 담습니다',
	description: '{{스코프}}변수 {{변수명}}에 현재 마우스의 {{좌표종류}}를 담습니다.',
	variables: {
		'스코프': {
			text: '지역',
			type: 'radio',
			sample: [{
					text: '지역',
					value: 'LOCAL'
				},
				{
					text: '전역',
					value: 'GLOBAL'
				}
			],
			skip: true
		},
		'변수명': {
			text: '마우스위치',
			type: 'text',
			sample: 'variable_name',
			skip: true
		},
		'좌표종류': {
			text: 'ｘ좌표',
			type: 'radio',
			sample: [
				{
					text: 'ｘ좌표',
					value: 'x'
				},
				{
					text: 'ｙ좌표',
					value: 'y'
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		let value;
		switch (this.좌표종류) {
			// TODO: window.mousemove 이벤트를 등록하여 현재 마우스 위치를 구조체에 담아야함
			case 'x': {
				value = Eri.system.mouse.x;
				break;
			}
			case 'y': {
				value = Eri.system.mouse.y;
				break;
			}
		}
		switch (this.스코프) {
			case 'LOCAL':
				this.session[this.변수명] = value;
				break;
			case 'GLOBAL':
				Eri.variable[this.변수명] = value;
				break;
		}
		next();
	}
};