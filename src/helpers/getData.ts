import { get, child } from "firebase/database";

export function getTeamData(datatabase: any, userId?: string) {
  get(child(datatabase, `users/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const teamData = snapshot.val();
        return teamData.team;
      }
      console.log("No data available");
    })
    .catch((error) => {
      console.error(error);
    });
}
