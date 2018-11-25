/**
 *  Class for general Utils
 */

app.factory("Utils", function () {

	function formatStrDate(data) {
		if (!data) return "";
		if (data.length < 10) return "";
		var arr = data.slice(0, 10).split('-');
		if (arr.length < 3) return "";
		return arr[2] + '/' + arr[1] + '/' + arr[0];
	}

	function dateToStr(date, formatString) {
		if (!date) return "";
		if(Object.prototype.toString.call(date) !== '[object Date]') return date;

		let d = date.getDate();
		let m = date.getMonth() + 1;
		let y = date.getFullYear();

		d = d < 10 ? '0' + d : d;
		m = m < 10 ? '0' + m : m;

		let aux = formatString.toLowerCase();

		aux = aux.replace("d", d).replace("m", m).replace("y", y);

		while (aux.search("d") > 0) {
			aux = aux.replace("d", "");
		}

		while (aux.search("m") > 0) {
			aux = aux.replace("m", "");
		}

		while (aux.search("y") > 0) {
			aux = aux.replace("y", "");
		}

		return aux;
	}

	function date_DMY_to_MDY(data) {
		if (!data) return undefined; 
		if (data.length < 10) return undefined;
		var arr = data.slice(0,10).split('/');
		if (arr.length < 3) return undefined;

		let strDate = arr[1] + '-' + arr[0] + '-' + arr[2];
		return strToDate(strDate);
	}

	//-- Formato MM?dd?yyyy
	function strToDate(dateStr) {
		if (!dateStr) return null;

		let d = dateStr.substr(3, 2);
		let m = dateStr.substr(0, 2) - 1;
		let y = dateStr.substr(6, 4);
		
		return new Date(y, m, d);
	}	

	function _getDate() {

		let date = new Date();

		let d = date.getDate();
		let m = date.getMonth();
		let y = date.getFullYear();

		return new Date(y, m, d, 0, 0, 0);
	}

	function dateIsValid(dateStr) {
		if (!dateStr) return false;

		// MM/DD/YYYY
		let pattern = /^((0[13578]|1[02])[./-](0[1-9]|[1-2][0-9]|3[0-1])|(0[469]|11)[./-](0[1-9]|[1-2][0-9]|30)|(02)[./-](0[1-9]|[1-2][0-9]))[./-](19[0-9][0-9]|20[0-9][0-9])$/;
	    
		let result = pattern.test(dateStr);

		//-- Validando o dia 29 do mês de fevereiro (ano bisexto)
		if (result) {
			let m = parseInt(dateStr.substr(0, 2));
			let d = parseInt(dateStr.substr(3, 2));
			let y = dateStr.substr(6, 4);
			if (d == 29 && m == 2) result = (y % 4 == 0);
		}

		return result;
	}

	function contains(arr, findValue) {
		var i = arr.length;
		while (i--) {
			if (arr[i] === findValue) return true;
		}
		return false;
	}

	function containsByProp(arr, findValue, prop) {
		var i = arr.length;
		while (i--) {
			var obj = arr[i];
			if (obj[prop] === findValue[prop]) return true;
		}
		return false;
	}

	function confirmDlgYesNo(msg, callback) {
		BootstrapDialog.show({
			title: 'Confirmação',
			message: msg,
			buttons: [{
				label: 'Confirma',
				cssClass: 'btn-primary',
				action: function (dialog) {
					dialog.close();
					callback();
				}
			}, {
				label: 'Cancela',
				action: function (dialog) {
					dialog.close();
				}
			}]
		});
	}

	function dynamicSort(property) {
		var sortOrder = 1;
		if (property[0] === "-") {
			sortOrder = -1;
			property = property.substr(1);
		}
		return function (a, b) {
			var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
			return result * sortOrder;
		}
	}

	function limitString(str = '', limit = 30) {
		return (str.length > limit) ? str.substr(0, limit) + '...' : str;
	}

	function showToastMessage(tmessage = '') {
		// Get the toastMessageBar DIV
		var x = document.getElementById("toastMessageBar");
		x.innerHTML = tmessage;

		// Add the "show" class to DIV
		x.className = "show";

		// After 3 seconds, remove the show class from DIV
		setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
	}

	function nvl(value1, value2) {
		return value1 ? value1 : value2;
	}

	function isEmpty(obj) {
    	return Object.keys(obj).length === 0;
	}	

	return {
		contains: contains,
		containsByProp: containsByProp,
		confirmDlgYesNo: confirmDlgYesNo,
		dynamicSort: dynamicSort,
		formatStrDate: formatStrDate,
		date_DMY_to_MDY: date_DMY_to_MDY,
		dateToStr: dateToStr,
		strToDate: strToDate,
		dateIsValid: dateIsValid,		
		getDate: _getDate,
		limitString: limitString,
		showToastMessage: showToastMessage,
		nvl: nvl,
		isEmpty: isEmpty
	}
})