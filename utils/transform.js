let bitmap = [];
for(let i = 0; i < 10; i++)
	bitmap.push(String.fromCharCode('0'.charCodeAt()+i));
for(let i = 0; i < 26; i++)
	bitmap.push(String.fromCharCode('A'.charCodeAt()+i));
for(let i = 0; i < 26; i++)
	bitmap.push(String.fromCharCode('a'.charCodeAt()+i));

function ch2num(ch){
	if(ch - '0' < 10)
		return ch - '0';
	else
		if(ch.charCodeAt() - 'A'.charCodeAt() < 26)
			return ch.charCodeAt() - 'A'.charCodeAt() + 10;
		else
			if(ch.charCodeAt() - 'a'.charCodeAt() < 26)
				return ch.charCodeAt() - 'a'.charCodeAt() + 10 + 26;
}

function id2short(id){
	s = [];
	for(let i = 0; i < 5; i++){
		s.push(bitmap[id%62]);
		id = Math.floor(id/62);
	}
	return s.reverse().join('');
}

function short2id(shortUrl){
	let id = 0;
	for(var ch of shortUrl)
		id = id * 62 + ch2num(ch);
	return id;
}

module.exports = {
	'ch2num': ch2num,
	'id2short': id2short,
	'short2id': short2id
};