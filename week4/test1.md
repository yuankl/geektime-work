# 1.允许小数的四则运算产生式

<四则运算表达式>::=<加法算式>
<加法算式>::=(<加法算式>("+"|"-")<乘法算式>)｜<乘法算式>
<乘法算式>::=(<乘法算式>("*"|"/")<数字>)｜<数字>
<数字>::={"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"}{"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"}{"0","1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"}{"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"}("."){"0","1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"}{"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"}

# 2.允许括号的四则运算产生式

<四则运算表达式>::=<括号算式>
<括号算式>::="("(<加法算式>)")"|<加法算式>
<加法算式>::=(<加法算式>("+"|"-")<乘法算式>)｜<括号算式>｜<乘法算式>
<乘法算式>::=(<乘法算式>("*"|"/")<数字>)｜<数字>
<数字>::={"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"}{"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"}{"0","1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"}{"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"}("."){"0","1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"}{"1"|"2"|"3"|"4"|"5"|"6"|"7"|"8"|"9"}


# 词法
正则文法（3型）得到分词结果。
空白
换行
注释
Token
InputElement ::= WhtieSpace｜LineTerminator｜Comment｜Token

WhiteSpace::=" "|" " （零宽空格，有20多个）
LineTerminator::="\n"|"\r"
SingleComment::="/" "/" <any>*
MultilineComment::="/" "*" ([^*] | "*" [^/])* "*" "/" 
Token::=Literal | Keywords | Identifier | Punctuator
Literal::=(7) NumberLiteral | BooleanLiteral | StringLiteral | NullLiteral | 
Keywords::="if" | "else" |"for"|"function"....
Punctuator::="+"|"-"|"*"|"/"|"{"|"}"

# 语法 
上下文无关文法（2型）
语法树