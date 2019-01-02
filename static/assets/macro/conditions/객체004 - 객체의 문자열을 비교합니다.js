module.exports = {
	cid: '{6e6ec1b7-ce97-4091-9e70-5d0f4a13de15}',
	version: '1.0.0',
	class: '객체',
	title: '객체의 문자열을 비교합니다',
	description: '객체 {{객체명}}의 문자열이 {{속성값}}(과)와 {{방식}}(일)할 경우 작동합니다.',
	variables: {
		'객체명': {
			text: '나',
			type: 'text',
			sample: 'character_name'
		},
		'속성값': {
			text: '안녕하세요',
			type: 'text'
		},
		'방식': {
			text: '일치',
			type: 'radio',
			sample: [{
					text: '일치',
					value: 1
				},
				{
					text: '불일치',
					value: 2
				},
				{
					text: '이하',
					value: 3
				},
				{
					text: '이상',
					value: 4
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		const target = lve(this.객체명).get(0);
		if (lve.instanceof(target) === false) {
			stop();
			return;
		}
		switch (this.방식) {
			case 1:
				{
					if (target.attr('text')[0] === this.속성값) next();
					else stop();
					break;
				}
			case 2:
				{
					if (target.attr('text')[0] !== this.속성값) next();
					else stop();
					break;
				}
			case 3:
				{
					if (target.attr('text')[0] <= this.속성값) next();
					else stop();
					break;
				}
			case 4:
				{
					if (target.attr('text')[0] >= this.속성값) next();
					else stop();
					break;
				}
			default:
				{
					stop();
					break;
				}
		}
	}
};