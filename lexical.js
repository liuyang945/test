var Trie = function(){
    this.next = new Array[26];
    this.isEnd = false;
    this.loc = 0;
};

var Key = function(){
    this.root = new Trie();

};

Key.prototype.add = function(str, loc){
    var p = this.root;
    var q;
    for(var i = 0; i < str.length; i++){
        //这里的减法定义的是每个字母与a之间的距离，比如a与a距离是0，b与a距离是1
        var id = str[i] - 'a';
        if(p.next[id] == null){
            q = new Trie();
            p.next[id] = q;

        }
        p = p.next[id];
    }
    p.isEnd = true;
    p.loc = loc;
};
Key.prototype.addStrs = function(strs){
    this.loc = 0;
    for(var i = 0; i < strs.length; i++){
        this.add(strs[i],loc++);
    }
}
Key.prototype.find = function(str){
    var p = this.root;
    for(var i = 0; i < str.length; i++){
        var id = str[i] - 'a';
        if(id < 0 || id >= 26){
            return -1;
        }
        p = p.next[id];
        if(p == null){
            return -1;
        }
    }
    if(p.isEnd){
        return p.loc;

    }
    else{
        return -1;
    }
};
Key.prototype.free = function(p){
    if(p == null) return;
    for(var i = 0; i < 26; i++){
        this.free(p.next[i])
    }
    delete p;
}

var Type = {
    ERROR : 0,
	KEY,
	DELIMITER,
	ARITHMETICOPTR,
	RELATIONOPTR,
	NUMBER,
	ID,
	CHAR,
	STRING,
	COMMENT
}

var Symbol = function(type, optr){
    this.type = type;
    this.optr = optr;
}
Symbol.prototype["=="]=function(a){
    return this.optr == a.optr;
}

var Lexical = function(){// 词法分析构造函数
    this.keys = new Key(); // 关键字
    this.typeStr = [
        "ERROR",
        "KEY",
        "DELIMITER",
        "ARITHMETICOPTR",
        "RELATIONOPTR",
        "NUMBER",
        "IDENTIFIER",
        "CHAR",
        "STRING",
        "COMMENT"
    ];
    this.ks = [// 关键字表
        "auto", "double", "int", "struct", "break", "else", "long",
		"switch","case", "enum", "register", "typedef", "char",
		"extern", "return", "union","const", "float", "short",
		"unsigned", "continue", "for", "signed", "void","default",
		"goto", "sizeof", "volatile", "do", "if", "while", "static"
    ];
    this.ks.forEach(this.keys.add(strs));
    this.optrs = [];
    // 分界符
    this.optrs.push({str : ",", type : DELIMITER});
    this.optrs.push({str : ";", type : DELIMITER});
    this.optrs.push({str : "(", type : DELIMITER});
    this.optrs.push({str : ")", type : DELIMITER});


    this.optrs.push({str : "[", type : DELIMITER});
    this.optrs.push({str : "]", type : DELIMITER});
    this.optrs.push({str : "{", type : DELIMITER});
    this.optrs.push({str : "{", type : DELIMITER});
    // 算术运算符
    this.optrs.push({str : "+", type : ARITHMETICOPTR});
    this.optrs.push({str : "-", type : ARITHMETICOPTR});
    this.optrs.push({str : "*", type : ARITHMETICOPTR});
    this.optrs.push({str : "/", type : ARITHMETICOPTR});
    this.optrs.push({str : "%", type : ARITHMETICOPTR});
    this.optrs.push({str : "++", type : ARITHMETICOPTR});
    this.optrs.push({str : "--", type : ARITHMETICOPTR});
    //关系运算符
    this.optrs.push({str : ">", type : RELATIONOPTR});
    this.optrs.push({str : ">=", type : RELATIONOPTR});
    this.optrs.push({str : "<", type : RELATIONOPTR});
    this.optrs.push({str : "<=", type : RELATIONOPTR});
    this.optrs.push({str : "==", type : RELATIONOPTR});
    this.optrs.push({str : "<>", type : RELATIONOPTR});
    this.optrs.push({str : "=", type : RELATIONOPTR});
    

    this.row = 0;
    this.column = 0;
    this.isFirst = true; // 输出的第一个结果

    this.indetifiers; // 标识符
    this.constants; // 常量
    this.strings; // 字符串
    this.chars; // 字符

    this.inn; // 输入的程序
}

Lexical.prototype.cut = function(i, j){
    return (+this.inn[0] + i) + (+this.inn[this.length - 1] + j)
}

Lexical.prototype.isKey = function(str){
    if(this.keys.find(str) != -1) return true;
    else return false;
}

Lexical.prototype.getKeyPointer = function(str){
    return this.keys.find(str);
}

Lexical.prototype.isOptr = function(str1){
    this.optrs.forEach(
        function(optr){
            if(optr.str == str1){
                return true;
            }
        }
    )
    return false;
}

Lexical.prototype.getOptrPointer = function(str1){  
    var it= this.optrss[0];
    for(var i = 0; it != this.optrs[this.optrs.length - 1] && it.str != str1; it = this.optrs[++i]);
    return i;

}

Lexical.prototype.getOptType = function(str1){
    var it = this.optrs[0];
    for(var i = 0; it != this.optrs[this.optrs.length - 1] && it.str !=str1; it = this.optr[++i]);
    if(it != this.optrs[this.optrs.length - 1])
        return it.type;
    else 
        return ERROR;
}

Lexical.prototype.isId = function(str){
    if(!this.isAlpha(str[0]) && str[0] != '_')
        return false;
for(var i = 0, c =str[i]; i < str.length; i++){
    if(!this.isAlNum(c) && c != '_') return false;
}
return true;
}

Lexical.prototype.getIdPointer = function(str1){
    var it = this.find(this.indetifiers[0],this.indetifiers[this.indetifiers.length - 1], {str : str1, type : ID});
    if(it != this.indetifiers[this.indetifiers.length - 1])
        return it -  
}

Lexical.prototype.find = function(from, to, target){

}

Lexical.prototype.isNum = function(str){

}

Lexical.prototype.getNumPointer = function(str){

}

Lexical.prototype.isString = function(str){

}

Lexical.prototype.getStringPointer = function(str){

}

Lexical.prototype.isChar = function(str){

}

Lexical.prototype.getCharPointer = function(){

}

Lexical.prototype.getIn = function(){
    this.row ++;
    // 返回程序输入框的返回内容
    return getline()
}

Lexical.prototype.analysis = function(){
    var j = 0;
    for(this.column = 0; this.column < this.inn.length; this.column++){
        var c = Object.toString.call(this.inn)[this.column];
        if(this.isAlpha(c)){
            for(j = +this.column + 1; j < this.inn.length && (this.isAlNum(this.inn[j]) || this.inn[j] == '_');j++)
            ;
            var s = this.cut(this.column, j);
            if(!this.isFirst){
                printf(",");

            }
            else{
                this.isFirst = false;
            }

            if(this.isKey(s)){
                //这个有待重写
                printf("{\"word\": \"%s\", \"tuple\": [%d, %d], \"type\": \"%s\", \"pos\": [%d, %d]}\n", s, KEY, this.getKeyPointer(s), this.typeStr["KEY"], this.row, this.column+1);
            }
            else if(this.isId(s)){
                printf("{\"word\": \"%s\", \"tuple\": [%d, %d], \"type\": \"%s\", \"pos\": [%d, %d]}\n", s, ID, this.getIDPointer(s), this.typeStr[ID], this.row, this.column+1);
            }
            else{
                printf("{\"word\": \"%s\", \"tuple\": [%d, %d], \"type\": \"%s\", \"pos\": [%d, %d]}\n", s, ERROR, ERROR, this.typeStr[ERROR], this.row, this.column+1);
            }
            this.column = j - 1;
        }
        else if(this.isDigit(c)){
            for(j = this.column + 1; j < this.inn.length && (this.isAlNum(this.inn[j]) || this.inn[j] == '_'); j++);
            var s = this.cut(this.column, j);
            if(!this.isFirst) printf(",");
            else this.isFirst  = false;
            if(this.isNum(s))
                printf("{\"word\": \"%s\", \"tuple\": [%d, %d], \"type\": \"%s\", \"pos\": [%d, %d]}\n", s.c_str(), NUMBER, this.getNumPointer(s), this.typeStr[NUMBER], this.row, this.column+1);
			else
				printf("{\"word\": \"%s\", \"tuple\": [%d, %d], \"type\": \"%s\", \"pos\": [%d, %d]}\n", s.c_str(), ERROR, ERROR, this.typeStr[ERROR], this.row, this.column+1);
            this.column = j - 1;
        }
        else if(c == '/' && this.inn[this.column+1] == '/'){
            for(this.column += 2; this.column < this.inn.length && this.isSpace(this.column); this.column++);
            var s = cut(this.column, this.inn.length);
            if(!this.isFirst)prinrf(',');
            else this.isFirst = false;
            printf("{\"word\": \"%s\", \"tuple\": [%d, %d], \"type\": \"%s\", \"pos\": [%d, %d]}\n", s, COMMENT, 0, this.typeStr[COMMENT], this.row, this.column+1);
            this.column = this.inn.length;
        }
        else if(this.isOptr(1 + c)){
            for(j = this.column + 1; j < this.inn.length && this.isOptr(1 + this.inn[j]) && this.getOptType(1 + this.inn[j]) != DELIMITER && this.getOptType(1 + this.inn[j]) == this.getOptType(1 + c); j++);
            var s = this.cut(this.column, j);
            if(!this.isFirst)printf(",");
            else this.isFirst = false;
            if(this.isOptr(s))
                printf("{\"word\": \"%s\", \"tuple\": [%d, %d], \"type\": \"%s\", \"pos\": [%d, %d]}\n", s, this.getOptrType(s), this.getOptrPointer(s), this.typeStr[getOptrType(s)], this.row, this.column+1);
			else
				printf("{\"word\": \"%s\", \"tuple\": [%d, %d], \"type\": \"%s\", \"pos\": [%d, %d]}\n", s, ERROR, ERROR, this.typeStr[ERROR], this.row, this.column+1);
            this.column = j -1;
        }
        else if(c == ',' || c == '\''){
            for(j = this.column + 1; j < this.inn.length && ((this.inn[j] == '\\' && j++) || this.inn[j] != c); j++);
            var s = this.cut(this.column + 1, j);
            if(!this.isFirst)printf(",");
            else this.isFirst = false;
            if(c == '"' && j < this.inn.length)
                printf("{\"word\": \"%s\", \"tuple\": [%d, %d], \"type\": \"%s\", \"pos\": [%d, %d]}\n", s, STRING, this.getStringPointer(s), this.typeStr[STRING], this.row, this.column+1);
			else if(c == '\'' && isChar(s))
				printf("{\"word\": \"%s\", \"tuple\": [%d, %d], \"type\": \"%s\", \"pos\": [%d, %d]}\n", s, CHAR, this.getCharPointer(s), this.typeStr[CHAR], this.row, this.column+1);
			else
				printf("{\"word\": \"%s\", \"tuple\": [%d, %d], \"type\": \"%s\", \"pos\": [%d, %d]}\n", s, ERROR, ERROR, this.typeStr[ERROR], this.row, this.column+1);
            this.column = j;
        }
        else if(!this.isSpace(c)){
            if(!this.isFirst)printf(",");
            else this.isFirst = false;
            if(c == '"')
                printf("{\"word\": \"\\\"\", \"tuple\": [%d, %d], \"type\": \"%s\", \"pos\": [%d, %d]}\n", ERROR, ERROR, this.typeStr[ERROR], this.row, this.column+1);
			else
				printf("{\"word\": \"%s\", \"tuple\": [%d, %d], \"type\": \"%s\", \"pos\": [%d, %d]}\n", c + 1, ERROR, ERROR, this.typeStr[ERROR], this.row, this.column+1);
        }   
    }
}

Lexical.prototype.isAlpha = function(str){

}

Lexical.prototype.isDigit = function(){

}

Lexical.prototype.isAlNum = function(){

}

Lexical.prototype.isSpace = function(){

}

Lexical.prototype.run = function(){
    while(this.getIn()){
        this.analysis();
    }
}




