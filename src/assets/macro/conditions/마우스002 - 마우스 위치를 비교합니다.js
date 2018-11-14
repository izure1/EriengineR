module.exports = {
	cid: '{F662E361-D49C-477B-AFB3-AFF7940F01EA}',
	version: '1.0.0',
	url: 'http://cafe.naver.com/lvejs/book5086277/315',
	class: '마우스',
	title: '마우스 위치를 비교합니다',
	description: '위 사건의 마우스 {{좌표종류}}좌표값이 {{좌표값}}(과)와 {{방식}}(일)할 경우 작동합니다.',
	variables: {
		'좌표종류': {
			text: 'ｘ',
			type: 'radio',
			sample: [
				{ text: 'ｘ', value: 'left' },
				{ text: 'ｙ', value: 'bottom' }
			],
			skip: true
		},
		'좌표값': {
			text: '0',
			type: 'value'
		},
		'방식': {
			text: '일치',
			type: 'radio',
			sample: [
				{ text: '일치', value: 1 },
				{ text: '불일치', value: 2 },
				{ text: '이하', value: 3 },
				{ text: '이상', value: 4 }
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		const scale = lve.root.cache.screenScale;
		const rawMouseLeft = e.value.layerX / scale;
		const rawMouseTop = e.value.layerY / scale;
		const canvas = lve.data().initSetting.canvas.element;
		const canvasWidth = canvas.width;
		const canvasHeight = canvas.height;
		// filter
		if (e.constructor !== 'MouseEvent') {
			stop();
			return;
		}
		// update pos
		const mousePos = {
			left: rawMouseLeft,
			bottom: Math.abs(canvasHeight - rawMouseTop)
		};
		// select
		const tarPosValue = mousePos[this.좌표종류];
		switch (this.방식) {
			case 1: {
				if (tarPosValue == this.좌표값) next();
				else stop();
				break;
			}
			case 2: {
				if (tarPosValue != this.좌표값) next();
				else stop();
				break;
			}
			case 3: {
				if (tarPosValue <= this.좌표값) next();
				else stop();
				break;
			}
			case 4: {
				if (tarPosValue >= this.좌표값) next();
				else stop();
				break;
			}
			default: {
				stop();
				break;
			}
		}
	}
};