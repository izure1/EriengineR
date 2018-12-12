module.exports = {
	cid: '{f1a851ab-ce78-4c36-932c-bb691be04d55}',
	version: '1.0.0',
	class: '변수/배열',
	title: '배열 변수의 요소를 정렬합니다',
	description: '{{스코프}} 배열 변수 {{배열변수명}}의 요소를 {{정렬방식}}(으)로 정렬합니다.',
	variables: {
		'스코프': {
			text: '지역 또는 전역',
			type: 'radio',
			sample: [{
					text: '지역',
					value: 'LOCAL'
				},
				{
					text: '전역',
					value: 'GLOBAL'
				},
				{
					text: '지역 또는 전역',
					value: 'CLOSURE'
				}
			],
			skip: true
		},
		'배열변수명': {
			text: '배열',
			type: 'value',
			sample: 'variable_name'
		},
		'정렬방식': {
			text: '무작위',
			type: 'radio',
			sample: [{
					text: '오름차순',
					value: 1
				},
				{
					text: '내림차순',
					value: 2
				},
				{
					text: '무작위',
					value: 3
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		let targetVariable;
		switch (this.스코프) {
			case 'LOCAL':
				targetVariable = this.session[this.배열변수명];
				break;
			case 'GLOBAL':
				targetVariable = Eri.variable[this.배열변수명];
				break;
			case 'CLOSURE':
				if (this.배열변수명 in this.session) targetVariable = this.session[this.배열변수명];
				else if (this.배열변수명 in Eri.variable) targetVariable = Eri.variable[this.배열변수명];
				break;
		}
		switch (this.정렬방식) {
			case 1:
				{
					targetVariable.sort((a, b) => a - b);
					break;
				}
			case 2:
				{
					targetVariable.sort((a, b) => b - a);
					break;
				}
			case 3:
				{
					// 배열을 10번 섞습니다
					const tryCount = 10;
					const randomSeeds = new Uint8Array(tryCount);
					window.crypto.getRandomValues(randomSeeds);
					for (const seed of randomSeeds) targetVariable.sort(() => {
						const compareSeed = window.crypto.getRandomValues(new Uint8Array(1))[0];
						return compareSeed - seed;
					});
					break;
				}
		}
		next();
	}
};