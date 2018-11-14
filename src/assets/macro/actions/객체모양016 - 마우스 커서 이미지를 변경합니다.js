module.exports = {
	cid: '{647EF2B3-1C3D-41C5-A277-71A52FEABE6D}',
	version: '1.0.0',
	class: '객체/모양',
	title: '마우스 커서 이미지를 변경합니다',
	description: '마우스 커서 이미지를 {{이미지파일}}(으)로 변경합니다. <br>이미지는 gif, png 확장자여야하며, 64 * 64 크기보다 작아야합니다. <br><hr>커서 핫스팟 좌표 - x: {{x좌표}}, y: {{y좌표}}',
	variables: {
		'이미지파일': {
			text: 'undefined',
			type: 'file',
			sample: 'image'
		},
		'x좌표': {
			text: '0',
			type: 'value',
			skip: true
		},
		'y좌표': {
			text: '0',
			type: 'value',
			skip: true
		}
	},
	fn: function (next, stop, e) {
		let x = this.x좌표, y = this.y좌표;
		if (typeof this.x좌표 !== 'number') x = 0;
		if (typeof this.y좌표 !== 'number') y = 0;
		const cursorUrl = Eri.process.fileManager.get(this.이미지파일);
		document.querySelector(Eri.game.canvas).style.cursor = `url(${cursorUrl}) ${x} ${y}, auto`;
		next();
	}
};