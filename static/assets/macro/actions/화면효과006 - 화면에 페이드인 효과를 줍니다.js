module.exports = {
	cid: '{6db4bddd-fe55-4423-a539-092c91ab09ba}',
	version: '1.0.0',
	class: '화면/효과',
	title: '화면에 페이드인 효과를 줍니다',
	description: '장소 {{장소명}}에 {{시간}}초를 거쳐 페이드인 효과를 줍니다. <br>{{색상명}} 색상의 {{효과명}}(를)을 {{편의성}} 줍니다. <br>중복될 수 없으며, 기존 효과는 즉시 사라집니다.<br><hr>슬라이드 방향: {{방향}}',
	variables: {
		'장소명': {
			text: '(플레이)',
			type: 'text',
			sample: 'scene_name_play scene_name_system',
			skip: true
		},
		'시간': {
			text: '3',
			type: 'text',
			skip: true
		},
		'색상명': {
			text: 'black',
			type: 'text',
			skip: true,
		},
		'효과명': {
			text: '슬라이드',
			type: 'radio',
			sample: [{
					text: '슬라이드',
					value: 'slideIn'
				},
				{
					text: '페이드',
					value: 'fadeIn'
				},
				{
					text: '플라잉업',
					value: 'flyingUp'
				}
			],
			skip: true
		},
		'편의성': {
			text: '점점 매우 느리게',
			type: 'radio',
			sample: [{
					text: '일정하게',
					value: 'linear'
				},
				{
					text: '점점 빠르게',
					value: 'easeInSine'
				},
				{
					text: '점점 느리게',
					value: 'easeOutSine'
				},
				{
					text: '점점 매우 빠르게',
					value: 'easeInExpo'
				},
				{
					text: '점점 매우 느리게',
					value: 'easeOutExpo'
				},
				{
					text: '점점 빨라졌다가 점점 느리게',
					value: 'easeInOutSine'
				},
				{
					text: '점점 매우 빨라졌다가 점점 매우 느리게',
					value: 'easeInOutExpo'
				},
				{
					text: '반동 받아서 점점 빠르게',
					value: 'easeInBack'
				},
				{
					text: '반동 받아서 점점 느리게',
					value: 'easeOutBack'
				},
				{
					text: '통통 거리며 점점 빠르게',
					value: 'easeInBounce'
				},
				{
					text: '통통 거리며 점점 느리게',
					value: 'easeOutBounce'
				}
			],
			skip: true
		},
		'방향': {
			text: '왼쪽에서부터',
			type: 'radio',
			sample: [{
					text: '왼쪽에서부터',
					value: 'left'
				},
				{
					text: '위에서부터',
					value: 'top'
				},
				{
					text: '오른쪽에서부터',
					value: 'right'
				},
				{
					text: '아래에서부터',
					value: 'bottom'
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		// 기존 장면 전환 효과를 종료합니다
		if (Eri.system.screenEffect instanceof lve.effect.controller) {
			Eri.system.screenEffect.end();
			Eri.util.clearSuppress('screenEffectDelay')
		}

		let screenEffector;
		let effectControler;
		let perspective;

		screenEffector = lve.effect[this.효과명];
		effectControler = screenEffector({
			color: this.색상명,
			direction: this.방향,
			scene: this.장소명
		}, this.시간 * 1000, this.편의성);

		perspective = 1;

		switch (this.장소명.split('::')[0]) {
			case '(플레이)':
				{
					perspective += (1 / Number.MAX_SAFE_INTEGER);
					break;
				}
			case '(시스템)':
				{
					perspective -= (1 / Number.MAX_SAFE_INTEGER);
					break;
				}
		}

		Eri.system.screenEffect = effectControler;
		Eri.system.screenEffect.css({
			perspective
		});
		Eri.util.setSuppress('screenEffectDelay', () => {
			effectControler.end();
		}, this.시간 * 1000);
		next();
	}
};