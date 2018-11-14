module.exports = {
	cid: '{C67A43EC-0DB1-4DB9-B349-93B56424A41C}',
	version: '1.0.0',
	class: '변수',
	title: '변수에 특정 값을 담습니다',
	description: '{{스코프}}변수 {{변수명}}에 {{변수값종류}}(를)을 담습니다. <br>값은 문자열로 치환되어 저장됩니다.',
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
			text: '임의의 변수',
			type: 'value',
			sample: 'variable_name',
			skip: true
		},
		'변수값종류': {
			text: '화면 넓이',
			type: 'radio',
			sample: [{
					text: '화면 넓이',
					value: 'GAME_WIDTH'
				},
				{
					text: '화면 높이',
					value: 'GAME_HEIGHT'
				},
				{
					text: '프레임레이트',
					value: 'GAME_FRAMERATE'
				},
				{
					text: '게임 버전',
					value: 'GAME_VERSION'
				},
				{
					text: '게임명',
					value: 'GAME_NAME'
				},
				{
					text: '게임ID',
					value: 'GAME_ID'
				},
				{
					text: '현재 씬 이름',
					value: 'GAME_CURRENT_SCENE'
				},
				{
					text: '현재 카메라 객체명',
					value: 'GAME_CURRENT_CAMERA'
				},
				{
					text: '대사출력속도',
					value: 'GAME_SETTING_DIALOGSPEED'
				},
				{
					text: '자동재생여부',
					value: 'GAME_SETTING_DIALOGAUTO'
				},
				{
					text: 'UUID 문자열',
					value: 'UUID_STRING'
				},
				{
					text: '이름창 이름',
					value: 'DIALOG_NAME'
				},
				{
					text: '대사창 이름',
					value: 'DIALOG_TEXT'
				}
			]
		}
	},
	fn: function (next, stop, e) {
		let value;
		switch (this.변수값종류) {
			case 'GAME_WIDTH':
				{
					value = lve.data().initSetting.canvas.element.width;
					break;
				}
			case 'GAME_HEIGHT':
				{
					value = lve.data().initSetting.canvas.element.height;
					break;
				}
			case 'GAME_FRAMERATE':
				{
					value = lve.data().initSetting.frameLimit
					break;
				}
			case 'GAME_VERSION':
				{
					value = Eri.game.version;
					break;
				}
			case 'GAME_NAME':
				{
					value = Eri.game.name;
					break;
				}
			case 'GAME_ID':
				{
					value = Eri.game.id;
					break;
				}
			case 'GAME_CURRENT_SCENE':
				{
					value = lve('[USING_CAMERA]').attr('scene')[0];
					break;
				}
			case 'GAME_CURRENT_CAMERA':
				{
					value = lve('[USING_CAMERA]').attr('name')[0];
					break;
				}
			case 'GAME_SETTING_DIALOGSPEED':
				{
					value = Eri.game.dialog.speed;
					break;
				}
			case 'GAME_SETTING_DIALOGAUTO':
				{
					value = Eri.game.dialog.auto;
					break;
				}
			case 'UUID_STRING':
				{
					value = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
						const r = Math.random() * 16 | 0,
							v = c == 'x' ? r : (r & 0x3 | 0x8);
						return v.toString(16);
					});
					break;
				}
			case 'DIALOG_NAME':
				{
					value = Eri.game.env.system.dialog.name || null;
					break;
				}
			case 'DIALOG_TEXT':
				{
					value = Eri.game.env.system.dialog.text || null;
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