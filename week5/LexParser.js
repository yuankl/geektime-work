class XRegExp{
    constructor(source, flag, root="root"){
        this.table = new Map();
        this.regexp = new RegExp(this.complieRegExp(source, root, 0).source, flag);
    }
    complieRegExp(source,name,start){
        if(source[name] instanceof RegExp)
            return {
                source: source[name].source,
                length: 0
            };

        let length = 0;
        // console.log(source,name);
        let regexp = source[name].replace(/\<([^>]+)\>/g, (str,$1)=>{
            this.table.set(start + length, $1);
            ++length;
            let r = this.complieRegExp(source, $1, start + length);

            length+=r.length;
            return "(" + r.source + ")";
        });
        return {
            source: regexp,
            length: length
        }
    }
    exec(string){
        let r = this.regexp.exec(string);
        for(let i = 1;i<r.length;i++){
            if(r[i]!==void 0){
                r[this.table.get(i-1)] = r[i];
            }
        }
        return r;
    }
    get lastIndex(){
        return this.regexp.lastIndex;
    }
    set lastIndex(value){
        return this.regexp.lastIndex=value;
    }
}
export function* scan(str){
    let regexp = new XRegExp({
        InputElement:"<Whitespace>|<LineTerminator>|<Comments>|<Token>",
        Whitespace:/ /,
        LineTerminator:/\n/,
        Comments:/\/\*(?:[^*]|\*[^\/])*\*\/|\/\/[^\n]*/,
        Token:"<Literal>|<Keywords>|<Identifer>|<Punctuator>",
        Literal:"<NumericLiteral>|<BooleanLiteral>|<StringLiteral>|<NullLiteral>",
        NumericLiteral:/(?:[1-9][0-9]*|0)(?:\.[0-9]*)?|\.[0-9]+/,
        BooleanLiteral:/true|false/,
        StringLiteral:/\"(?:[^"\n]|\\[\s\S])*\"|\'(?:[^'\n]|\\[\s\S])*\'/,
        NullLiteral:/null/,
        Identifer:/[a-zA-Z_$][a-zA-Z0-9_$]*/,
        Keywords:/if|else|for|function|let|var/,
        Punctuator:/\+|\=\>|\,|\?|\:|\{|\}|\.|\(|\=|\<|\+\+|\=\=|\=|\*|\)|\[|\]|;/
    }, "g", "InputElement")

    while(regexp.lastIndex < str.length){
        let r = regexp.exec(str);
        if(r.Whitespace){

        }else if(r.LineTerminator){

        }else if(r.Comments){

        }else if(r.NumericLiteral){
            yield {
                type:"NumericLiteral",
                value:r[0]
            }
        }else if(r.BooleanLiteral){
            yield {
                type:"BooleanLiteral",
                value:r[0]
            }
        }else if(r.StringLiteral){
            yield {
                type:"StringLiteral",
                value:r[0]
            }
        }else if(r.NullLiteral){
            yield {
                type:"NullLiteral",
                value:r[0]
            }
        }else if(r.Identifer){
            yield {
                type:"Identifer",
                value:r[0]
            }
        }else if(r.Keywords){
            yield {
                type:r[0]
            }
        }else if(r.Punctuator){
            yield {
                type:r[0]
            }
        }else{
            throw new Error("unexpected token "+r[0]);
        }

        if(!r[0].length){
            break;
        }
    } 
    yield{
        type:"EOF"
    }
}