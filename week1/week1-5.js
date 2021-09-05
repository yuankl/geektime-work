function match(str){
    let foundA=false;
    let foundB=false;
    let foundC=false;
    let foundD=false;
    let foundE=false;
    for(let s of str){
        if(s==='a'){
            foundA=true;
        }else if(foundA===true&&s==='b'){
            foundB=true;
        }else if(foundB===true&&s==='c'){
            foundC=true;
        }else if(foundC===true&&s==='d'){
            foundD=true;
        }else if(foundD===true&&s==='e'){
            foundE=true;
        }else if(foundE===true&&s==='f'){
            return true;
        }else{
            foundA=false;
            foundB=false;
            foundC=false;
            foundD=false;
            foundE=false;
        }
    }
    return false;
}
console.log(match('abcdgefg'));