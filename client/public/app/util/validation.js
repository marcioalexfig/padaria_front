/**
 * Validação e dados do usuário
 */

var aes256 = require('nodejs-aes256');

module.exports = function(app){
	var tools = {};

	tools.includes = function(arr, val){
		var contains = false;

		for (var i = 0; i < arr.length; i++){
			if(arr[i] == val){
				contains = true;
				break;
			}
		}

		return contains;
	}


	function validaUsuario(r){
		var roles = r;

		this.validar = function(req, res, next){
			var cookie = (req.cookies._USERACCESS_)?req.cookies._USERACCESS_:false;
			
			if(!cookie){
				return res.redirect(401, '/login.html');
			}
			
			var aesKey = app.get('aes-key');
			var decripted = aes256.decrypt(aesKey, cookie);
			
			var udata = decripted.split("[separador]");
			
			if(udata.length === 1){
				console.log("Fase 1");
				res.cookie('_USERACCESS_', '', {expires: new Date(1), httpOnly:true});
				return res.redirect(401, '/login.html');
			}
			
			var tUsuario = udata[0];
			var tSenha = udata[1];
			
			var Usuarios = app.models.usuarios;
			
			Usuarios.findOne({login:tUsuario}, function(err, usuario){
				if(err){
					return res.status(500).json({"message":"Ocorreu um erro interno no sistema", "sysmsg":err});
				}
				
				if(!usuario){
					console.log("Fase 2");
					res.cookie('_USERACCESS_', '', {expires: new Date(1), httpOnly:true});
					return res.redirect(401, '/login.html');
				}
				
				if(usuario.senha !== tSenha){
					console.log("Fase 3");
					res.cookie('_USERACCESS_', '', {expires: new Date(1), httpOnly:true});
					return res.redirect(401, '/login.html');
				}
				
				if(usuario.status !== 'Ativo'){
					console.log("Fase 4");
					res.cookie('_USERACCESS_', '', {expires: new Date(1), httpOnly:true});
					return res.redirect(401, '/login.html');
				}

				if(roles && roles.length > 0 && !tools.includes(roles, usuario.perfil)){
					console.log("Fase 5");
					return res.status(403).json({message:"O usuário não possui permissão para esta ação."});
				}
				next();
			});
		};
	}
	
	tools.validaUsuario = function(vroles){
		var vu = new validaUsuario(vroles);

		return vu.validar;
	};
	

	function validaStatus(o){
		var opcoes = o;
		this.validar = function(req, res, next){
			var NCR = app.models.ncr;

			var nNCR = req.params.ncr;

			NCR.findOne({_id:nNCR}, function(err, ncr){
				if(opcoes.permitido && opcoes.permitido.length > 0){
					if(!tools.includes(opcoes.permitido, ncr.status)){
						return res.status(403).json({message:"Status do workflow não permitido"});
					}
				}
				next();
			});
		};
	}

	tools.validaStatus = function(opcoes){
		var vs = new validaStatus(opcoes);

		return vs.validar;
	}

	function validaStatusProibido(o){
		var opcoes = o;
		this.validar = function(req, res, next){
			var NCR = app.models.ncr;

			var nNCR = req.params.ncr;

			NCR.findOne({_id:nNCR}, function(err, ncr){
				if(opcoes.proibido && opcoes.proibido.length > 0){
					if(tools.includes(opcoes.proibido, ncr.status)){
						return res.status(403).json({message:"Status do workflow não permitido"});
					}
				}
				next();
			});
		};
	}

	tools.validaStatusProibido = function(opcoes){
		var vs = new validaStatusProibido(opcoes);

		return vs.validar;
	}

	tools.cookieData = function(req){
		var cookie = req.cookies._USERACCESS_;
		
		var aesKey = app.get('aes-key');
		var decripted = aes256.decrypt(aesKey, cookie);
		
		return decripted.split("[separador]");
	}
	
	return tools;
}