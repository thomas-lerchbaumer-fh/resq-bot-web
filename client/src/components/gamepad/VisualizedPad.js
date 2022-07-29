import React, { Fragment, useEffect, useState } from 'react'
import { useGamepads } from "react-gamepads";
import ControllerSvg from './ControllerSvg';


 const VisualizePad =() => {
    const [gamepads, setGamepads] = useState({})
    const gamepadIndx = 1;
    useGamepads((gamepads) => setGamepads(gamepads))
    const calcDirectionVertical = (axe) => {
      // Up
      if (axe < -0.2) {
        return 'up'
      }
      // Down
      if (axe > 0.2) {
        return 'down'
      }
    }
    const calcDirectionHorizontal = (axe) => {
      // Left
      if (axe < -0.2) {
        return 'left'
      }
      // Right
      if (axe > 0.2) {
        return 'right'
      }
    }

    return (

      <Fragment>
        {gamepads && gamepads[gamepadIndx] && (
          <>
            <ControllerSvg
              directionUp={gamepads[gamepadIndx].buttons[12].pressed}
              directionDown={gamepads[gamepadIndx].buttons[13].pressed}
              directionLeft={gamepads[gamepadIndx].buttons[14].pressed}
              directionRight={gamepads[gamepadIndx].buttons[15].pressed}
              buttonDown={gamepads[gamepadIndx].buttons[0].pressed}
              buttonRight={gamepads[gamepadIndx].buttons[1].pressed}
              buttonLeft={gamepads[gamepadIndx].buttons[2].pressed}
              buttonUp={gamepads[gamepadIndx].buttons[3].pressed}
              select={gamepads[gamepadIndx].buttons[8].pressed}
              start={gamepads[gamepadIndx].buttons[9].pressed}
              analogLeft={
                gamepads[gamepadIndx].axes[0] > 0.3 ||
                gamepads[gamepadIndx].axes[0] < -0.3 ||
                gamepads[gamepadIndx].axes[1] > 0.3 ||
                gamepads[gamepadIndx].axes[1] < -0.3
              }
              analogRight={
                gamepads[gamepadIndx].axes[2] > 0.3 ||
                gamepads[gamepadIndx].axes[2] < -0.3 ||
                gamepads[gamepadIndx].axes[3] > 0.3 ||
                gamepads[gamepadIndx].axes[3] < -0.3
              }
              analogLeftDirection={[
                calcDirectionHorizontal(gamepads[gamepadIndx].axes[0]),
                calcDirectionVertical(gamepads[gamepadIndx].axes[1]),
              ]}
              analogRightDirection={[
                calcDirectionHorizontal(gamepads[gamepadIndx].axes[2]),
                calcDirectionVertical(gamepads[gamepadIndx].axes[3]),
              ]}
            />
          </>
        )}
      </Fragment>
    )
  }
  

  export default VisualizePad;