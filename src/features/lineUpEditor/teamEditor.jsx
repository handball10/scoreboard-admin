import { useSelector } from "react-redux"
import { selectTeamInfoByTeam } from "../teamInfo/teamInfoSlice"
import { PersonList } from "./PersonList";

export function TeamEditor({ team }) {

    const teamData = useSelector(selectTeamInfoByTeam(team));


    return (
        <PersonList team={team} data={teamData} />
    )
}