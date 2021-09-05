function findAB(str){
    let findA=false;
    for(let s of str){
        if(s==='a'){
            findA=true;
        }else if(findA===true&&s==='b'){
            return true;
        }else{
            findA=false;
        }
    }
    return false;
}
console.log(findAB('abcd'));