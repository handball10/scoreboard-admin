import { useDispatch } from "react-redux";
import { ControlSection } from "../../components/controlSection/ControlSection";

import { reset as resetGoals } from '../goal/goalSlice';
import { reset as resetConfig } from '../gameSettings/gameSettingsSlice';
import { reset as resetPenalties } from '../penalties/penaltySlice';
import { reset as resetTeams } from '../teamInfo/teamInfoSlice';
import { reset as resetTime } from '../time/timeSlice';

export function ResetGame() {

    const dispatch = useDispatch();

    const handleReset = () => {

        dispatch(resetGoals());
        dispatch(resetConfig());
        dispatch(resetPenalties());
        dispatch(resetTeams());
        dispatch(resetTime());

    }


    return (
        <ControlSection headline="Reset Game">
            <button className="button is-danger" onClick={handleReset}>RESET GAME</button>
        </ControlSection>
    )
}