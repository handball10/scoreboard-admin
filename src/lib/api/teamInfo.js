import { SERVER_HOST } from '../../config';

export const fetchTeamInfo = async ({ mode, game }) => {
    const fetchResponse = await fetch(`${SERVER_HOST}/game/${mode}/${game}`)
    return await fetchResponse.json();
}