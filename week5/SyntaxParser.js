import {scan} from "./LexParser.js";

let syntax = {
    Program:[["StatementList","EOF"]],
    StatementList:[
        ["Statement"],
        ["StatementList", "Statement"],
    ],
    Statement:[
        ["ExpressionStatement"],
        ["IfStatement"],
        ["VariableDeclaration"],
        ["FunctionDeclaration"],
        
    ],
    IfStatement:[
        ["if","(","Expression",")","Statement"]
    ],
    VariableDeclaration:[
        ["var","Identifier",";"],
        ["let","Identifier",";"]
    ],
    FunctionDeclaration:[
        ["function","Identifier","(",")","{","StatementList","}"]
    ],
    ExpressionStatement:[
        ["Expression",";"]
    ],
    Expression:[
        ["AdditveExpression"]
    ],
    AdditveExpression:[
        ["MultiplicativeExpression"],
        ["AdditveExpression","+","MultiplicativeExpression"],
        ["AdditveExpression","-","MultiplicativeExpression"]
    ],
    MultiplicativeExpression:[
        ["PrimaryExpression"],
        ["MultiplicativeExpression","*","PrimaryExpression"],
        ["MultiplicativeExpression","/","PrimaryExpression"]
    ],
    PrimaryExpression:[
        ["(","Expression",")"],
        ["Literal"],
        ["Identifier"]
    ],
    Literal:[
        ["Number"],
        ["String"]
    ]
}

let hash={

}

function closure(state){
    // console.log(state);
    hash[JSON.stringify(state)] = state;
    let queue = [];
    for(let symbol in state){
        if(symbol.match(/^\$/)){
            return;
        }
        queue.push(symbol);
    }
    while(queue.length){
        let symbol = queue.shift();
        console.log(symbol);
        if(syntax[symbol]){
            for(let rule of syntax[symbol]){
                if(!state[rule[0]]){
                    queue.push(rule[0]);
                }
                let current = state;
                for(let part of rule){
                    if(!current[part]){
                        current[part]={};
                    }
                    current=current[part];
                }
                current.$reduceType = symbol;
                current.$reduceLength = rule.length;
            }
        }
    }
    // console.log(state);
    for(let symbol in state){
        
        if(symbol.match(/^\$/)){
            return ;
        }
        if(hash[JSON.stringify(state[symbol])]){
            state[symbol] = hash[JSON.stringify(state[symbol])];
        }else{
            closure(state[symbol]);
        }
    }
}
let end = {
    $isEnd:true
}
let start = {
    "Program":end
}
closure(start);

let source=`
    var a;
`

function parse(source){
    let stack = [start];
    function reduce(){
        let state = stack[stack.length-1];
        if(state.$reduceType){
            let children=[];
            for(let i = 0;i<state.$reduceLength;i++){
              
                children.push(stack.pop());
            }
            //create a non-terminal symbol and shift it 
            shift({
                type: state.$reduceType,
                children: children.reverse()
            });
        }
        // else{
        //     throw new Error("unexpected token")
        // }
    }
    function shift(symbol){
        let state=stack[stack.length-1];
        if(symbol.type in state){
            stack.push(state[symbol.type]);
        }else{
            // reduce to non-terminal symbols
            reduce();
            shift(symbol);
        }
    }
    for(let symbol /*terminal symbols*/of scan(source)){
        shift(symbol)
    }
    reduce();
}
parse(source);