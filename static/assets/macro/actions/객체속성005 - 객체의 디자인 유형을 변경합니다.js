module.exports = {
	cid: '{35f53433-36f7-4403-b090-be44a6c18fef}',
	version: '1.0.0',
	class: '객체/속성',
	title: '객체의 디자인 유형을 변경합니다',
	description: '캐릭터 {{객체명}}(를)을 {{타입}}로 바꾸고, 우선순위를 {{우선순위}}(으)로 변경합니다.',
	variables: {
		'객체명': {
			text: '*',
			type: 'value',
			sample: 'character_name'
		},
		'타입': {
			text: '인터페이스',
			type: 'radio',
			sample: [{
					text: '캐릭터',
					value: 'character'
				},
				{
					text: '인터페이스',
					value: 'interface'
				}
			],
			skip: true
		},
		'우선순위': {
			text: '1',
			type: 'value'
		}
	},
	fn: function (next, stop, e) {
		switch (this.타입) {
			case 'character':
				{
					lve(this.객체명).css({
						position: 'absolute',
						perspective: (self) => {
							if (self.type === 'camera') return 0;
							else return 100;
						},
						zIndex: this.우선순위
					}).addClass('캐릭터').removeClass('인터페이스');
					break;
				}
			case 'interface':
				{
					lve(this.객체명).css({
						position: 'fixed',
						perspective: 1,
						zIndex: this.우선순위
					}).addClass('인터페이스').removeClass('캐릭터');
					break;
				}
			default:
				{
					stop();
					return;
				}
		}
		next();
	}
};