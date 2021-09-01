function download(text, name) {
  const a = document.createElement('a');
  const type = name.split(".").pop();
  a.href = URL.createObjectURL(new Blob([text], { type: `text/${type === "txt" ? "plain" : type}` }));
  a.download = name;
  a.click();
}
function generate(arr){
    let table={};
    for(let i=0;i<arr.length-1;i++)
        if(table[arr[i]])table[arr[i]].push(arr[i+1]);
        else table[arr[i]]=[arr[i+1]];
    return table;
}
function text(table,length=1000){
    let keys=Object.keys(table),
        idx=keys[~~(Math.random()*keys.length)],
        text=idx;
    for(let i=0;i<length;i++)if(table[idx])text+=" "+(idx=table[idx][~~(Math.random()*table[idx].length)]);
    return text;
}
var table,txt;
const output = document.getElementById("output"),
  input = document.querySelector("input"),
  btg = document.getElementById("generate"),
  btd = document.getElementById("download"),
  btc = document.getElementById("copy"),
  btdd = document.getElementById("dark");
fetch("table.json").then(a=>a.json()).then(json=>{
  table=json;
  txt=text(table,input.value);
  output.innerText = txt;
  btg.addEventListener("click", e => {
    txt=text(table,input.value);
    output.innerText = txt;
  })
})

btc.addEventListener("click",e => {
  navigator.clipboard.writeText(txt).then(function() {
    btc.innerText="Copied!"
  }, function(err) {
    btc.innerText="Copy failed...";
  });
  setTimeout(()=>btc.innerText="Copy",500);
})

btd.addEventListener("click",e=>{
  btd.innerText="Download Started.";
  download(txt,"generated.txt");
  setTimeout(()=>btc.innerText="Download",1000);
})

btdd.addEventListener("click",e=>{
  document.getElementById("ln").classList.toggle("dark")
  output.classList.toggle("dark");
  btdd.style.animation="disappear 0.5s ease";
  btdd.addEventListener("animationend",function hand(){
    btdd.removeEventListener("animationend",hand);
    btdd.style.animation="appear 0.5s ease";
    btdd.innerText=btdd.innerText.charAt(0)==="L"?"Dark Mode":"Light Mode";
  })
  btdd.classList.toggle("dark")
  document.body.classList.toggle("dark");
});