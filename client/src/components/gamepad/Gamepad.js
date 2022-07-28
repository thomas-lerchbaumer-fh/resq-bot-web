import React, { Fragment, useEffect, useContext, useState } from 'react';
import { useGamepads } from "react-gamepads";





const buttonLabels = [
    "A",
    "B",
    "X",
    "Y",
    "L1",
    "R1",
    "L2",
    "R2",
    "Back",
    "Start",
    "L3",
    "R3",
    "UP",
    "DOWN",
    "LEFT",
    "RIGHT",
    "XBOX",
]

const axesLabels = [
    "LX",
    "LY",
    "RX",
    "RY",
]



const Gamepad = () =>{
    const [gamepads, setGamepads] = useState([

    ])
    useGamepads(_gamepads =>{
        setGamepads(Object.values(_gamepads))
        }
    )

    if(gamepads.length > 0){
        const test = gamepads[0].buttons[4].pressed

        console.log(gamepads[0].axes[0])


    }


    if(!gamepads) return 'no controller found'

    return (
        <Fragment>
            <div className='gamepad'>
               {gamepads.length && gamepads.map(pad =>{
                   return(
                       <div>
                           <div>ID: {pad.id}</div>
                           {pad.buttons.map((button, index) =>{
                               return(
                               <div>
                                   <div><span>#{index +1} {button.value}</span></div>
                               </div>
                               )
                           })}
                           {pad.axes.map((axe,index)=>{
                               return(
                                   <div>
                                       #{index +1}: {axe}
                                   </div>
                               )
                           })}
                       </div>
                   )

               })}

            </div>
        </Fragment>
    )
}

export default Gamepad