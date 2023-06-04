const palco = document.getElementById("palco")
const num_objetos = document.getElementById("num_objetos")
const txt_qtde = document.getElementById("txt_qtde")
const btn_add = document.getElementById("btn_add")
const btn_remover = document.getElementById("btn_remover")
const radio_blue = document.getElementById("radioBlue")
const radio_red = document.getElementById("radioRed")
const radio_green = document.getElementById("radioGreen")
const radio_colorFul = document.getElementById("radioColorFul")

let larguraPalco = palco.offsetWidth
let alturaPalco = palco.offsetHeight
let bolas = []
let numBola = 0

let blue = false
let red = false 
let green = false 
let colorFul = false
let add = false 

radio_blue.addEventListener("click",(evt)=>{
if(!add){
  blue = true
  red = false
  green = false 
  colorFul = false 
}else if(add && blue){
  radio_blue.checked = true
}else if(add && red){
  blue = false
  radio_red.checked = true
}else if(add && green){
  blue = false
  radio_green.checked = true
}else if(add && colorFul){
  blue = false
  radio_colorFul.checked = true
}
})
radio_red.addEventListener("click",(evt)=>{
if(!add){
  blue = false
  red = true
  green = false 
  colorFul = false 
}else if(add && red){
  radio_red.checked = true
}else if(add && blue){
  red = false
  radio_blue.checked = true
}else if(add && green){
  red = false
  radio_green.checked = true
}else if(add && colorFul){
  red = false
  radio_colorFul.checked = true
}
})
radio_green.addEventListener("click",(evt)=>{
if(!add){
  blue = false
  red = false
  green = true 
  colorFul = false
}else if(add && green){
  radio_green.checked = true
}else if(add && red){
  green = false
  radio_red.checked = true
}else if(add && blue){
  green = false
  radio_blue.checked = true
}else if(add && colorFul){
  green = false
  radio_colorFul.checked = true
}
})
radio_colorFul.addEventListener("click",(evt)=>{
if(!add){
  blue = false
  red = false
  green = false 
  colorFul = true 
}else if(add && colorFul){
  radio_colorFul.checked = true
}else if(add && red){
  colorFul = false
  radio_red.checked = true
}else if(add && green){
  colorFul = false
  radio_green.checked = true
}else if(add && blue){
  colorFul = false
  radio_blue.checked = true
}  
})

class Bola {
   constructor(arrayBolas,palco){
    this.tam = Math.floor(Math.random()*15)+10
    this.r = Math.floor(Math.random()*255)
    this.g = Math.floor(Math.random()*255)
    this.b = Math.floor(Math.random()*255)
    this.px = Math.floor(Math.random()*(larguraPalco-this.tam))
    this.py = Math.floor(Math.random()*(alturaPalco-this.tam))
    this.velx = Math.floor(Math.random()*2)+0.5
    this.vely = Math.floor(Math.random()*2)+0.5
    this.dirx = (Math.random()*10)>5?1:-1
    this.diry = (Math.random()*10)>5?1:-1
    this.palco = palco
    this.arrayBolas = arrayBolas
    this.id = Date.now()+"_"+Math.floor(Math.random()*1000000000000000)
    this.desenhar()
    this.controle = setInterval(this.controlar,10)
    this.eu = document.getElementById(this.id)
    numBola++
    num_objetos.innerHTML = numBola
   }
   
   minhaPos=()=>{
      return this.arrayBolas.indexOf(this)
   }

   remover=()=>{
     clearInterval(this.controle)
     bolas=bolas.filter((b)=>{
       if(b.id!=this.id){
        return b
       }
     })
     this.eu.remove()
     numBola--
     num_objetos.innerHTML = numBola
   }

   desenhar=()=>{
    if(red){
      const div = document.createElement("div")
      div.setAttribute("id",this.id)
      div.setAttribute("class","bola")
      div.setAttribute("style",`left:${this.px}px;top:${this.py}px;width:${this.tam}px;height:${this.tam}px;background-color:rgb(255,0,0)`)
      this.palco.appendChild(div)
    }else if(blue){
      const div = document.createElement("div")
      div.setAttribute("id",this.id)
      div.setAttribute("class","bola")
      div.setAttribute("style",`left:${this.px}px;top:${this.py}px;width:${this.tam}px;height:${this.tam}px;background-color:rgb(17,0,255)`)
      this.palco.appendChild(div)
    }else if(green){
      const div = document.createElement("div")
      div.setAttribute("id",this.id)
      div.setAttribute("class","bola")
      div.setAttribute("style",`left:${this.px}px;top:${this.py}px;width:${this.tam}px;height:${this.tam}px;background-color:rgb(43,255,0)`)
      this.palco.appendChild(div)
    }else if(colorFul){
      const div = document.createElement("div")
      div.setAttribute("id",this.id)
      div.setAttribute("class","bola")
      div.setAttribute("style",`left:${this.px}px;top:${this.py}px;width:${this.tam}px;height:${this.tam}px;background-color:rgb(${this.r},${this.g},${this.b})`)
      this.palco.appendChild(div)
    }  
}

   controle_bordas=()=>{
     if(this.px+this.tam >= larguraPalco){
       this.dirx=-1
     }else if(this.px <= 0){
       this.dirx=1
     }
     if(this.py+this.tam >= alturaPalco){
        this.diry=-1
      }else if(this.py <= 0){
        this.diry=1
      }
   }

   controlar=()=>{
    if(red){
      this.controle_bordas()
      this.px+=this.dirx*this.velx
      this.py+=this.diry*this.vely
      this.eu.setAttribute("style",`left:${this.px}px;top:${this.py}px;width:${this.tam}px;height:${this.tam}px;background-color:rgb(255,0,0)`)
    }else if(blue){
      this.controle_bordas()
      this.px+=this.dirx*this.velx
      this.py+=this.diry*this.vely
      this.eu.setAttribute("style",`left:${this.px}px;top:${this.py}px;width:${this.tam}px;height:${this.tam}px;background-color:rgb(17,0,255)`)
    }else if(green){
      this.controle_bordas()
      this.px+=this.dirx*this.velx
      this.py+=this.diry*this.vely
      this.eu.setAttribute("style",`left:${this.px}px;top:${this.py}px;width:${this.tam}px;height:${this.tam}px;background-color:rgb(43,255,0)`)
    }else{
      this.controle_bordas()
      this.px+=this.dirx*this.velx
      this.py+=this.diry*this.vely
      this.eu.setAttribute("style",`left:${this.px}px;top:${this.py}px;width:${this.tam}px;height:${this.tam}px;background-color:rgb(${this.r},${this.g},${this.b})`)
    }
      if((this.px > larguraPalco) || (this.py > alturaPalco)) {
         this.remover()
      }
   }
}

window.addEventListener("resize",(evt)=>{
    larguraPalco = palco.offsetWidth
    alturaPalco = palco.offsetHeight
})

btn_add.addEventListener("click",(evt)=>{
  add = true
    if(txt_qtde.value == "0"){
      alert("adicione alguma quantidade")
      add = false
    }
    if(!red && !blue && !green && !colorFul && txt_qtde.value!="0"){
      alert("selecione uma cor")
      num_objetos.innerHTML = 0
      add = false
    }else{
      const qtde = txt_qtde.value
      for(let i=0;i<qtde;i++){
      bolas.push(new Bola(bolas,palco))
    }
    }  
    
})

btn_remover.addEventListener("click",(evt)=>{
    bolas.map((b)=>{
     b.remover()
    })
txt_qtde.value = "0"    
add = false
blue = false
red = false 
green = false 
colorFul = false 
radio_green.checked = false
radio_blue.checked = false
radio_red.checked = false
radio_colorFul.checked = false
})