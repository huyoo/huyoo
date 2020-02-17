/**
 * create by hy ON 2020/2/17
 */
'use strict';

var output = document.getElementById('output'),
		input = document.getElementById('input');
var data, str = '';

input.onblur = function () {
	data = str = '';
	let content = this.value;
	data = content.split(/\n/)
			.map(item => {
				item = item.split(':');
				return {
					[item[0]]: item[1]
				}
			})
			.reduce((sum, item) => Object.assign(sum, item), {});

	output.value = JSON.stringify(data);
};

output.onclick = function () {
	this.select();
	document.execCommand('Copy');
	var tips = document.getElementById('tips');
	tips.style.animation = 'tip_anim 2s';
	tips.style.webkitAnimation = 'tip_anim 2s';
	setTimeout(function () {
		tips.style.animation = '';
		tips.style.webkitAnimation = '';
	}, 2000);
};

(function () {
	var editor = document.getElementById("editor"),
			editorBox = document.getElementById("editorBox"),
			act = document.getElementById("act"),
			createLang = document.getElementById("createLang");

	editor.onclick = function () {
		if (!editorBox.style.height || editorBox.style.height === '0px') {
			editorBox.style.height = '230px';
		} else {
			editorBox.style.height = '0';
		}
		editorBox.style.transition = 'height .5s';
	};

	act.onclick = function () {
		var inputArr = document.getElementsByTagName("input"),
				checkedArr = [];
		for (var i in inputArr) {
			if (inputArr[i].checked) {
				checkedArr[checkedArr.length] = inputArr[i].value;
			}
		}

		str = createColumn(data, checkedArr);
		str = columnTransferToString(str);

		output.value = str;
	};

	createLang.onclick = function () {
		str = createLangObject(data);

		output.value = str;
	}
})();

// 由原始对象生成表头
function createColumn(sourceData, option) {
	return Object.keys(sourceData).map((item) => {
		let column = {
			title: sourceData[item],
			dataIndex: item,
			width: 120,
		};

		if (option.length === 0) return column;

		if (option.includes('lang')) {
			const lang = document.getElementById('langBefore');
			column.title = `formatMessage({ id: '${lang.value || ''}${item}', defaultMessage: '${sourceData[item]}' })`
		}

		if (option.includes('visibleOptional')) {
			column.optional = 'true';
		}

		return column
	});
}

// 将对象转换成字符串
function columnTransferToString(columns) {
	let str = '';
	columns.forEach(item => {
		str += '{\n';
		for (let key in item) {
			if (key === 'dataIndex' || key === 'key') {
				str += `${key}: '${item[key]}',\n`
			} else {
				str += `${key}:${item[key]},\n`
			}
		}
		str += '},\n';
	});
	str = `[\n${str}\n]`;

	return str
}

// 由原始对象生成表头
function createLangObject(sourceData) {
	const lang = document.getElementById('langBefore').value || '';
	let str = '';
	Object.keys(sourceData).forEach(item => {
		str += `'${lang}${item}': '${sourceData[item]}',\n`
	});

	return str
}
