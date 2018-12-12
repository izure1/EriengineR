module.exports = {
	cid: '{AE048B9B-CA81-4D9F-A339-E85712C83F86}',
	version: '1.0.0',
	class: '객체/모양',
	title: '객체를 보여주거나 숨깁니다',
	description: '객체 {{객체명}}(를)을 화면에서 {{페이드시간}}초에 거쳐 {{작업}}. <br>객체가 월드에서 소멸하는 건 아닙니다.',
	variables: {
		'객체명': {
			text: '*',
			type: 'value',
			sample: 'character_name'
		},
		'페이드시간': {
			text: '0.5',
			type: 'value',
			skip: true
		},
		'작업': {
			text: '숨깁니다',
			type: 'radio',
			sample: [{
					text: '보여줍니다',
					value: 'block'
				},
				{
					text: '숨깁니다',
					value: 'none'
				}
			],
			skip: true
		}
	},
	fn: function (next, stop, e) {
		let target;
		let current, start, end;
		let display;

		target = lve(this.객체명);

		start = {};
		end = {};

		const getVisible = (self, type) => {
			let visible;
			let ret;

			visible = {};
			visible.opacity = self.data('__opacity')[0];
			visible.now = self.css('display')[0] === 'block';
			visible.to = this.작업 === 'block';

			ret = {};
			ret.start = {};
			ret.end = {};

			if (visible.now && !visible.to) {
				ret.start.display = 'block';
				ret.start.opacity = visible.opacity;
				ret.end.display = 'none';
				ret.end.opacity = 0;
			} else if (visible.now && visible.to) {
				ret.start.display = 'block';
				ret.start.opacity = visible.opacity;
				ret.end.display = 'block';
				ret.end.opacity = visible.opacity;
			} else if (!visible.now && visible.to) {
				ret.start.display = 'block';
				ret.start.opacity = 0;
				ret.end.display = 'block';
				ret.end.opacity = visible.opacity;
			} else if (!visible.now && !visible.to) {
				ret.start.display = 'none';
				ret.start.opacity = visible.opacity;
				ret.end.display = 'none';
				ret.end.opacity = visible.opacity;
			}

			return ret[type];
		};

		start.display = self => {
			return getVisible(self, 'start').display;
		};
		start.opacity = self => {
			return getVisible(self, 'start').opacity;
		};
		end.display = self => {
			return getVisible(self, 'end').display;
		};
		end.opacity = self => {
			return getVisible(self, 'end').opacity;
		};

		lve(this.객체명).css(start).animate({
			opacity: end.opacity
		}, this.페이드시간 * 1000);

		Eri.setTimeout(() => {
			target.css({
				display: end.display
			});
		}, this.페이드시간 * 1000);

		next();
	}
};