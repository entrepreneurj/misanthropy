

var utils = {};

utils.create_response = function(room_name, msg_type, data) {
	return JSON.stringify(
	{'room': room_name,'type': msg_type, 'body': data }
);
};

module.exports = utils;
