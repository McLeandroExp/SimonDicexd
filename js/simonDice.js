export default function simonDice(botones, botonesMostrados, focos) {
    //recibe como parametro los botones que se aplastan, los que se muestran y los focos que se van a prender
    const $botones = document.querySelectorAll(botones),
          $botonesMostrados = document.querySelectorAll(botonesMostrados),
          $focos = document.querySelectorAll(focos);
          
    let contadorAciertos = 0,
        botonSeleccionado,
        arregloSeleccionado = [],
        arregloMostrado = [];
    const generarAleatorio = () => parseInt(Math.random() * 9);
    
    const reiniciarJuego = () =>{
        arregloMostrado = [];
        arregloSeleccionado = [];
        contadorAciertos = 0;
        apagarFocos();
        mostrarPatron(arregloMostrado);
    }
    const alumbrarFocos = (pos) => $focos[pos-1].style.backgroundColor = "#01b900"; 
    
    const apagarFocos = () => $focos.forEach((foco) => foco.style.backgroundColor = "#ccc");

    const desactivarBotones = () => $botones.forEach(boton => boton.disabled = true);
        
    const activarBotones = () => $botones.forEach(boton => boton.disabled = false);

    
    const compararArreglos = (arr1,arr2) =>{
        let iguales = true;
        if(arr1.length !== arr2.length ){
            iguales = false;
            return iguales;
        }
        arr1.forEach((el,i)=>{
            if(el != arr2[i]){
                iguales = false;
            }
        });
        return iguales;
    }
    const errorPatron =()=>{
        $botonesMostrados.forEach((div)=>{
            div.style.backgroundColor = "#42a6fc";
            div.style.border = "3px solid black";
            div.style.borderRadius = "8px";
            let timer = setTimeout(() => {
                div.style.backgroundColor = "#000";
                div.style.borderRadius = "3px";
                clearTimeout(timer);
            }, 700);
        });
    }
    
    // muestra el patron en el panel de muestra
    const mostrarPatron = (arregloMostr) => {
        desactivarBotones();
        botonSeleccionado = generarAleatorio();
        arregloMostr.push(botonSeleccionado);
        arregloMostr.forEach((pos,i)=>{
            let $btn_mostrado = $botonesMostrados[pos];
            let timing = setTimeout(() => {
                $btn_mostrado.style.backgroundColor = "#42a6fc";
                clearTimeout(timing);
            }, (i+1)*1500);
            let timingGrande = setTimeout(() => {
                let timing2 = setTimeout(() => {
                    $btn_mostrado.style.backgroundColor = "#000";
                    clearTimeout(timing2);
                    if(arregloMostr.length === i+1) activarBotones();
                }, (i+1) *1500);
                clearTimeout(timingGrande);
            }, 500);
            
        });
        
    }
    
    mostrarPatron(arregloMostrado);
        $botones.forEach((boton) => {
            boton.addEventListener("click", () => {
                
                arregloSeleccionado.push(boton.dataset.pos);    
                
                if (compararArreglos(arregloMostrado,arregloSeleccionado)) {
                    if(contadorAciertos === 4){
                        alumbrarFocos(5);
                        setTimeout(() => {
                            reiniciarJuego();
                        }, 1000);
                    } 
                    else{
                        contadorAciertos++; 
                        mostrarPatron(arregloMostrado);
                        arregloSeleccionado = [];
                        alumbrarFocos(contadorAciertos);
                    }
                }
                if(!compararArreglos(arregloSeleccionado,arregloMostrado) && arregloSeleccionado.length === arregloMostrado.length){
                    errorPatron();
                    reiniciarJuego();
                }
    
            });
        });
         
         
    
}