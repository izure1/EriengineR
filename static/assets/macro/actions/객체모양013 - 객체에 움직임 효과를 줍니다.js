module.exports = {
	cid: '{1E6F2AD0-822D-4BEB-AB6D-93D1A2558797}',
	version: '1.0.0',
	class: '객체/모양',
	title: '객체에 움직임 효과를 줍니다',
	description: '객체 {{객체명}}(에)게 {{효과시간}}초 간 {{효과횟수}}번 {{효과이름}} 효과를 줍니다. 움직임의 크기는 {{변동폭}} 입니다.',
	variables: {
		'객체명': {
			text: '주인공',
			type: 'value',
			sample: 'character_name'
		},
		'효과시간': {
			text: '1',
			type: 'value'
		},
		'효과횟수': {
			text: '1',
			type: 'value'
		},
		'효과이름': {
			text: '점프',
			type: 'radio',
			sample: [{
					text: '점프',
					value: 'JUMP'
				},
				{
					text: '인사',
					value: 'HELLO'
				},
				{
					text: '부르르',
					value: 'SHIVER'
				},
				{
					text: '덜덜',
					value: 'FEAR'
				},
				{
					text: '우당탕쿵탕',
					value: 'CRASH'
				},
				{
					text: '끄덕',
					value: 'AGREE'
				},
				{
					text: '깜짝',
					value: 'SURPRISE'
				},
				{
					text: '한숨',
					value: 'SIGH'
				}
			],
			skip: true
		},
		'변동폭': {
			text: '50',
			type: 'value',
			skip: true
		}
	},
	fn: async function (next, stop, e) {
		const intervalTime = this.효과시간 * 1000 / this.효과횟수;
		const gap = this.변동폭;
		const target = lve(this.객체명);
		const delay = async function (timer) {
			return new Promise(resolve => {
				Eri.setTimeout(resolve, timer);
			});
		};
		// actions list
		const actions = {
			JUMP: async function (duration) {
				const up = duration / 3 * 1;
				const down = duration / 3 * 2;
				target.animate({
					bottom: `+=${gap}`
				}, up, 'easeOutQuad');
				await delay(up);
				target.animate({
					bottom: `-=${gap}`
				}, down, 'easeInQuint');
			},
			HELLO: async function (duration) {
				const up = duration / 5 * 3;
				const down = duration / 5 * 2;
				target.animate({
					bottom: `-=${gap}`
				}, up, 'easeOutSine');
				await delay(up);
				target.animate({
					bottom: `+=${gap}`
				}, down, 'easeInSine');
			},
			SHIVER: async function (duration) {
				const maxcount = 30;
				let count = 30;
				let number = 0;
				let sign = 1;
				const deltaTime = duration / count;
				const startOffset = target.css('left')[0];
				while (count--) {
					((count) => {
						Eri.setTimeout(() => {
							sign *= -1;
							target.animate({
								left: startOffset + (sign * gap * count / maxcount)
							}, deltaTime);
						}, deltaTime * number++);
					})(count);
				}
				target.animate({
					bottom: `+=${gap}`
				}, duration / 10 * 8, 'easeOutSine');
				await delay(duration / 10 * 8);
				target.animate({
					bottom: `-=${gap}`
				}, duration / 10 * 2);
				await delay(duration / 10 * 2)
				await delay(deltaTime);
				// 원래 자리 찾아가기
				target.css({
					left: startOffset
				});
			},
			FEAR: async function (duration) {
				const maxcount = 30;
				let count = 30;
				let number = 0;
				let sign = 1;
				const deltaTime = duration / count;
				const startOffset = target.css('left')[0];
				while (count--) {
					((count) => {
						setTimeout(() => {
							sign *= -1;
							target.animate({
								left: startOffset + (sign * gap * count / maxcount)
							}, deltaTime);
						}, deltaTime * number++);
					})(count);
				}
				await delay(duration + deltaTime);
				// 원래 자리 찾아가기
				target.css({
					left: startOffset
				});
			},
			CRASH: async function (duration) {
				let count = 10;
				const interval = duration / count;
				const startOffsetX = target.css('left')[0];
				const startOffsetY = target.css('bottom')[0];
				const bothgap = gap / 2;
				const run = async() => {
					const random = Math.random() * bothgap;
					const signX = Math.random() > 0.5 ? 1 : -1;
					const signY = Math.random() > 0.5 ? 1 : -1;
					const endOffsetX = startOffsetX + (signX * random);
					const endOffsetY = startOffsetY + (signY * random);
					const timescale = random / bothgap;
					target.animate({
						left: endOffsetX,
						bottom: endOffsetY
					}, interval * timescale);
					await delay(interval * timescale);
					if (count--) run();
				}
				run();
				await delay(duration);
				// 원래 자리 찾아가기
				target.css({
					left: startOffsetX,
					bottom: startOffsetY
				});
			},
			AGREE: async function (duration) {
				const up = duration / 2;
				const down = duration / 2;
				target.animate({
					bottom: `-=${gap}`
				}, up);
				await delay(up);
				target.animate({
					bottom: `+=${gap}`
				}, down, 'linear');
			},
			SURPRISE: async function (duration) {
				const up = duration / 5 * 1;
				const down = duration / 5 * 4;
				target.animate({
					bottom: `+=${gap}`
				}, up)
				await delay(up);
				target.animate({
					bottom: `-=${gap}`
				}, down, 'easeOutExpo');
			},
			SIGH: async function (duration) {
				const up1 = duration / 20 * 9;
				const down = duration / 20 * 9;
				const up2 = duration / 20 * 2;
				target.animate({
					bottom: `+=${gap / 3}`
				}, up1, 'easeInSine');
				await delay(up1);
				target.animate({
					bottom: `-=${gap}`
				}, down, 'easeOutCubic');
				await delay(down);
				target.animate({
					bottom: `+=${gap / 3 * 2}`
				}, up2, 'easeInCirc');
			}
		};
		// 지정한 움직임을 효과횟수만큼 돌립니다.
		for (let i = 0; i < this.효과횟수; i++) {
			actions[this.효과이름](intervalTime);
			await delay(intervalTime);
		}
		next();
	}
};