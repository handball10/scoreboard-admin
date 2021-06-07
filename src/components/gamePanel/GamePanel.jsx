import { EmptyGoal } from "../../features/emptyGoal/EmptyGoal";
import { GameEvent } from "../../features/gameEvent/GameEvent";
import { Goal } from "../../features/goal/Goal";
import { Penalties } from "../../features/penalties/Penalties";
import { Time } from "../../features/time/Time";
import { TimeOut } from "../../features/timeout/Timeout";
import { ControlSection } from "../controlSection/ControlSection";

export function GamePanel() {
    return (
        <div className="container p-5">
            <Goal />
            <Time />
            <div className="columns mt-4">
                <ControlSection headline="Penalties">
                    <Penalties />
                </ControlSection>
                <ControlSection headline="Empty Goal">
                    <EmptyGoal />
                </ControlSection>
                {/* <ControlSection headline="Notifications">
                    <GameEvent />
                </ControlSection> */}
                <ControlSection headline="Game State">
                    <TimeOut />
                </ControlSection>
            </div>
        </div>
    )
}